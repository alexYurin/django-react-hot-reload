from rest_framework.authtoken.views import obtain_auth_token
from django.views.decorators.csrf import csrf_exempt
from django.urls import path
from . import views


user_list = views.UserViewSet.as_view({
    'get': 'list',
    'post': 'create'
})

user_detail = views.UserViewSet.as_view({
    'get': 'retrieve',
    'put': 'update',
    'patch': 'partial_update',
    'delete': 'destroy'
})

urlpatterns = [
    path('token-auth', csrf_exempt(obtain_auth_token)),
    path('users', user_list, name='users-list'),
    path('users/<int:pk>', user_detail, name='user-detail'),
]
