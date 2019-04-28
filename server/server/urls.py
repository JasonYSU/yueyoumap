from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('tools/', include('tools.urls')),
    path('account/', include('account.urls')),
]
