
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function ProtectedRoute() {
  const { isAuthenticated, isLoading } = useAuth();

  // Wait until authentication restoration finishes
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-gray-500">Checking authentication...</p>
      </div>
    );
  }

  // Redirect unauthenticated users to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Render the protected child route
  return <Outlet />;
}

export default ProtectedRoute;
