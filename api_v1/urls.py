from rest_framework_jwt.views import obtain_jwt_token
from django.views.decorators.csrf import csrf_exempt
from django.urls import path, include
from . import views

urlpatterns = [
    path('auth/token/', csrf_exempt(obtain_jwt_token)),
    path('auth/', include('authentication.urls')),
]
