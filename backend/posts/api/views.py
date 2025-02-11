#post/api/views.py

import os
from django.http import JsonResponse
from django.views import View
from django.contrib.auth import authenticate, login, logout, get_user_model

# Models import
from ..models import Post  # Assuming Post model is in a parent directory
from posts.models import User, Profile  # Importing User and Profile models from 'posts' app

# Serializers import
from posts.api.serializers import UserSerializer, MyTokenObtainPairSerializer, RegisterSerializer
from .serializers import PostSerializer  # Importing PostSerializer for serializing Post data

# Django REST Framework imports
from rest_framework import generics, status
from rest_framework.decorators import action, api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet
from rest_framework_simplejwt.views import TokenObtainPairView  # For JWT token handling

# Google OAuth imports
from google.auth.transport import requests
from google.oauth2 import id_token  # For Google token verification



# Get All Routes
@api_view(['GET'])
def getRoutes(request):
    """
    Returns all available API routes.
    """
    routes = [
        '/posts/token/',
        '/posts/register/',
        '/posts/token/refresh/',
        '/posts/dashboard/'
    ]
    return Response(routes)


# Test Endpoints for GET and POST requests
@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def testEndPoint(request):
    """
    Responds to GET and POST requests with a message that includes the authenticated user's name.
    """
    if request.method == 'GET':
        data = f"Congratulation {request.user}, your API just responded to GET request"
        return Response({'response': data}, status=status.HTTP_200_OK)
    elif request.method == 'POST':
        text = "Hello buddy"
        data = f'Congratulation your API just responded to POST request with text: {text}'
        return Response({'response': data}, status=status.HTTP_200_OK)
    return Response({}, status=status.HTTP_400_BAD_REQUEST)


# Class-based view for GET and POST requests (TestView)
class TestView(View):
    """
    A view that handles GET and POST requests for testing purposes.
    """

    def get(self, request, *args, **kwargs):
        """
        Handle GET requests.
        """
        return JsonResponse(
            {"message": "Success hello GET"},
            status=200,
            json_dumps_params={'ensure_ascii': False}
        )

    def post(self, request, *args, **kwargs):
        """
        Handle POST requests.
        """
        return JsonResponse(
            {"message": "POST received"},
            status=201,
            json_dumps_params={'ensure_ascii': False}
        )


# ModelViewSet for Post
class PostViewSet(ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer


# Login View
class LoginView(APIView):
    permission_classes = [AllowAny]  # Allow anyone to access the login endpoint

    def post(self, request, *args, **kwargs):
        """
        Handles login requests by authenticating the user.
        """
        username = request.data.get('username')
        password = request.data.get('password')

        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return Response({'success': True, 'message': 'Login successful'})
        return Response({'success': False, 'message': 'Invalid credentials'}, status=401)


# Logout View
class LogoutView(APIView):
    def post(self, request, *args, **kwargs):
        """
        Handles logout requests by logging out the user.
        """
        logout(request)
        return Response({'success': True, 'message': 'Logged out successfully'})


# Token View for Pairing
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


# Register View
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        """
        Handles user registration.
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        
        return Response({
            "message": "Registration successful",
            "user": serializer.data
        }, status=status.HTTP_201_CREATED)


# Dashboard View
@api_view(["GET", "POST"])
@permission_classes([IsAuthenticated])
def dashboard(request):
    """
    Handles GET and POST requests for the dashboard.
    """
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