from flask import Blueprint, request, jsonify
from ..extensions import db
from ..models.user import User
from ..models.user_profile import UserProfile
from flask_jwt_extended import create_access_token

def user_routes(user_api):

    @user_api.route('/auth/user/register', methods=['POST'])
    def register():
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')
        employment_status = data.get('employmentStatus')
        financial_goal = data.get('financialGoal')
        has_bank = data.get('hasBankAccount')
        has_credit_card = data.get('hasCreditCards')


        if not (email and password):
            return jsonify({"message": "Username, email, and password are required"}), 400

        if User.query.filter_by(email=email).first() or User.query.filter_by(username=username).first():
            return jsonify({"message": "User with this email or username already exists"}), 400

        # Create the new user and set the password
        new_user = User(username=username, email=email)
        new_user.set_password(password)
        new_user_profile = UserProfile(
            user_id=new_user.id,
            employment_status=employment_status,
            has_bank_account= has_bank,
            monthly_income_range = "<2000",
            has_debt=True,
            debt_amount=4000,
            saving_habit=True,
            credit_score_range="700+",
            literacy_comfortability="Not Comfortable At All",
        )

        db.session.add(new_user)
        db.session.add(new_user_profile)
        db.session.commit()

        return jsonify({"message": "User registered successfully"}), 201

    @user_api.route('/auth/user/login', methods=['POST'])
    def login():
        response_data = {"message": "Success"}
        return jsonify(response_data), 200
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')

        if not (email and password):
            return jsonify({"message": _("Email and password are required")}), 400
        
        user = User.query.filter_by(email=email).first()
        if user and user.check_password(password):
            access_token = create_access_token(identity=user.id)
            return jsonify(access_token=access_token), 200
        else:
            return jsonify({"message": _("Invalid credentials")}), 401