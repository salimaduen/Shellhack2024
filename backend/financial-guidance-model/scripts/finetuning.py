from openai import OpenAI
from dotenv import load_dotenv
import os
import time

load_dotenv()
API_KEY = os.getenv('OPENAI_API_KEY')

client = OpenAI(
    api_key=API_KEY
)

training_file_path = './financial-guidance-model/data/gpt-3.5/processed_data.jsonl'


def upload_training_data(file_path):
    try:
        with open(file_path, 'rb') as file:
            response = client.files.create(
                file=file,
                purpose='fine-tune'
            )
        print(f"File uploaded successfully. File ID: {response.id}")
        return response.id
    except Exception as e:
        print(f"Exception occurred at uploading training data: {e}")
        return None
    
def create_fine_tune_job(file_id, model='gpt-3.5-turbo'):
    try:
        response = client.fine_tuning.jobs.create(
            training_file=file_id,
            model=model
        )
        print(f"Fine-tune job created successfully. Job ID: {response.id}")
        return response.id
    except Exception as e:
        print(f"Exception occurred at creating fine-tune job: {e}")
        return None
    
def monitor_fine_tune_job(job_id):
    """Monitors the fine-tuning job until it completes."""
    while True:
        response = client.fine_tuning.jobs.retrieve(job_id)
        status = response.status
        print(f"Job Status: {status}")

        if status in ["succeeded", "failed"]:
            break

        time.sleep(30)  # Wait for 30 seconds before checking the status again

    if status == "succeeded":
        print("Fine-tune job completed successfully!")
        # Accessing the attribute using dot notation
        print(f"Fine-tuned model name: {response.fine_tuned_model}")
    elif status == "failed":
        print("Fine-tune job failed. Please check the logs for more details.")

def fine_tune():
    # Step 1: Upload the training data
    file_id = upload_training_data(training_file_path)
    if not file_id:
        return

    # Step 2: Create the fine-tuning job
    job_id = create_fine_tune_job(file_id)
    if not job_id:
        return

    # Step 3: Monitor the fine-tuning job
    monitor_fine_tune_job(job_id)

fine_tune()