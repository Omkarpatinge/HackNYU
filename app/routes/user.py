import os
from flask import request, jsonify
from flask_restplus import Namespace, Resource, fields

from ..elastic_module import DBClient

route = Namespace('user', description='user related operations')

userModel = route.model('User', {
    'id': fields.String(required=True),
    'name': fields.String(required=True),
    'email': fields.String(required=True),
    'password': fields.String(required=True)
})

responseModel = route.model('Response', {
    'ok': fields.Boolean(required=True),
    'data': fields.Nested(userModel), 
    'message': fields.String()
})


@route.route('')
class User(Resource):
    db = DBClient('user')

    @route.marshal_with(responseModel)
    def get(self):
        exp_id = request.args['id']
        exp = self.db.get(id=exp_id)
        print(exp)
        if exp:
            return {'ok': True, 'data': exp}
        else:
            return {'ok': False, 'message': 'document with id {} not found'.format(exp_id)}

    @route.expect(userModel, validate=True)
    @route.marshal_with(responseModel)
    def post(self):
        doc = request.get_json()
        data = self.db.put(doc)
        return {'ok': True, 'data': data}

    @route.marshal_with(responseModel)
    def delete(self):
        exp_id = request.args['id']
        if self.db.delete(id=exp_id):
            return {'ok': True, 'message': 'document with id {} deleted'.format(exp_id)}
        else:
            return {'ok': False, 'message': 'document with id {} not found'.format(exp_id)}