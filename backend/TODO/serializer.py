from .models import Project, ToDo
from rest_framework.serializers import ModelSerializer


class ProjectModelSerializer(ModelSerializer):

    class Meta:
        model = Project
        fields = '__all__'


class ToDoModelSerializer(ModelSerializer):

    class Meta:
        model = ToDo
        fields = '__all__'
