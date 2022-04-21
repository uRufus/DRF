from django.contrib import admin

# Register your models here.
from django.contrib.auth.admin import UserAdmin
from .models import User


class MyUserAdmin(UserAdmin):
    model = User

    # fieldsets = UserAdmin.fieldsets + (
    #         (None, {'fields': ('some_extra_data',)}),
    # )

admin.site.register(User, MyUserAdmin)