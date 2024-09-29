from ..extensions import db
from sqlalchemy import Enum, JSON
from sqlalchemy.orm import relationship
from .user import User

class RegisteredAccount(db.Model):
    __tablename__ = 'registered_accounts'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    registration_date = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    is_activated = db.Column(db.Boolean, default=False)
    registration_source = db.Column(db.String(100), default='Web', nullable=False)  # Example: Web, Mobile, etc.

    # Establish relationship with User model
    user = relationship('User', back_populates='registered_account')

    def __repr__(self):
        return f"<RegisteredAccount {self.id} - User {self.user_id} - Activated {self.is_activated}>"
