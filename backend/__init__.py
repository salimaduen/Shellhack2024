from flask import Flask

def create_app(config_class='config.DevelopmentConfig'):
    app = Flask(__name__)


    return app