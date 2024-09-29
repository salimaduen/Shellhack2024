import os

def combine_data(path_to_data):
    files = [f for f in os.listdir(path_to_data) if os.path.isfile(os.path.join(path_to_data, f))]

    # Set the new file name
    new_file_name = 'processed_data.jsonl'
    new_file_path = os.path.join(path_to_data, new_file_name)
    
    # Open the new file in append mode
    with open(new_file_path, 'a') as output_file:
        for file in files:
            file_path = os.path.join(path_to_data, file)
            
            # Skip the output file itself if it already exists in the directory
            if file_path == new_file_path:
                continue
            
            # Read and append the content of each file to the new file
            with open(file_path, 'r') as input_file:
                output_file.write(input_file.read() + '\n') 


combine_data('./financial-guidance-model/data/gpt-3.5')