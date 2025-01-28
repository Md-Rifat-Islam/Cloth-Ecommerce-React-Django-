# posts/api/urls.py 

from django.urls import path
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from posts import views

from .views import PostViewSet, LoginView, RegisterView, MyTokenObtainPairView, dashboard

post_router = DefaultRouter()
post_router.register(r'posts', PostViewSet)

urlpatterns = [
    path('login/', LoginView.as_view(), name='login'),
    
    
    path("token/", MyTokenObtainPairView.as_view(), name="token_obtain_pair"),
    # path("token/refresh/", TokenObtainPairView.as_view(), name="token_refresh"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path('register/', RegisterView.as_view(), name='register'),
    path("dashboard/", dashboard, name="dashboard"),
]



#---------------------------------------------------------

# 

