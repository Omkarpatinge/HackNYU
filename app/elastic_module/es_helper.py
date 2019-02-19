from .es_backend import insert_one, get_one, search_elastic, update_by_query, update_one, delete_one
from .schemas import validate_experience, validate_problem, validate_solution, validate_user, get_fields

validators = {
    'experience': validate_experience,
    'problem_statement': validate_problem,
    'solution': validate_solution,
    'user': validate_user
}


def create_match_query(doc):
    query = {
        "query": {
            "bool": {
                "must": [
                    {"term": {_k: _v}}
                    for _k, _v in doc.items()
                ]
            }
        }
    }
    return query


def create_search_query(q, fields):
    query = {
        "query": {
            "query_string": {
                "query":  "*" + q + "*",
                "fields": fields
            }
        }
    }
    return query


class DBClient:
    def __init__(self, index):
        self.index = index
        self.validator = validators[self.index]
        self.fields = get_fields(self.index)

    def get(self, id):
        return get_one(self.index, self.index, id)

    def put(self, doc):
        _d = self.validator(doc)
        if _d['ok']:
            return insert_one(self.index, self.index, _d['data'], _d['data']['id'])
        else:
            raise _d['message']

    def delete(self, id):
        return delete_one(self.index, self.index, id)

    def search(self, q, fields):
        return search_elastic(self.index, self.index, create_search_query(q, fields))['hits']

    def get_by_query(self, query):
        is_valid = True
        for _k in query:
            if _k not in self.fields:
                is_valid = False
                break
        if is_valid:
            user = search_elastic(self.index, self.index,
                                  create_match_query(query))['hits']
            if user:
                return user[0]
            else:
                return False
        else:
            return False
