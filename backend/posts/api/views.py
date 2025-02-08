#post/api/views.py

import os
from ..models import Post
from posts.models import User, Profile
from posts.api.serializers import UserSerializer, MyTokenObtainPairSerializer, RegisterSerializer
from .serializers import PostSerializer

from django.contrib.auth import authenticate, login, logout, get_user_model

from rest_framework import generics, status
from rest_framework.decorators import action, api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet
from rest_framework_simplejwt.views import TokenObtainPairView

from google.auth.transport import requests
from google.oauth2 import id_token



class PostViewSet(ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

class LoginView(APIView):
    permission_classes = [AllowAny]  # Allow anyone to access the login endpoint

    def post(self, request, *args, **kwargs):
        username = request.data.get('username')
        password = request.data.get('password')

        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return Response({'success': True, 'message': 'Login successful'})
        return Response({'success': False, 'message': 'Invalid credentials'}, status=401)

class LogoutView(APIView):
    def post(self, request, *args, **kwargs):
        logout(request)
        return Response({'success': True, 'message': 'Logged out successfully'})

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
    
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        # Use the default behavior for validation and saving
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        # Save the new user and get the response
        self.perform_create(serializer)
        
        # Return a custom success response
        return Response({
            "message": "Registration successful",
            "user": serializer.data
        }, status=status.HTTP_201_CREATED)
        
    #     user = User.objects.get(username=serializer.data['username'])
    #     user.set_password(serializer.data['password'])
    #     user.save()
        
    #     return Response(serializer.data, status=201)
    
    # @action(detail=False, methods=['post'])
    # def register(self, request):
    #     return self.create(request)
    
@api_view(["GET", "POST"])
@permission_classes([IsAuthenticated])
def dashboard(request):
    if request.method == "GET":
        response = f"Hello {request.user}, You are seeing a GET response"
        return Response({"response": response}, status=status.HTTP_200_OK)

    elif request.method == "POST":
        token = request.data.get("token")
        text = request.data.get("text", "")

        if token:
            try:
                google_info = id_token.verify_oauth2_token(
                    token, requests.Request(), os.getenv("GOOGLE_CLIENT_ID")
                )
                email = google_info["email"]
                name = google_info.get("name", "User")
                
                user, created = User.objects.get_or_create(email=email, defaults={"username": name})

                response = f"Hello {user.username}, You are authenticated with Google and seeing a POST response with text: {text}"
                return Response({"response": response, "user_id": user.id}, status=status.HTTP_200_OK)
            
            except Exception as e:
                return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

        else:
            response = f"Hello {request.user}, You are seeing a POST response with text: {text}"
            return Response({"response": response}, status=status.HTTP_200_OK)

    return Response({}, status=status.HTTP_400_BAD_REQUEST)