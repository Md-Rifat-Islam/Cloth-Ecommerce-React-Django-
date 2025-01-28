from django.contrib import admin
from .models import Post
from posts.models import Profile, User

# Register your models here.
admin.site.register(Post)

class UserAdmin(admin.ModelAdmin):
    list_display = ['id', 'username', 'email']
    search_fields = ['username', 'email']
    list_filter = ['is_staff', 'is_superuser']
    
class ProfileAdmin(admin.ModelAdmin):
    list_display = ['id', 'full_name', 'user', 'verified']
    list_editable = ['user', 'full_name', 'verified']
    
admin.site.register(User, UserAdmin)
admin.site.register(Profile, ProfileAdmin)
