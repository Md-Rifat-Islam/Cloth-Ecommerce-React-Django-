# backend/posts/views.py

from django.http import JsonResponse

def getRoutes(request):
    routes = [
        {"path": "/api/posts/", "method": "GET", "description": "Get all posts"},
        {"path": "/api/posts/<id>/", "method": "GET", "description": "Get a single post"},
        {"path": "/posts/login/", "method": "POST", "description": "Login"},
        {"path": "/posts/register/", "method": "POST", "description": "Register a new user"},
        {"path": "/posts/token/", "method": "POST", "description": "Obtain JWT token"},
        {"path": "/posts/token/refresh/", "method": "POST", "description": "Refresh JWT token"},
        {"path": "/posts/dashboard/", "method": "GET/POST", "description": "Dashboard endpoint"},
    ]
    return JsonResponse(routes, safe=False)
