import jwt

from datetime import datetime, timedelta

from django.conf import settings
from django.contrib.auth.models import (
    AbstractBaseUser, BaseUserManager, PermissionsMixin
)

from django.db import models


class UserManager(BaseUserManager):
    """
    Django требует, чтобы при создании нестандартной, пользовательской модели 
    пользователя использовался свой собственный класс Manager. Наследуясь от 
    `BaseUserManager`, мы заимствуем большую часть кода, которая используется Django
    при создании модели `User`.
    
    Все что нам остаётся сделать - это переопределить функцию `create_user`, которую
    мы будем использовать для создания объектов `User`.        
    """

    def create_user(self, username, email, password=None):
        """Метод создаёт и возвращает модель `User` 
        с электронной почтой, именем пользователя и паролем."""
        if username is None:
            raise TypeError('Users must have a username.')

        if email is None:
            raise TypeError('Users must have an email address.')

        user = self.model(username=username, email=self.normalize_email(email))
        user.set_password(password)
        user.save()

        return user

    def create_superuser(self, username, email, password):
        """Метод создаёт и возвращает модель `User` с правами 
        суперпользователя (админа)."""
        if password is None:
            raise TypeError('Superusers must have a password.')

        user = self.create_user(username, email, password)
        user.is_superuser = True
        user.is_staff = True
        user.save()

        return user


class User(AbstractBaseUser, PermissionsMixin):
    # У каждого `User` должен быть уникальный человеко-понятный идентификатор,
    # который мы можем использовать для представления `User` в UI. Мы хотим
    # проиндексировать этот столбец в базе данных для ускорения поиска.    
    username = models.CharField(db_index=True, max_length=255, unique=True)

    # Нам также нужно каким-то образом связываться с пользователем
    # и способ идентификации пользователя при входе в систему. Поскольку нам в
    # любом случае необходим адрес электронной почты для связи с пользователем, 
    # мы будем также использовать email для входа в систему, поскольку он 
    # наиболее часто используется в качестве логина на момент написания учебного 
    # пособия.    
    email = models.EmailField(db_index=True, unique=True)

    # Когда пользователь больше не захочет использовать нашу платформу,     
    # он может захотеть удалить свою учетную запись. Для нас это будет проблемой, 
    # поскольку собранные о пользователе данные ценны для нас и мы не хотим удалять их. 
    # Мы просто предложим пользователям отключить их учетную запись вместо её удаления.
    # Таким образом, они больше не будут отображаться на сайте, но мы сможем продолжать
    # анализировать собранные данные.    
    is_active = models.BooleanField(default=True)

    # Флаг `is_staff` используется Django, чтобы определить кто может, 
    # а кто - нет входить в систему администрирования Django. Для большинства пользователей
    # значение этого флага всегда будет равно false.
    is_staff = models.BooleanField(default=False)

    # Временная метка, показывающая когда был создан этот объект.
    created_at = models.DateTimeField(auto_now_add=True)

    # Временная метка, показывающая, когда в последний раз обновлялся этот объект.
    updated_at = models.DateTimeField(auto_now=True)

    # При использовании нестандартной, пользовательской модели пользователя необходимо
    # определить дополнительные поля, требуемые Django.

    # Свойство `USERNAME_FIELD` указывает какое поле будет использоваться для входа в систему.
    # Здесь мы хотим использовать поле email.
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    # Сообщаем Django, что для работы с объектами этого типа нужно использовать 
    # определенный выше класс UserManager.
    objects = UserManager()

    def __str__(self):
        """
        Метод возвращает строковое предствление текущего `User`.

        Эта строка используется при выводе модели `User` в консоли.        
        """
        return self.email

    @property
    def token(self):
        """
        Метод позволяет нам получить токен пользователя, вызывая `user.token` 
        вместо `user.generate_jwt_token()`.

        Это возможно благодаря декоратору `@property`, указанному выше. `token` называется 
        "динамическим свойством".
        """
        return self._generate_jwt_token()

    def get_full_name(self):
        """
        Этот метод нужен Django, например, для работы с электронными письмами. 
        Чаще всего метод возвращает имя и фамилию пользователя. Но поскольку
        мы не храним настоящих имен пользователей, мы возвращаем вместо этого 
        их username.
        """
        return self.username

    def get_short_name(self):
        """
        Этот метод нужен Django, например, для работы с электронными письмами. 
        Чаще всего метод возвращает имя пользователя. Но поскольку
        мы не храним настоящих имен пользователей, мы возвращаем вместо этого 
        их username.
        """
        return self.username

    def _generate_jwt_token(self):
        """
        Генерирует JSON веб токен, который хранит ID данного пользователя, истекающий через 60 дней после создания.
        """
        dt = datetime.now() + timedelta(days=60)

        token = jwt.encode({
            'id': self.pk,
            'exp': int(dt.strftime('%s'))
        }, settings.SECRET_KEY, algorithm='HS256')

        return token.decode('utf-8')