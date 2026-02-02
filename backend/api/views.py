from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import Employee, Attendance
from .serializers import EmployeeSerializer, AttendanceSerializer

class EmployeeViewSet(viewsets.ModelViewSet):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer

class AttendanceViewSet(viewsets.ModelViewSet):
    queryset = Attendance.objects.all()
    serializer_class = AttendanceSerializer

    # ⚠️ THIS IS THE NEW LOGIC: Update existing attendance instead of creating duplicates
    def create(self, request, *args, **kwargs):
        employee_id = request.data.get('employee')
        date = request.data.get('date')
        new_status = request.data.get('status')

        # 1. Check if attendance already exists for this employee on this date
        # Note: We filter by 'employee' because that is the Foreign Key
        existing_record = Attendance.objects.filter(employee=employee_id, date=date).first()

        if existing_record:
            # 2. UPDATE the existing record
            existing_record.status = new_status
            existing_record.save()
            
            # Return the updated data
            serializer = self.get_serializer(existing_record)
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        else:
            # 3. CREATE a new record (if none exists)
            return super().create(request, *args, **kwargs)