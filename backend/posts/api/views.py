#post/api/views.py

from ..models import Post
from posts.models import User, Profile
from posts.api.serializers import UserSerializer, MyTokenObtainPairSerializer, RegisterSerializer
from .serializers import PostSerializer

from django.contrib.auth import authenticate, login, logout

from rest_framework import generics, status
from rest_framework.decorators import action, api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet

from rest_framework_simplejwt.views import TokenObtainPairView




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
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        
    #     user = User.objects.get(username=serializer.data['username'])
    #     user.set_password(serializer.data['password'])
    #     user.save()
        
    #     return Response(serializer.data, status=201)
    
    # @action(detail=False, methods=['post'])
    # def register(self, request):
    #     return self.create(request)
    
@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def dashboard(request):
    if request.method == 'GET':
        response = f"hello {request.user}, Yor are seeing a GET Response"
        return Response({'response': response}, status=status.HTTP_200_OK)
    elif request.method == 'POST':
        text = request.POST.get('text')
        response = f"hello {request.user}, You are seeing a POST Response with text: {text}"
        return Response({'response': response}, status=status.HTTP_200_OK)
    return Response({}, status=status.HTTP_400_BAD_REQUEST)