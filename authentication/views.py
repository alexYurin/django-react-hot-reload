from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import RetrieveUpdateAPIView
from rest_framework.parsers import JSONParser

from .serializers import (
    LoginSerializer, RegistrationSerializer, UserSerializer,
)
from .renderers import UserJSONRenderer

class UserRetrieveUpdateAPIView(RetrieveUpdateAPIView):
    permission_classes = (IsAuthenticated,)
    renderer_classes = (UserJSONRenderer,)
    serializer_class = UserSerializer

    def retrieve(self, request, *args, **kwargs):
        # В этом методе мы не хотим ничего проверять или сохранять.
        # Вместо этого мы просто хотим, чтобы сериализатор преобразовал наш объект 
        # в JSON и послал клиенту.        
        serializer = self.serializer_class(request.user)

        return Response(serializer.data, status=status.HTTP_200_OK)

    def update(self, request, *args, **kwargs):
        serializer_data = request.data.get('user', {})

        # Вот где используется последовательность сериализации, 
        # проверки, сохранения, о которой мы говорили ранее.
        serializer = self.serializer_class(
            request.user, data=serializer_data, partial=True
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data, status=status.HTTP_200_OK)


class RegistrationAPIView(APIView):
    # Позволяем любому пользователю (аутентифицированному или нет) переходить на эту конечную точку.
    permission_classes = (AllowAny,)
    renderer_classes = (UserJSONRenderer,)
    serializer_class = RegistrationSerializer

    def post(self, request):
        user = request.data.get('user', {})

        # Код, используемый ниже для сериализатора создания, проверки и сохранения пользователя 
        # является стандартным и Вы будете их часто встречать на протяжении этого курса и позднее работая самостоятельно. 
        # Ознакомтесь с ними.
        serializer = self.serializer_class(data=user)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data, status=status.HTTP_201_CREATED)


class LoginAPIView(APIView):
    permission_classes = (AllowAny,)
    renderer_classes = (UserJSONRenderer,)
    serializer_class = LoginSerializer

    def post(self, request):
        user = request.data.get('user', {})

        # ОБратите внимание на то, что здесь мы не вызываем метод `serializer.save()`,
        # как делали раньше при создании конечной точки для регистрации.
        # Это связано с тем, что мы не хотим что-либо сохранять. Метод `validate` нашего 
        # сериализатора делает всё что нам нужно для реализации входа в систему.        
        serializer = self.serializer_class(data=user)
        serializer.is_valid(raise_exception=True)

        return Response(serializer.data, status=status.HTTP_200_OK)
