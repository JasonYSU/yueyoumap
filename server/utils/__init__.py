import hashlib
import random
from django.http import HttpResponse
from rest_framework.renderers import JSONRenderer
from rest_framework.status import *


class ApiResponse(HttpResponse):

    json_render = JSONRenderer()
    CONTENT_TYPE = 'application/json; charset=utf-8'

    def __init__(self, data=None, message='OK', status=HTTP_200_OK):
        res = {
            'message': message,
            'result': data,
        }
        '''
        if o is not None:
            result = dict(o.__dict__)
            if '_state' in result.keys():
                result.pop('_state')
            if keys is not None:
                res['result'] = {}
                for _ in keys:
                    res['result'][_] = result.get(_)
            else:
                res['result'] = result
            super().__init__(self.json_render.render(res), content_type=self.CONTENT_TYPE, status=status)
        '''
        super().__init__(self.json_render.render(res), content_type=self.CONTENT_TYPE, status=status)


class RandomString:
    """随机字符串生成工具"""
    BASE_CHARACTER = {
        'NUMBER': '0123456789',
        'LOWER_CASE_CHARACTER': 'abcdefghijklmnopqrstuvwxyz',
        'UPPER_CASE_CHARACTER': 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    }

    @staticmethod
    def get(length: int, t: tuple):
        base = ''
        for _ in t:
            base = base + RandomString.BASE_CHARACTER.get(_)
        return random.choices(base, k=length)


class Digest:
    """摘要生成工具"""

    @staticmethod
    def get(body: str):
        generator = hashlib.md5()
        generator.update(body.encode())
        return generator.hexdigest()
