from django.db import models
from utils import RandomString

import datetime


class UserManager(models.Manager):
    def create_user(self, openid):
        last_login_time = datetime.datetime.now()
        register_time = datetime.datetime.now()
        user = self.create(openid=openid, last_login_time=last_login_time, register_time=register_time)
        return user


class User(models.Model):
    # 微信用户的openid
    openid = models.CharField(max_length=128, primary_key=True)
    # 昵称
    naturename = models.CharField(max_length=32, unique=True, null=True)
    # 登录凭证
    token = models.CharField(max_length=32, unique=True, null=True)
    # 上次登录时间
    last_login_time = models.DateTimeField()
    # 注册时间
    register_time = models.DateTimeField()

    objects = UserManager()

    class Meta:
        db_table = 'user_t'
