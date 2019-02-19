import os
from flask import request, jsonify
from flask_restplus import Namespace, Resource, fields
from flask_jwt_extended import jwt_required, get_jwt_identity

from ..elastic_module import DBClient

route = Namespace('solutions', description='solutions related operations')

solutionsModel = {
    'id': fields.String(required=True),
    'title': fields.String(required=True),
    'description': fields.String(required=True),
    'link': fields.String(required=True)
}

solutionsList = route.model('ProblemList', {
    'ok': fields.Boolean(required=True),
    'data': fields.List(fields.Nested(solutionsModel)),
    'message': fields.String()
})

responseModel = route.model('Response', {
    'ok': fields.Boolean(required=True),
    'data': fields.Nested(solutionsModel),
    'message': fields.String()
})


@route.route('')
class Solutions(Resource):
    db = DBClient('solution')

    @route.marshal_with(responseModel)
    @jwt_required
    def get(self):
        sol_id = request.args['id']
        sol = self.db.get(id=sol_id)
        if sol:
            return {'ok': True, 'data': sol}
        else:
            return {'ok': False, 'message': 'document with id {} not found'.format(sol_id)}

    @route.expect(solutionsModel, validate=True)
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
class SolutionSearch(Resource):
    db = DBClient('solution')

    @route.marshal_with(solutionsList)
    @jwt_required
    def get(self):
        q = request.args['q']
        probs = self.db.search(q, ['title', 'description'])
        return {'ok': True, 'data': probs}
