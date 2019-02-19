from jsonschema import validate
from jsonschema.exceptions import ValidationError
from jsonschema.exceptions import SchemaError

experience = {
    "type": "object",
    "properties": {
        "id": {
            "type": "string"
        },
        "profession": {
            "type": "string"
        },
        "text": {
            "type": "string"
        },
        "tags": {
            "type": "array",
            "items": {
                "type": "string"
            }
        },
        "tracks": {
            "type": "array",
            "items": {
                "type": "string"
            }
        }
    },
    "additionalProperties": False,
    "required": ["id", "profession", "text"]
}

problem_statement = {
    "type": "object",
    "properties": {
        "id": {
            "type": "string"
        },
        "user": {
            "type": "string"
        },
        "title": {
            "type": "string"
        },
        "description": {
            "type": "string"
        },
        "tags": {
            "type": "array",
            "items": {
                "type": "string"
            }
        },
        "tracks": {
            "type": "array",
            "items": {
                "type": "string"
            }
        },
        "solutions": {
            "type": "array",
            "items": {
                "type": "string"
            }
        },
        "experiences": {
            "type": "array",
            "items": {
                "type": "string"
            }
        },
        "contributors": {
            "type": "array",
            "items": {
                "type": "string"
            }
        },
        "progress": {
            "type": "number"
        },
        "votes": {
            "type": "object",
            "properties": {
                "up": {
                    "type": "number"
                },
                "down": {
                    "type": "number"
                }
            }
        },
        "flag": {
            "type": "string",
            "enum": ["open", "close"]
        }
    },
    "additionalProperties": False,
    "required": ["id", "user", "title", "description", "tags", "progress", "votes", "flag"]
}

solution = {
    "type": "object",
    "properties": {
        "id": {
            "type": "string" 
        },
        "title": {
            "type": "string"
        },
        "description": {
            "type": "string"
        },
        "link": {
            "type": "string",
            "format": "uri"
        }
    },
    "additionalProperties": False,
    "required": ["id", "title", "description", "link"]
}

user = {
    "type": "object",
    "properties": {
        "id": {
            "type": "string"
        },
        "name": {
            "type": "string",
        },
        "email": {
            "type": "string",
            "format": "email"
        },
        "password": {
            "type": "string",
            "minLength": 5
        },
        "domain": {
            "type": "array",
            "items": {
                "type": "string"
            }
        },
        "reputation": {
            "type": "number"
        }
    },
    "additionalProperties": False,
    "required": ["id", "name", "email", "password", "reputation"]
}

def get_fields(index):
    schema_map = {
        'experience': experience,
        'user': user,
        'problem_statement': problem_statement,
        'solution': solution
    }
    return schema_map[index]["properties"].keys()

def validate_experience(data):
    try:
        validate(data, experience)
    except ValidationError as e:
        return {'ok': False, 'message': e}
    except SchemaError as e:
        return {'ok': False, 'message': e}
    return {'ok': True, 'data': data}

def validate_problem(data):
    try:
        validate(data, problem_statement)
    except ValidationError as e:
        return {'ok': False, 'message': e}
    except SchemaError as e:
        return {'ok': False, 'message': e}
    return {'ok': True, 'data': data}

def validate_solution(data):
    try:
        validate(data, solution)
    except ValidationError as e:
        return {'ok': False, 'message': e}
    except SchemaError as e:
        return {'ok': False, 'message': e}
    return {'ok': True, 'data': data}

def validate_user(data):
    try:
        validate(data, user)
    except ValidationError as e:
        return {'ok': False, 'message': e}
    except SchemaError as e:
        return {'ok': False, 'message': e}
    return {'ok': True, 'data': data}