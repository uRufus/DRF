from .debug import *


DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'backend',
        'USER': 'root',
        'PASSWORD': 'test',
        'HOST': '127.0.0.1',
        'PORT': '54327'
    }
}