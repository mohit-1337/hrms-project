from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from api.views import EmployeeViewSet, AttendanceViewSet

router = DefaultRouter()
router.register(r'employees', EmployeeViewSet)
router.register(r'attendance', AttendanceViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    # This line was missing! It tells Django where to find your API
    path('api/', include(router.urls)), 
]