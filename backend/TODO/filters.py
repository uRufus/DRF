from django_filters import rest_framework as filters, DateFromToRangeFilter
from .models import Project, ToDo


class ProjectFilter(filters.FilterSet):
    name = filters.CharFilter(lookup_expr='contains')

    class Meta:
        model = Project
        fields = ['name']


class ToDoFilter(filters.FilterSet):
    project = filters.CharFilter(field_name='project')
    created_at = DateFromToRangeFilter(field_name='created_at')

    class Meta:
        model = ToDo
        fields = ['project', 'created_at']
