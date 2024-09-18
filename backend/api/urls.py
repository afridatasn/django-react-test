from django.urls import path
from .views import get_students, create_student, student_detail

urlpatterns = [
    path('students/', get_students, name='get_students'),
    path('students/create/', create_student, name='create_student'),
    path('students/<int:pk>/', student_detail, name='student_detail'),
]