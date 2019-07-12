from rest_framework import serializers
from django.contrib.auth import authenticate

from .models import User


class UserSerializer(serializers.ModelSerializer):
    """Класс осуществляет сериализацию и десериализацию объектов User."""

    # Длина пароля должна быть не менее 8 символов, но не более 128 
    # символов. Эти значения по умолчанию заданы в Django. Мы могли бы изменить их, но это бы
    # дополнительных усилий, не давая никаких преимуществ, поэтому давайте будем использовать
    # значения по умолчанию.
    password = serializers.CharField(
        max_length=128,
        min_length=8,
        write_only=True
    )

    class Meta:
        model = User
        fields = ('email', 'username', 'password', 'token',)

        # Свойство `read_only_fields` - это альтернатива явного указания атрибута 
        # `read_only=True` для поля как мы делали выше для пароля.
        # Причина, по которой мы хотим использовать `read_only_fields` здесь заключается в том,
        # что нам не нужно указывать какие-либо дополнительные атрибуты для поля. 
        # Полю password нужны были атрибуты `min_length` и
        # `max_length`, в отличие от поля token.
        read_only_fields = ('token',)


    def update(self, instance, validated_data):
        """Осуществляет обновление модели User."""

        # Для паролей не должен использоваться метод `setattr`, в отличие от других полей.
        # Это связано с тем, что Django предоставляет функцию, которая осуществляет хэширование  
        # и добавление солей к паролям, что важно для безопасности приложения. Это означает, что мы должны
        # удалить поле password из словаря `validated_data`, прежде чем обработать данные, хранящиеся в нём.  
        password = validated_data.pop('password', None)

        for (key, value) in validated_data.items():
            # Для ключей, оставшихся в `validated_data`, мы присвоим их значения атрибутам 
            # текущего экземпляра `User`.
            setattr(instance, key, value)

        if password is not None:
            # Метод `.set_password()` осуществляет все необходимые операции 
            # для безопасного сохранения пароля, освобождая нас от необходимости заниматься этим.
            instance.set_password(password)
            
        # После обновления всех полей, мы должны явно сохранить 
        # модель. Стоит отметить, что метод `.set_password()` не сохраняет
        # модель.
        instance.save()

        return instance


class LoginSerializer(serializers.Serializer):
    email = serializers.CharField(max_length=255)
    username = serializers.CharField(max_length=255, read_only=True)
    password = serializers.CharField(max_length=128, write_only=True)
    token = serializers.CharField(max_length=255, read_only=True)

    def validate(self, data):
        # В методе `validate` происходит проверка "правильности" текущего экземпляра
        # `LoginSerializer`. Для случая входа пользователя в систему, это означает,
        # что он ввел адрес электронной почты и пароль и что введенная комбинация 
        # соответствует одному из пользователей в нашей базе данных.
        email = data.get('email', None)
        password = data.get('password', None)

        # Генерируем исключение, если 
        # не был введен адрес электронной почты.
        if email is None:
            raise serializers.ValidationError(
                'An email address is required to log in.'
            )

        # Генерируем исключение, если не был введен пароль.
        if password is None:
            raise serializers.ValidationError(
                'A password is required to log in.'
            )

        # Метод `authenticate` - это метод, предоставляемый Django, который осуществляет проверку 
        # правильности введенной комбинации адрес электронной почты/пароль. Заметьте, что Notice how
        # мы передаём `email` как значение `username`, поскольку в нашей модели User
        # в качестве `USERNAME_FIELD` мы использовали `email`.
        user = authenticate(username=email, password=password)

        # Если не было найдено ни одного пользователя соответствующего этой комбинации адрес электронной почты/пароль, то 
        # метод `authenticate` возвратит `None`. В этом случае генерируем исключение.
        if user is None:
            raise serializers.ValidationError(
                'A user with this email and password was not found.'
            )

        # Django предоставляет специальный флаг для нашей модели `User` - `is_active`. Он используется для того, 
        # чтобы сообщить нам, что пользователь забанен или деактивирован. Такого почти никогда не будет происходить, 
        # но всё равно этот флаг стоит проверять. Генерируем исключение в случае, если флаг не установлен.
        if not user.is_active:
            raise serializers.ValidationError(
                'This user has been deactivated.'
            )

        # Метод `validate` должен возвращать словарь проверенных данных.
        # Эти данные передаются методам `create` и `update`,
        # которые будут показаны ниже.
        return {
            'email': user.email,
            'username': user.username,
            'token': user.token
        }


class RegistrationSerializer(serializers.ModelSerializer):
    """Сериализует запросы на регистрацию и создаёт нового пользователя."""

    # Указываем, что пароль должен быть не менее 8 символов, 
    # не более 128 символов и не может быть прочитан клиентом    
    password = serializers.CharField(
        max_length=128,
        min_length=8,
        write_only=True
    )

    # У клиента не должно быть возможности посылать токен при запросе на регистрацию.
    # Для этого мы передаём в `token` параметр read-only.
    token = serializers.CharField(max_length=255, read_only=True)

    class Meta:
        model = User
        # Здесь перечисляются все поля, которые могут быть включаны в запрос или ответ
        # с учетом явно указанных выше полей.         
        fields = ['email', 'username', 'password', 'token']

    def create(self, validated_data):
        # Используем метод `create_user`? написанный ранее для создания нового пользователя.
        return User.objects.create_user(**validated_data)