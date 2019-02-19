from . import config

from flask import Flask
import os
import datetime
from flask_jwt_extended import JWTManager
from flask_bcrypt import Bcrypt



app = Flask(__name__)
flask_bcrypt = Bcrypt(app)
app.config['JWT_SECRET_KEY'] = os.environ.get('SECRET')
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = datetime.timedelta(days=1)
jwt = JWTManager(app)

from .auth import auth
from .routes import blueprint

app.register_blueprint(auth)

app.register_blueprint(blueprint, url_prefix='/api/')
