
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function RoleBasedRoute({ allowedRole }) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-gray-500">Checking permissions...</p>
      </div>
    );
  }

  // Not authenticated
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Authenticated, but wrong role
  if (user.role !== allowedRole) {
    const correctDashboard =
      user.role === "poster"
        ? "/poster/dashboard"
        : "/applicant/dashboard";

    return <Navigate to={correctDashboard} replace />;
  }

  // Authorized
  return <Outlet />;
}

export default RoleBasedRoute;
