import jwt

from django.conf import settings

from rest_framework import authentication, exceptions

from .models import User


class JWTAuthentication(authentication.BaseAuthentication):
    authentication_header_prefix = 'Token'

    def authenticate(self, request):
        """
        Метод `authenticate` вызывается для каждого запроса независимо от того требует
        ли конечная точка, чтобы пользователь был аутентифицирован.        

        Метод `authenticate` может вернуть один из двух ответов:

        1) `None` - Мы возвращаем `None`, если не хотим осуществлять аутентификацию. 
                    Обычно это означает, что мы знаем, что аутентифицировать пользователя
                    не удастся. Например, в заголовках запроса отсутствует токен.

        2) `(user, token)` - Мы возвращаем комбинацию пользователь/токен, когда аутентификация 
                             прошла успешно.

                            Если ни один из случаев не выполняется - это означает, 
                            что возникла ошибка и мы ничего не возвращаем.
                            Мы просто генерируем исключение `AuthenticationFailed` 
                            и позволяем Django REST фреймворку обработать его.                            
        """
        request.user = None

        # `auth_header` всегда должен быть массивом с двумя элементами: 1) названием 
        # заголовка аутентификации (в этом случае, "Token") и 2) JWT, который
        # мы должны использовать для аутентификации.
        auth_header = authentication.get_authorization_header(request).split()
        auth_header_prefix = self.authentication_header_prefix.lower()

        if not auth_header:
            return None

        if len(auth_header) == 1:
            # Неправильный заголовок токена. Учетные данные не были предоставлены. Даже не пытаемся 
            # осуществлять аутентификацию.
            return None

        elif len(auth_header) > 2:
            # Неправильный заголовок токена. Строка Token не может содержать пробелы. Даже не пытаемся 
            # осуществлять аутентификацию.
            return None

        # Библиотека JWT, которую мы используем, не может работать с типом `byte`, который 
        # часто используется стандартными библиотеками в Python 3. Чтобы решить эту проблему,
        # мы просто должны декодировать `prefix` и `token`. Это не делает код более чистым, но 
        # является хорошим решением, поскольку мы получим ошибку
        # если не декодируем эти значения.
        prefix = auth_header[0].decode('utf-8')
        token = auth_header[1].decode('utf-8')

        if prefix.lower() != auth_header_prefix:
            # Префикс заголовка аутентификации не такой как мы ожидали. Даже не пытаемся 
            # осуществлять аутентификацию.
            return None

        # Дойдя до этого места в коде, мы можем быть уверены, что существует ненулевая вероятность успешной 
        # аутентификации. Мы поручаем провести аутентификацию, используя предоставленные учетные данные,  
        # методу, приведенному ниже.
        return self._authenticate_credentials(request, token)

    def _authenticate_credentials(self, request, token):
        """
        Пытаемся осуществить аутентификацию, используя заданные учетные данные. Если аутентификация прошла успешно, 
        возвращаем пользователя и токен. Если нет, то генерируем ошибку.
        """
        try:
            payload = jwt.decode(token, settings.SECRET_KEY)
        except:
            # Ошибка при аутентификации. Невозможно декодировать токен.
            msg = 'Invalid authentication. Could not decode token.'
            raise exceptions.AuthenticationFailed(msg)

        try:
            user = User.objects.get(pk=payload['id'])
        except User.DoesNotExist:
            # Не найдено ни одного пользователя, соответствующего этому токену.
            msg = 'No user matching this token was found.'
            raise exceptions.AuthenticationFailed(msg)

        if not user.is_active:
            # Учетная запись этого пользователя была деактивирована.
            msg = 'This user has been deactivated.'
            raise exceptions.AuthenticationFailed(msg)

        return (user, token)