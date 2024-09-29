from flask import Flask, request
from .extensions import db, bcrypt, jwt
from .routes import user_routes, profile_routes
from flask_babel import Babel
from flask_migrate import Migrate


def create_app(config_class='config.DevelopmentConfig'):
    app = Flask(__name__)
    app.config.from_object(config_class)

    # extensions
    db.init_app(app)
    bcrypt.init_app(app)
    jwt.init_app(app)

    def get_locale():
        lang = request.args.get('lang')
        if lang and lang in app.config['BABEL_SUPPORTED_LOCALES']:
            return lang
        return request.accept_languages.best_match(app.config['BABEL_SUPPORTED_LOCALES'])
    
    babel = Babel(app, locale_selector=get_locale)

    
    # routes
    user_routes(app)
    profile_routes(app)

    return app
