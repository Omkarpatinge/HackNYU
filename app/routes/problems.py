import os
from flask import request, jsonify
from flask_restplus import Namespace, Resource, fields
from flask_jwt_extended import jwt_required, get_jwt_identity

from ..elastic_module import DBClient
from .. import app

route = Namespace('problems', description='problems related operations')

votes = route.model('Votes', {
    'up': fields.Integer(required=True),
    'down': fields.Integer(required=True)
})

problemsModel = {
    'id': fields.String(required=True),
    'user': fields.String(required=True),
    'title': fields.String(required=True),
    'description': fields.String(required=True),
    'experiences': fields.List(fields.String, required=True),
    'tags': fields.List(fields.String, required=True),
    'tracks': fields.List(fields.String),
    'progress': fields.Float(required=True),
    'votes': fields.Nested(votes, required=True),
    'flag': fields.String(required=True)
}

problemList = route.model('ProblemList', {
    'ok': fields.Boolean(required=True),
    'data': fields.List(fields.Nested(problemsModel)),
    'message': fields.String()
})

responseModel = route.model('Response', {
    'ok': fields.Boolean(required=True),
    'data': fields.Nested(problemsModel),
    'message': fields.String()
})


@route.route('')
class ProblemStatement(Resource):
    db = DBClient('problem_statement')

    @route.marshal_with(responseModel)
    @jwt_required
    def get(self):
        prob_id = request.args['id']
        prob = self.db.get(id=prob_id)
        if prob:
            return {'ok': True, 'data': prob}
        else:
            return {'ok': False, 'message': 'document with id {} not found'.format(prob_id)}

    @route.expect(problemsModel, validate=True)
    @route.marshal_with(responseModel)
    @jwt_required
    def post(self):
        doc = request.get_json()
        data = self.db.put(doc)
        return {'ok': True, 'data': data}

    @route.marshal_with(responseModel)
    @jwt_required
    def delete(self):
        prob_id = request.args['id']
        if self.db.delete(id=prob_id):
            return {'ok': True, 'message': 'document with id {} deleted'.format(prob_id)}
        else:
            return {'ok': False, 'message': 'document with id {} not found'.format(prob_id)}


@route.route('/search')
class ProblemSearch(Resource):
    db = DBClient('problem_statement')

    @route.marshal_with(problemList)
    @jwt_required
    def get(self):
        q = request.args['q']
        probs = self.db.search(q, ['title', 'description', 'tags'])
        return {'ok': True, 'data': probs}
