from flask import Blueprint, request, jsonify
from app import db
from ..models.user import User
from flask_jwt_extended import create_access_token

def user_routes(user_api):

    @user_api.route('/auth/user/register', methods=['POST'])
    def register():
        data = request.get_json()
        username = data.get('username')
        email = data.get('email')
        password = data.get('password')

        if not (username and email and password):
            return jsonify({"message": _("Username, email, and password are required")}), 400
        
        if User.query.filter_by(email=email).first() or User.query.filter_by(username=username).first():
            return jsonify({"message": _("User with this email or username already exists")}), 400
        
        new_user = User(username=username, password=password)
        new_user.set_password(password)
        print("TEST1")
        db.session.add(new_user)
        db.session.commit()
        print("TEST2")
        return jsonify({"message": _("User registered successfully")}), 201

    @user_api.route('/auth/user/login', methods=['POST'])
    def login():
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