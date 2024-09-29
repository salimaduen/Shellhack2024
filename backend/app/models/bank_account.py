from ..app import db
from .user import User

class BankAccount(db.Model):
    __tablename__ = 'bank_accounts'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(User.id), nullable=False)
    account_type = db.Column(db.String(50))  # e.g., "Checking", "Savings"
    balance = db.Column(db.Float)