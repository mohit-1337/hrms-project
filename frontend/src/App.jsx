import { useState, useEffect } from 'react';
import axios from 'axios';


const API_URL = "https://hrms-project-j9ox.onrender.com/api";

function App() {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({ employee_id: '', full_name: '', email: '', department: '' });
  const [loading, setLoading] = useState(false);

  // Load employees when page opens
  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const res = await axios.get(`${API_URL}/employees/`);
      console.log("Fetched Data:", res.data); // Debugging
      setEmployees(res.data);
    } catch (err) {
      console.error("Error fetching data", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${API_URL}/employees/`, form);
      alert("Employee Added Successfully!");
      setForm({ employee_id: '', full_name: '', email: '', department: '' }); // Clear form
      fetchEmployees(); // Refresh list
    } catch (err) {
      console.error("Add Error:", err);
      alert("Error: ID might be duplicate or Backend is down.");
    }
    setLoading(false);
  };

  const handleDelete = async (empId) => {
    if (!empId) {
      alert("Error: Employee ID is missing!");
      return;
    }

    if (!confirm(`Are you sure you want to delete Employee ${empId}?`)) return;

    try {
      // Sending request to: /api/employees/101/
      await axios.delete(`${API_URL}/employees/${empId}/`);
      alert("Employee Deleted Successfully");
      fetchEmployees(); 
    } catch (err) {
      console.error("Delete Error:", err);
      alert(`Error: ${err.response?.data?.detail || "Could not delete employee"}`);
    }
  };

 
  const markAttendance = async (empId, status) => {
    const date = new Date().toISOString().split('T')[0]; // Today's date YYYY-MM-DD
    
    try {
      await axios.post(`${API_URL}/attendance/`, { 
        employee: empId, // Sends "101" to backend
        date: date, 
        status: status 
      });
      alert(`Marked ${status} for today!`);
    } catch (err) {
      console.error("Attendance Error:", err);
      if (err.response && err.response.data) {
         alert(`Error: ${JSON.stringify(err.response.data)}`);
      } else {
         alert("Error: Attendance might already be marked for today.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-10 font-sans">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center text-blue-700">HRMS Lite System</h1>
        
        {/* SECTION 1: ADD EMPLOYEE FORM */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Add New Employee</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input className="border p-3 rounded" placeholder="Employee ID (Unique - e.g. 101)" value={form.employee_id} onChange={e => setForm({...form, employee_id: e.target.value})} required />
            <input className="border p-3 rounded" placeholder="Full Name" value={form.full_name} onChange={e => setForm({...form, full_name: e.target.value})} required />
            <input className="border p-3 rounded" placeholder="Email Address" type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required />
            <input className="border p-3 rounded" placeholder="Department" value={form.department} onChange={e => setForm({...form, department: e.target.value})} required />
            
            <button disabled={loading} className="col-span-1 md:col-span-2 bg-blue-600 text-white font-bold p-3 rounded hover:bg-blue-700 transition">
              {loading ? "Adding..." : "+ Add Employee"}
            </button>
          </form>
        </div>

        {/* SECTION 2: EMPLOYEE LIST */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Employee List</h2>
          {employees.length === 0 ? <p className="text-gray-500">No employees found.</p> : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-100 border-b">
                    <th className="p-3">ID</th>
                    <th className="p-3">Name</th>
                    <th className="p-3">Dept</th>
                    <th className="p-3 text-center">Mark Attendance</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map(emp => (
                    
                    <tr key={emp.employee_id} className="border-b hover:bg-gray-50">
                      <td className="p-3 font-mono text-sm">{emp.employee_id}</td>
                      <td className="p-3 font-medium">{emp.full_name}</td>
                      <td className="p-3 text-gray-600">{emp.department}</td>
                      
                      {/* Attendance Buttons pass 'employee_id' */}
                      <td className="p-3 text-center space-x-2">
                        <button onClick={() => markAttendance(emp.employee_id, 'Present')} className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold hover:bg-green-200">Present</button>
                        <button onClick={() => markAttendance(emp.employee_id, 'Absent')} className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-bold hover:bg-red-200">Absent</button>
                      </td>

                      {/* Delete Button passes 'employee_id' */}
                      <td className="p-3 text-right">
                        <button onClick={() => handleDelete(emp.employee_id)} className="text-red-500 hover:text-red-700 font-bold text-sm">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;