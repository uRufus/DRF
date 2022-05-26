from .base import *

DEBUG = False

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'backend',
        'USER': 'root',
        'PASSWORD': 'test',
        'HOST': 'db',
        'PORT': '5432'
    }
}