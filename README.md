Zidio Task Management Web Application

## 1. Objective
To design and develop a responsive, feature-rich Task Management Web Application that streamlines task assignment, progress tracking, team collaboration, and video conferencing. This application enhances team productivity and communication.

---

## 2. Technology Stack

- Frontend: React.js (Vite), Tailwind CSS  
- Backend: Node.js, Express.js  
- Database: MongoDB (Mongoose)  
- Authentication: JWT with cookies  
- Video Integration: Jitsi Meet API  
-  Real-Time Features: Socket.io   
---

## 3. Features

### Admin Features
- Admin Login & Signup  
- Create, Edit, Delete Tasks  
- Assign tasks to users  
- Set task priority (High, Medium, Low)  
- Set task deadlines  
- View dashboard with task statistics and analytics  
- Schedule and manage meetings (Jitsi integration)  

### User Features
- User Login & Signup  
- View assigned tasks  
- Update task status (In Progress, Done) 
- View dashboard with task statistics and analytics   
- View and join scheduled meetings  
- Deadline notification today task alert(Real time)

---

## 4. Modules Breakdown

### Authentication
- Role-based login (Admin, User)  
- JWT token and cookie-based session handling  
- Protected routes for both user types  

### Task Management
- Admin can create tasks with title, description, priority, deadline  
- Admin assigns tasks to users  
- Users update task status  
- Dashboard shows analytics for admins  and users

### Meeting Management
- Admin creates meetings with unique Jitsi room names  
- Meetings saved in MongoDB  
- Users can view and join meetings via embedded video interface  

---

## 5. Project Folder Structure

```bash
*Frontend (client/vite-project):*
- *public/*
  - logo.png
  - vite.svg
- *src/*
  - *api/*
    - axios.js
  - *assets/*
    - react.svg
  - *components/*
    - DashboardChart.jsx
    - Navbar.jsx
    - ProgressBar.jsx
    - Sidebar.jsx
    - TaskCard.jsx
  - *context/*
    - AuthContext.jsx
  - *pages/*
    - AdminDashboard.jsx
    - AdminHome.jsx
    - AdminMeetingForm.jsx
    - AdminTasks.jsx
    - LoginPage.jsx
    - SignupPage.jsx
    - UserHome.jsx
    - UserMeetings.jsx
    - VideoCall.jsx
  - App.css
  - App.jsx
  - index.css
  - main.jsx
- .env
- .gitignore
- eslint.config.js
- index.html
- package-lock.json
- package.json
- postcss.config.cjs
- README.md
- tailwind.config.js
- vite.config.js

*Backend (server):*
- *config/*
  - db.js
- *controllers/*
  - authController.js
  - taskController.js
  - meetingController.js
- *models/*
  - User.js
  - Task.js
  - Meeting.js
- *routes/*
  - authRoutes.js
  - userRoutes.js
  - taskRoutes.js
  - meetingRoutes.js
- *middleware/*
  - authMiddleware.js
- .env
- index.js
- package-lock.json
- package.json
- server.js
-
---

6. Setup Instructions

Backend

cd backend
npm install
touch .env

Create a .env file and add:

MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret

Run server:

npm start
or 
node server.js

Frontend

cd frontend/vite-project
npm install
npm run dev


---

7. Jitsi Integration

Uses @jitsi/react-sdk to embed secure video calls

Admin creates meeting → stored in DB → users join via embedded iFrame



---

8. Future Enhancements

Task comments and file uploads

Email/popup meeting notifications

Attendance tracking via video



---

9. Learnings

Full MERN stack experience

Secure user authentication

Jitsi Meet integration

REST API development with MongoDB

Tailwind-based UI design

State management in React



---

10. Credits

Developed by: Amrutha M T
Internship: Zidio Company


---