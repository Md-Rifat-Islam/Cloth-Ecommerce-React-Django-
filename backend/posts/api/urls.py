# posts/api/urls.py 

from django.urls import path
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from posts import views

from .views import PostViewSet, LoginView, RegisterView, MyTokenObtainPairView, dashboard
# from posts.views import testEndPoint
from posts.views import getRoutes  # Make sure this import exists


post_router = DefaultRouter()
post_router.register(r'posts', PostViewSet)

urlpatterns = [
    path('login/', LoginView.as_view(), name='login'),
    
    
    path("token/", MyTokenObtainPairView.as_view(), name="token_obtain_pair"),
    # path("token/refresh/", TokenObtainPairView.as_view(), name="token_refresh"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path('register/', RegisterView.as_view(), name='register'),
    path("dashboard/", dashboard, name="dashboard"),
    
    # path('test/', testEndPoint, name='test'),
    
    path('', views.getRoutes, name='routes'),
]



#---------------------------------------------------------

# 

