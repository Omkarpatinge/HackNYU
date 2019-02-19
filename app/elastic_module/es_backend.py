from elasticsearch import Elasticsearch
import os

es = Elasticsearch([os.environ.get('ES_HOST')])


def insert_one(index_name, docType, body, Id=None):
	index_name = index_name.lower().replace(" ", "_").replace("-", "_").strip()
	create_index(index_name)
	if Id is not None:
		doc = get_one(index_name, docType, Id)
		if doc:
			return doc
		else:
			es.create(index=index_name, doc_type=docType,
					  id=Id, body=body, refresh=True)
			return get_one(index_name, docType, Id)
	else:
		Id = es.index(index=index_name, doc_type=docType,
					  body=body, refresh=True)['_id']
		return get_one(index_name, docType, Id)


def get_one(index_name, docType, Id):
	index_name = index_name.lower().replace(" ", "_").replace("-", "_").strip()
	try:
		return es.get(index=index_name, doc_type=docType, id=Id)['_source']
	except:
		return False


def delete_one(index_name, docType, Id):
	index_name = index_name.lower().replace(" ", "_").replace("-", "_").strip()
	try:
		es.get(index=index_name, doc_type=docType, id=Id)
	except:
		return False

	es.delete(index=index_name, doc_type=docType, id=Id)
	return True


def search_elastic(index_name, docType, query):
	index_name = index_name.lower().replace(" ", "_").replace("-", "_").strip()
	result = es.search(index=index_name, body=query)
	return_data = {
		"hits": [x['_source'] for x in result['hits']['hits']],
		"total": result['hits']['total']
	}
	return return_data


def update_by_query(index_name, docType, query):
	index_name = index_name.lower().replace(" ", "_").replace("-", "_").strip()
	es.update_by_query(index_name, docType, query,
					   wait_for_completion=True, conflicts='proceed', refresh=True)


def delete_by_query(index_name, docType, query):
	index_name = index_name.lower().replace(" ", "_").replace("-", "_").strip()
	es.delete_by_query(index_name, query, docType)


def update_one(index_name, docType, Id, query):
	index_name = index_name.lower().replace(" ", "_").replace("-", "_").strip()
	es.update(index=index_name, doc_type=docType, id=Id, body=query)


def create_index(index_name):
	index_name = index_name.lower().replace(" ", "_").replace("-", "_").strip()
	setting = {'index': {'max_result_window': 100000}}
	if es.indices.exists(index=index_name) != True:
		es.indices.create(index=index_name)
		es.indices.put_settings(body=setting, index=index_name)


def update_index(index_name, docType, prop):
	index_name = index_name.lower().replace(" ", "_").replace("-", "_").strip()
	es.indices.put_mapping(
		index=index_name, doc_type=docType, body=prop['mappings'])


def get_index(index_name):
	index_name = index_name.lower().replace(" ", "_").replace("-", "_").strip()
	if es.indices.exists(index=index_name):
		return es.indices.get(index=index_name)
	else:
		return {}


def delete_index(index_name):
	index_name = index_name.lower().replace(" ", "_").replace("-", "_").strip()
	if es.indices.exists(index=index_name):
		es.indices.delete(index=index_name)
