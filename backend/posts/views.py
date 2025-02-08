#posts/views.py

from django.http import JsonResponse

def getRoutes(request):
    routes = [
        {"path": "/api/posts/", "method": "GET", "description": "Get all posts"},
        {"path": "/api/posts/<id>/", "method": "GET", "description": "Get a single post"},
        {"path": "/api/login/", "method": "POST", "description": "Login"},
        {"path": "/api/register/", "method": "POST", "description": "Register a new user"},
        {"path": "/api/token/", "method": "POST", "description": "Obtain JWT token"},
        {"path": "/api/token/refresh/", "method": "POST", "description": "Refresh JWT token"},
        {"path": "/api/dashboard/", "method": "GET/POST", "description": "Dashboard endpoint"},
    ]
    return JsonResponse(routes, safe=False)
