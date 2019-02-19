from elasticsearch import Elasticsearch

es = Elasticsearch(['http://user:mA8KoL4LPYF9@34.73.57.236:80/elasticsearch'])

user = {
    "settings": {
        'index': {'max_result_window': 100000},
        "analysis": {
            "analyzer": {
                "my_email_analyzer": {
                    "type": "custom",
                    "tokenizer": "uax_url_email",
                    "filter": ["lowercase", "stop"]
                }
            }
        }
    },
    "mappings": {
        "user": {
            "properties": {
                "name": {"type": "text"},
                "email": {
                    "type": "text",
                    "analyzer": "my_email_analyzer"
                },
                "password": {"type": "keyword"},
                "domain": {"type": "keyword"},
                "reputation": {"type": "integer"}
            }
        }
    }
}

solution = {
    "settings": {
        'index': {'max_result_window': 100000}
    },
    "mappings": {
        "solution": {
            "properties": {
                "title": {"type": "text"},
                "description": {"type": "text"}
            }
        }
    }
}

experience = {
    "settings": {
        'index': {'max_result_window': 100000}
    },
    "mappings": {
        "experience": {
            "properties": {
                "text": {"type": "text"},
                "profession": {"type": "keyword"},
                "tags": {"type": "text"},
                "tracks": {"type": "text"}
            }
        }
    }
}

problem_statement = {
    "settings": {
        'index': {'max_result_window': 100000}
    },
    "mappings": {
        "problem_statement": {
            "properties": {
                "user": {"type": "keyword"},
                "title": {"type": "text"},
                "description": {"type": "text"},
                "tags": {"type": "text"},
                "tracks": {"type": "text"},
                "solutions": {"type": "keyword"},
                "experiences": {"type": "keyword"},
                "contributors": {"type": "keyword"},
                "progress": {"type": "float"},
                "flag": {"type": "keyword"}
            }
        }
    }
}

all_mappings = {
    'user': user,
    'solution': solution,
    'experience': experience,
    'problem_statement': problem_statement
}


def create_indices():
    for index_name, mapping in all_mappings.items():
        if es.indices.exists(index=index_name) == True:
            es.indices.delete(index=index_name)
        es.indices.create(index=index_name, body=mapping)
        

# if __name__ == "__main__":
#     create_indices()