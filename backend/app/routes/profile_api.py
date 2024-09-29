from flask import Blueprint, request, jsonify
from ..models.user_profile import UserProfile
from ..models.user import User
from openai import OpenAI
from ..extensions import db
from dotenv import load_dotenv
import os


load_dotenv()

# Set up OpenAI client
API_KEY = os.getenv('OPENAI_API_KEY')
client = OpenAI(api_key=API_KEY)

def profile_routes(profile_api):

    @profile_api.route('/api/profile/update', methods=['POST'])
    def update_profile():
        data = request.get_json()
        # Update profile logic...
        return jsonify({"message": "Profile updated successfully"}), 200

    @profile_api.route('/api/profile/get', methods=['GET'])
    def get_profile():
        user_id = request.args.get('user_id')
        # Retrieve profile logic...
        return jsonify({"profile": "profile-data-here"}), 200

    @profile_api.route('/api/profile/recommendation', methods=['GET'])
    def get_recommendation():
        user_id = request.args.get('user_id')
       
        if not user_id:
            return jsonify({'error': 'User ID is required'}), 400

        user_profile = UserProfile.query.filter_by(user_id=user_id).first()
        print(user_profile)
        if not user_profile:
            return jsonify({'error': 'User not found'}), 404
        
        # Create a prompt based on user profile information
        prompt = formulate_prompt(user_profile)

        # Get a response from the fine-tuned model
        try:
            response = client.chat.completions.create(
                model='ft:gpt-3.5-turbo-0125:financeapp::ACbM8G5Z',  # replace with your model name
                messages=[
                    {"role": "user", "content": prompt}
                ]
            )
            print('here')
            print(type(response.choices[0].message.content))
            print(response.choices[0].message.content)
            recommendations = response.choices[0].message.content
        except Exception as e:
            return jsonify({'error': f"Failed to generate recommendations: {str(e)}"}), 500

        return jsonify({'recommendations': recommendations})

    def formulate_prompt(profile):
        prompt_parts = []

        if profile.has_bank_account:
            prompt_parts.append("The user has a bank account.")
        else:
            prompt_parts.append("The user does not have a bank account.")

        prompt_parts.append(f"The user's credit score range is {profile.credit_score_range}.")
        prompt_parts.append(f"The user's financial goal is to {profile.financial_goal}.")

        prompt_parts.append(f"The user's literacy comfortability is {profile.literacy_comfortability}")

        if profile.literacy_interests:
            prompt_parts.append("The user's literacy interests are:")
            for interest in profile.literacy_interests.get('interests'):
                prompt_parts.append(interest)


        if profile.has_debt:
            prompt_parts.append(f"The user has debt amounting to {profile.debt_amount}.")

        # Combine the parts to form the final prompt
        prompt = " ".join(prompt_parts)
        prompt += " Based on this information, what financial advice would you give the user? Return organized by section JSON."
        return prompt

    