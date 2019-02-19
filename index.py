import os
import logging
from flask import jsonify, request, make_response, send_from_directory

from app import app

logging.basicConfig(level=logging.DEBUG)
ROOT_PATH = os.path.dirname(os.path.realpath(__file__))
PUBLIC_PATH = os.path.join(ROOT_PATH, 'public')
VERSION = os.environ.get('VERSION', 'v1.0')

@app.errorhandler(404)
def not_found(error):
    """ error handler """
    return make_response(jsonify({'error': 'Not found'}), 404)


@app.route('/')
def index():
    """ static files serve """
    return send_from_directory(PUBLIC_PATH, 'index.html')


@app.route('/<path:path>')
def static_proxy(path):
    """ static folder serve """
    file_name = path.split('/')[-1]
    dir_name = os.path.join(PUBLIC_PATH, '/'.join(path.split('/')[:-1]))
    return send_from_directory(dir_name, file_name)


@app.route('/ping', methods=['GET'])
def ping_server():
    """ Testing endpoint """
    return jsonify({'ok': True, 'message': 'problem-overflow server version {} up and running'.format(VERSION)}), 200


def run_server():
    port = int(os.environ.get('PORT', "4000"))
    app.run(host='0.0.0.0', port=port, debug=True, use_reloader=os.environ.get('ENV')=='development')


if __name__ == "__main__":
    run_server()
