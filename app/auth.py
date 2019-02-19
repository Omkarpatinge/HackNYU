import os
from flask import request, jsonify, Blueprint, redirect
from flask_jwt_extended import (create_access_token, create_refresh_token,
                                jwt_required, jwt_refresh_token_required, get_jwt_identity)
from app import app, flask_bcrypt, jwt

from .elastic_module import DBClient

auth = Blueprint('auth', __name__)

db = DBClient('user')

@jwt.unauthorized_loader
def unauthorized_response(callback):
    return jsonify({
        'ok': False,
        'message': 'Missing Authorization Header'
    }), 401


@auth.route('/auth', methods=['POST'])
def auth_user():
    ''' auth endpoint '''
    data = request.get_json()    
    user = db.get_by_query({'email': data['email']})
    if user and flask_bcrypt.check_password_hash(user['password'], data['password']):
        del user['password']
        access_token = create_access_token(identity=data)
        refresh_token = create_refresh_token(identity=data)
        user['token'] = access_token
        user['refresh'] = refresh_token
        return jsonify({'ok': True, 'data': user}), 200
    else:
        return jsonify({'ok': False, 'message': 'invalid username or password'}), 401

@auth.route('/register', methods=['POST'])
def register():
    ''' register user endpoint '''
    data = request.get_json()
    if 'password' in data:
        data['password'] = flask_bcrypt.generate_password_hash(data['password']).decode('utf-8')
        del data['netId']
        if db.put(data):
            return jsonify({'ok': True, 'message': 'User created successfully!'}), 200
        else:
            return jsonify({'ok': False, 'message': 'Bad request parameters: {}'.format(data['message'])}), 400
    else:
        return jsonify({'ok': False, 'message': 'Bad request parameters: {}'.format(data['message'])}), 400


@auth.route('/refresh', methods=['POST'])
@jwt_refresh_token_required
def refresh():
    ''' refresh token endpoint '''
    current_user = get_jwt_identity()
    ret = {
        'token': create_access_token(identity=current_user)
    }
    return jsonify({'ok': True, 'data': ret}), 200