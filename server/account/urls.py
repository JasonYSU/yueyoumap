from django.urls import re_path
from . import views

urlpatterns = [
    re_path(r'^token$', views.Account.as_view()),
    re_path(r'^info$', views.Info.as_view()),
    re_path(r'^list$', views.UserList.as_view()),
]
