from django.db import models

class Employee(models.Model):
    # ⚠️ FIX: primary_key=True means this IS the ID. No hidden IDs anymore.
    employee_id = models.CharField(max_length=50, primary_key=True) 
    full_name = models.CharField(max_length=100)
    email = models.EmailField()
    department = models.CharField(max_length=100)

    def __str__(self):
        return self.full_name

class Attendance(models.Model):
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE)
    date = models.DateField()
    status = models.CharField(max_length=10, choices=[('Present', 'Present'), ('Absent', 'Absent')])
    
    def __str__(self):
        return f"{self.employee.full_name} - {self.date}"