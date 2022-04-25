from rest_framework.pagination import LimitOffsetPagination
from rest_framework.permissions import DjangoModelPermissions
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from .filters import ProjectFilter, ToDoFilter
from .models import Project, ToDo
from .serializer import ProjectModelSerializer, ToDoModelSerializer

# модель Project: доступны все варианты запросов; для постраничного вывода
# установить размер страницы 10 записей; добавить фильтрацию по совпадению части
# названия проекта;


# class ToDoLimitOffsetPagination(LimitOffsetPagination):
#     default_limit = 1


class ProjectModelViewSet(ModelViewSet):
    serializer_class = ProjectModelSerializer
    queryset = Project.objects.all()
    permission_classes = [DjangoModelPermissions]
    # pagination_class = ToDoLimitOffsetPagination
    # pagination_class.default_limit = 10
    filterset_class = ProjectFilter


class ToDoModelViewSet(ModelViewSet):
    serializer_class = ToDoModelSerializer
    queryset = ToDo.objects.all()
    permission_classes = [DjangoModelPermissions]
    # pagination_class = ToDoLimitOffsetPagination
    # pagination_class.default_limit = 20
    filterset_class = ToDoFilter

    def destroy(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', True)
        instance = self.get_object()
        instance.active = False
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        if getattr(instance, '_prefetched_objects_cache', None):
            # If 'prefetch_related' has been applied to a queryset, we need to
            # forcibly invalidate the prefetch cache on the instance.
            instance._prefetched_objects_cache = {}

        return Response(serializer.data)


