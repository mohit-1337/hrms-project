# 🏢 HRMS Lite System

A Full-Stack Human Resource Management System designed to manage employee records and attendance efficiently. Built with the **MERN Stack philosophy** but using **Django** for the backend logic and **MongoDB** for flexible data storage.
 
## 🚀 Live Demo

- **Frontend (Vercel):** [Click Here to View App](https://hrms-project-murex.vercel.app/)
- **Backend API (Render):** [Click Here to View API](https://hrms-project-j9ox.onrender.com/api/)

---

## 🛠️ Tech Stack

### **Frontend**
- **React.js (Vite):** Fast and modern UI library.
- **Tailwind CSS:** For clean, responsive styling.
- **Axios:** For handling HTTP requests.

### **Backend**
- **Django REST Framework (DRF):** Powerful API creation.
- **MongoDB (via Djongo):** NoSQL database for flexible data storage.

---

## ✨ Key Features

✅ **Employee Management:** Add new employees with unique IDs, names, and departments.  
✅ **Custom ID System:** Uses human-readable IDs (e.g., `101`, `EMP002`) instead of complex database hashes.  
✅ **Smart Attendance:** "Upsert" logic prevents duplicate entries. Toggling between *Present* and *Absent* updates the existing record for the day instead of creating a new one.  
✅ **Real-Time Deletion:** Instantly remove employees and their associated data. 
