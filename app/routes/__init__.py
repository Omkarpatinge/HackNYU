import os
from flask_restplus import Api
from flask import Blueprint
import importlib

blueprint = Blueprint('api', __name__)

api = Api(blueprint,
          title='FLASK RESTPLUS API BOILER-PLATE WITH JWT',
          version='1.0',
          description='a boilerplate for flask restplus web service'
          )


def add_namespace():
    routes_path = os.path.join(os.path.dirname(__file__), '.')
    files = ['app.routes.{}'.format(
        x[:-3]) for x in os.listdir(routes_path) if not x.startswith('__')]
    for file in files:
        module = importlib.import_module(file)
        if hasattr(module, 'prefix'):
            prefix = module.prefix
        else:
            prefix = module.__name__.split('.')[-1]
        api.add_namespace(module.route, path='{}'.format(prefix.strip('/')))


add_namespace()
