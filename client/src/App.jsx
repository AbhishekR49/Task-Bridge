
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import RoleBasedRoute from "./components/auth/RoleBasedRoute";
import ApplicantDashboard from "./pages/ApplicantDashboard";
import PosterDashboard from "./pages/PosterDashboard";
import CreateTask from "./pages/CreateTask";
import MyTasks from "./pages/MyTasks";
import ExploreTasks from "./pages/ExploreTasks";
import TaskDetails from "./pages/TaskDetails";
import TaskApplications from "./pages/TaskApplications";

function App() {
  return (
    <div className="min-h-screen bg-page text-body">
      <Navbar />

      <Routes>
         {/* Public routes */}
        <Route path="/register" element={<Register/> } />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/tasks" element={<ExploreTasks />} />
        <Route path="/tasks/:id" element={<TaskDetails />} />

         {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<RoleBasedRoute  allowedRole ="applicant"/>}  >
           <Route
             path="/applicant/dashboard"
             element={<ApplicantDashboard />}
           />
          </Route>

          <Route element={<RoleBasedRoute allowedRole="poster" />}>
              <Route
                 path="/poster/dashboard"
                 element={<PosterDashboard />}
              />
              <Route path="/tasks/create" element={<CreateTask />} />

              <Route path="/my-tasks" element={<MyTasks />} />

              <Route  path="/poster/tasks/:taskId/applications" element={<TaskApplications/> } />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
