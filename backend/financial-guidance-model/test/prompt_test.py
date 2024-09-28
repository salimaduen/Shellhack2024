import os
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv('OPENAI_API_KEY')
client = OpenAI(api_key=API_KEY)

# Set the fine-tuned model name
fine_tuned_model_name = "ft:gpt-3.5-turbo-0125:financeapp::ACYbASwj"  # Replace with your fine-tuned model ID

# Function to send a test prompt to the fine-tuned model
def test_fine_tuned_model(prompt):
    try:
        # Create a response using the fine-tuned model
        response = client.chat.completions.create(
            model=fine_tuned_model_name,
            messages=[
                {"role": "user", "content": prompt}
            ]
        )
        # Print the assistant's response
        print(f"Assistant: {response.choices[0].message.content}")
    except Exception as e:
        print(f"Error occurred: {e}")

# Example prompt to test the fine-tuned model
test_prompt = "If I am from Colombia what VISA do I need as a tourist to visit the US? Answer in Spanish"
test_fine_tuned_model(test_prompt)