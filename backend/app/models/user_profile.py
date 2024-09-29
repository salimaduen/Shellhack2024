from ..app import db
from sqlalchemy import Enum, JSON
from sqlalchemy.orm import relationship
from .user import User

class UserProfile(db.Model):
    __tablename__ = 'user_profiles'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(User.id), nullable=False)
    employment_status = db.Column(db.String(50), nullable=False)  # e.g., "Employed", "Self-employed", "Unemployed", "Student"
    has_bank_account = db.Column(db.Boolean, default=False)
    monthly_income_range = db.Column(db.String(50), default="Unknown")  # e.g., "<2000", "2000-4000", ">6000"
    has_debt = db.Column(db.Boolean, default=False)
    debt_amount = db.Column(db.Float, default=0.0)
    saving_habit = db.Column(db.Boolean, default=False)  # True if they save regularly
    credit_score_range = db.Column(db.String(50), default="Unknown")  # e.g., "600-700"
    literacy_comfortability = db.Column(
        Enum('Not Comfortable At All', 'Somewhat Comfortable', 'Very Comfortable', name='literacy_levels'),
        nullable=False
    )
    literacy_interests = db.Column(JSON, nullable=True)
    financial_goal = db.Column(db.String(100), default="None")