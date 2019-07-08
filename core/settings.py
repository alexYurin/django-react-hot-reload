"""
Django settings for core project.

Generated by 'django-admin startproject' using Django 2.1.7.

For more information on this file, see
https://docs.djangoproject.com/en/2.1/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/2.1/ref/settings/
"""

import os
import sys

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/2.1/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'j@-z==c0^xf_dx2i8(wg37bk85kijomaak$87dw*j@fin9w+&4'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ['*']


# Application definition

INSTALLED_APPS = [
    
    # Modern style for admin panel
    'jet',

    # Django apps
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    # Cross-origin resource sharing
    'corsheaders',

    # Development enviroment
    'webpack_loader',

    # API
    'rest_framework',
    'api_v1',
]

# Django rest framework 
REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.IsAuthenticated',
    ),
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_jwt.authentication.JSONWebTokenAuthentication',
        'rest_framework.authentication.SessionAuthentication',
        'rest_framework.authentication.BasicAuthentication',
    ),
}

# Json Web Token Auth
JWT_AUTH = {
    'JWT_RESPONSE_PAYLOAD_HANDLER': 'core.utils.my_jwt_response_handler'
}


# Cors configuration
# https://github.com/ottoyiu/django-cors-headers#configuration
CORS_ORIGIN_ALLOW_ALL = True


# Middleware configuration
SECURITY_MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
]

# This is required to go first! See: https://github.com/ottoyiu/django-cors-headers#setup
CORS_MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
]

# Use Whitenoise to serve static files
# See: https://whitenoise.readthedocs.io/
WHITENOISE_MIDDLEWARE = [
    'whitenoise.middleware.WhiteNoiseMiddleware',
]

DJANGO_MIDDLEWARE = [
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

MIDDLEWARE_CONFIG = SECURITY_MIDDLEWARE + CORS_MIDDLEWARE

MIDDLEWARE_DEVELOPMENT = MIDDLEWARE_CONFIG + DJANGO_MIDDLEWARE

# CORS Needs to go first! See: https://github.com/ottoyiu/django-cors-headers#setup
MIDDLEWARE_PRODUCTION = MIDDLEWARE_CONFIG + WHITENOISE_MIDDLEWARE + DJANGO_MIDDLEWARE

MIDDLEWARE = MIDDLEWARE_DEVELOPMENT if DEBUG else MIDDLEWARE_PRODUCTION

ROOT_URLCONF = 'core.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': ['frontend/templates'],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'core.wsgi.application'


# Database
# https://docs.djangoproject.com/en/2.1/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'django_db',
        'USER' : 'admin',
        'PASSWORD' : 'ecommerce_admin',
        'HOST' : '127.0.0.1',
        'PORT' : '5432',
    }
}


# Password validation
# https://docs.djangoproject.com/en/2.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/2.1/topics/i18n/

LANGUAGE_CODE = 'ru'

TIME_ZONE = 'Asia/Novosibirsk'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Webpack Loader by Owais Lane
# https://github.com/owais/django-webpack-loader

WEBPACK_LOADER_DEVELOPMENT = {
    'DEFAULT': {
        'BUNDLE_DIR_NAME': 'builds-dev/',
        'STATS_FILE': os.path.join(str(BASE_DIR), 'frontend', 'webpack', 'webpack-stats.dev.json')
    }
}

WEBPACK_LOADER_PRODUCTION = {
    'DEFAULT': {
        'BUNDLE_DIR_NAME': 'builds/',
        'STATS_FILE': os.path.join(str(BASE_DIR), 'frontend', 'webpack', 'webpack-stats.production.json')
    }
}

WEBPACK_LOADER = WEBPACK_LOADER_DEVELOPMENT if DEBUG else WEBPACK_LOADER_PRODUCTION


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/2.1/howto/static-files/

STATICFILES_STORAGE = 'whitenoise.storage.CompressedStaticFilesStorage'

STATIC_URL = '/assets/'
MEDIA_URL = '/media/'

STATIC_ROOT = os.path.join(BASE_DIR, 'assets')
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

STATICFILES_DIRS = (
    os.path.join(BASE_DIR, 'frontend'),
    # Put strings here, like "/home/html/static" or "C:/www/django/static".
    # Always use forward slashes, even on Windows.
    # Don't forget to use absolute paths, not relative paths.
)

# List of finder classes that know how to find static files in
# various locations.
STATICFILES_FINDERS = (
    'django.contrib.staticfiles.finders.FileSystemFinder',
    'django.contrib.staticfiles.finders.AppDirectoriesFinder',
    'django.contrib.staticfiles.finders.DefaultStorageFinder',
)
