from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer
from rest_framework.viewsets import ModelViewSet, GenericViewSet
from .models import User
from .serializer import UserModelSerializer
from rest_framework import mixins

# модель User: есть возможность просмотра списка и каждого пользователя в
# отдельности, можно вносить изменения, нельзя удалять и создавать;


class UserModelViewSet(mixins.ListModelMixin, mixins.RetrieveModelMixin, mixins.UpdateModelMixin, GenericViewSet):
    queryset = User.objects.all()
    serializer_class = UserModelSerializer
    renderer_classes = [JSONRenderer, BrowsableAPIRenderer]

# class UserModelViewSet(ModelViewSet):
#     serializer_class = UserModelSerializer
#     queryset = User.objects.all()


