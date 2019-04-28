import json
import logging

import urllib3
from rest_framework.views import APIView

from server.settings import config
from utils import *
from .models import *
from .serializers import *

logger = logging.getLogger('django')


def auth(token):
    """
    校验token合法性
    :param token: 登录凭证
    :return: 合法（token存在且未超过有效期）则返回True，否则返回False
    """
    if token is None or not User.objects.filter(token=token).exists():
        return False, None
    user = User.objects.get(token=token)
    if datetime.datetime.now() - user.last_login_time > datetime.timedelta(days=1):
        return False, None
    return True, user


class Account(APIView):
    """
    用户账户模块
    """
    APPID = config.get('WECHAT', 'appid')
    APPSECRET = config.get('WECHAT', 'appsecret')
    REQUEST_BASE_URL = 'https://api.weixin.qq.com/sns/jscode2session?appid=' + APPID + '&secret=' + APPSECRET \
                       + '&grant_type=authorization_code&'

    def __init__(self):
        self.http_manager = urllib3.PoolManager()
        super().__init__()

    def get(self, *args, **kwargs):
        js_code = self.request.GET.get('js_code')
        user = None
        message = 'OK'
        status = HTTP_200_OK
        if js_code is None:
            message = '临时登录凭证js_code不能为空'
            status = HTTP_400_BAD_REQUEST
        else:
            user = self._login(js_code)
            if user is None:
                message = '服务器内部错误'
                status = HTTP_400_BAD_REQUEST
            else:
                user = UserSerializer(user)
        return ApiResponse(user.data, message=message, status=status)

    def _wechat_login(self, js_code):
        """
        调用微信登录接口
        :param js_code: 登录凭证code
        :return: 成功返回解析后的dict，否则返回None
        """
        req = self.http_manager.request('GET', Account.REQUEST_BASE_URL + 'js_code=' + js_code)
        print(req.data)
        if req.status != 200:
            logger.error('请求错误，HTTP Status:' + req.status)
            res = None
        else:
            res = json.loads(req.data)
            if res.get('errcode') is not None:
                logger.error('调用微信登录接口错误：' + res.get('errmsg'))
                res = None
        return res

    def _login(self, js_code):
        """
        用户登录
        :param js_code: 临时登录凭证code
        :return: 成功则返回User对象，否则返回None
        """
        res = self._wechat_login(js_code)
        if res is not None:
            if not User.objects.filter(openid=res.get('openid')).exists():
                user = User.objects.create_user(res.get('openid'))
            else:
                user = User.objects.get(openid=res.get('openid'))
            user.token = Digest.get(user.openid.join(
                RandomString.get(10, ('NUMBER', 'LOWER_CASE_CHARACTER', 'UPPER_CASE_CHARACTER'))))
            user.last_login_time = datetime.datetime.now()
            user.save()
            return user
        else:
            return None


class Info(APIView):
    """
    个人信息模块
    """
    def get(self, *args, **kwargs):
        token = self.request.GET.get('token')
        is_auth, user = auth(token)
        if is_auth:
            user = UserSerializer(user)
            return ApiResponse(user.data)
        else:
            return ApiResponse(message='token不合法', status=HTTP_401_UNAUTHORIZED)

    def post(self, *args, **kwargs):
        token = self.request.data.get('token')
        naturename = self.request.data.get('naturename').replace(' ', '')
        if len(naturename) == 0 or len(naturename) > 32:
            return ApiResponse(message='自然名不合法', status=HTTP_400_BAD_REQUEST)
        is_auth, user = auth(token)
        if is_auth:
            if not User.objects.filter(naturename=naturename).exists():
                user.naturename = self.request.data.get('naturename')
                user.save()
                return ApiResponse()
            else:
                return ApiResponse(message='该自然名已被占用', status=HTTP_400_BAD_REQUEST)
        else:
            return ApiResponse(message='token不合法', status=HTTP_401_UNAUTHORIZED)


class UserList(APIView):
    """
    所有用户公开信息
    """

    def get(self, *args, **kwargs):
        users = UserSerializer(User.objects.all(), many=True)
        return ApiResponse(users.data)
