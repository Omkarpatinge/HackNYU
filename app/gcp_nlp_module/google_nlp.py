'''
author : pH
date : 16.02.2019
'''
import os
import requests

from google.cloud import language
from google.cloud.language import enums
from google.cloud.language import types


class Google_nlp_API:
    def __init__(self, config_path):
        self.config_path = config_path
        self.tracks = ['health', 'energy', 'finance', 'education']
        os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = config_path
        self.nlp_client = language.LanguageServiceClient()

    def get_category(self, text):
        document = language.types.Document(content=text, type=language.enums.Document.Type.PLAIN_TEXT)
        response = language_client.classify_text(document)
        categories = response.categories
        for track in self.tracks:
            for category in categories:
                if track in category.lower():
                    return track