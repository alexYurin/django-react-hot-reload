import json

from rest_framework.renderers import JSONRenderer


class UserJSONRenderer(JSONRenderer):
    charset = 'utf-8'

    def render(self, data, media_type=None, renderer_context=None):
        # Если представление генерирует ошибку (например пользователь не может быть аутентифицирован
        # или подобную, `data` будут содержать ключ `errors`. Мы хотим, чтобы используемый 
        # по умолчанию JSONRenderer обрабатывал ошибки, поэтому необходимо 
        # проверить наличие этого ключа в `data`.
        errors = data.get('errors', None)

        # Если был передан ключ `token` в запросе, то он будет байтовым объектом.
        # Байтовые объекты плохо сериализуются, поэтому нам надо его декодировать
        # прежде чем выдавать объект User.
        token = data.get('token', None)

        if errors is not None:
            # Как было сказано ранее, мы хотим, чтобы используемый по умолчанию
            # JSONRenderer обрабатывал ошибки.
            return super(UserJSONRenderer, self).render(data)

        if token is not None and isinstance(token, bytes):
            # Как было сказано выше, мы декодируем `token` только в том случае,
            # если он является байтовым объектом.
            data['token'] = token.decode('utf-8')

        # Наконец мы можем выдать наши данные в пространстве имен "user".
        return json.dumps({
            'user': data
        })