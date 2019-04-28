import logging

from aip import AipImageClassify
from rest_framework.views import APIView

from server.settings import config
from utils import ApiResponse
from .forms import *

logger = logging.getLogger('django')


class Recognize(APIView):
    """
    识植物模块
    """

    APPID = config.get('BAIDU', 'appid')
    APPKEY = config.get('BAIDU', 'appkey')
    APPSECRET = config.get('BAIDU', 'appsecret')
    client = AipImageClassify(APPID, APPKEY, APPSECRET)

    def post(self, *args, **kwargs):
        form = UploadRecognizeFileForm(self.request.POST, self.request.FILES)
        if form.is_valid():
            res = self.client.plantDetect(form.cleaned_data.get('image').read())
            name = res.get('result')[0].get('name')
            score = res.get('result')[0].get('score')
            return ApiResponse({'name': name, 'score': score})
        else:
            logger.error("上传失败" + form.errors)
            return ApiResponse(message="上传失败")
