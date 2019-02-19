import os
from flask import request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask_restplus import Namespace, Resource, fields

from ..elastic_module import DBClient

route = Namespace('experience', description='experience related operations')

experienceModel = {
    'id': fields.String(required=True),
    'text': fields.String(required=True),
    'tags': fields.List(fields.String),
    'tracks': fields.List(fields.String)
}

experienceList = route.model('ExperienceList', {
    'ok': fields.Boolean(required=True),
    'data': fields.List(fields.Nested(experienceModel)), 
    'message': fields.String()
})

responseModel = route.model('Response', {
    'ok': fields.Boolean(required=True),
    'data': fields.Nested(experienceModel), 
    'message': fields.String()
})


@route.route('')
class Experience(Resource):
    db = DBClient('experience')

    @route.marshal_with(responseModel)
    def get(self):
        exp_id = request.args['id']
        exp = self.db.get(id=exp_id)
        print(exp)
        if exp:
            return {'ok': True, 'data': exp}
        else:
            return {'ok': False, 'message': 'document with id {} not found'.format(exp_id)}

    @route.expect(experienceModel, validate=True)
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

@route.route('/search')
class ExperienceSearch(Resource):
    db = DBClient('experience')

    @route.marshal_with(experienceList)
    @jwt_required
    def get(self):
        q = request.args['q']
        probs = self.db.search(q, ['text', 'tags'])
        return {'ok': True, 'data': probs}