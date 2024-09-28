from flask import Flask, request
from .extensions import db, bcrypt, jwt, babel
from .routes import auth
from flask_babel import Babel

def create_app(config_class='config.DevelopmentConfig'):
    app = Flask(__name__)
    app.config.from_object(config_class)

    # extensions
    db.init_app(app)
    bcrypt.init_app(app)
    jwt.init_app(app)
    babel.init_app(app)

    @babel.localselector
    def get_locale():
        lang = request.args.get('lang')
        if lang in app.config['BABEL_SUPPORTED_LOCALES']:
            return lang
        return request.accept_languages.best_match(app.config['BABEL_SUPPORTED_LANGUAGES'])

    # blueprints?
    app.register_blueprint(auth)

    return app