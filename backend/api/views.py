from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Student
from .serializer import StudentSerializer

@api_view(['GET'])
def get_students(request):
    students = Student.objects.all()
    serializedData = StudentSerializer(students, many=True)
    return Response(serializedData.data)


@api_view(['POST'])
def create_student(request):
    data = request.data
    serializedData = StudentSerializer(data=data)

    if serializedData.is_valid():
        serializedData.save()
        return Response(serializedData.data, status=status.HTTP_201_CREATED)
    
    return Response(serializedData.errors, status=status.HTTP_400_BAD_REQUEST)

    
@api_view(['PUT', 'DELETE'])
def student_detail(request, pk):
    try:
        student = Student.objects.get(pk=pk)
    except Student.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == "DELETE":
        student.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    elif request.method == "PUT":
        data = request.data
        serializerData = StudentSerializer(student, data=data)
        if serializerData.is_valid():
            serializerData.save()
            return Response(serializerData.data, status=status.HTTP_201_CREATED)
        return Response(serializerData.errors, status=status.HTTP_400_BAD_REQUEST)

    
