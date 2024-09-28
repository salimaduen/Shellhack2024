from flask import Flask
from .extensions import db, bcrypt, jwt
from .routes import auth

def create_app(config_class='config.DevelopmentConfig'):
    app = Flask(__name__)
    app.config.from_object(config_class)

    # extensions
    db.init_app(app)
    bcrypt.init_app(app)
    jwt.init_app(app)

    # blueprints?
    app.register_blueprint(auth)

    return app