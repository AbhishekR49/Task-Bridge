
import { Link } from "react-router-dom";
import { BriefcaseBusiness } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

function Navbar() {
  const { user, isAuthenticated, isLoading, logout } = useAuth();

  const dashboardPath =
    user?.role === "poster"
      ? "/poster/dashboard"
      : "/applicant/dashboard";

  return (
    <nav className="sticky top-0 z-50 border-b border-blue-100 bg-[#EFF6FF] text-[#1E293B]">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-brand to-green text-white">
            <BriefcaseBusiness size={19} />
          </div>

          <span className="text-xl font-bold tracking-tight text-heading">
            Task<span className="text-brand">Bridge</span>
          </span>
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-4 sm:gap-7">
          <Link
            to="/"
            className="hidden text-sm font-medium text-body transition-colors hover:text-brand sm:block"
          >
            Explore Tasks
          </Link>

          {isLoading ? (
            <div className="h-9 w-24 animate-pulse rounded-lg bg-blue-100" />
          ) : isAuthenticated ? (
            <>
              <Link
                to={dashboardPath}
                className="text-sm font-medium text-body transition-colors hover:text-brand"
              >
                Dashboard
              </Link>

              <span className="hidden text-sm font-medium text-heading sm:block">
                Hi, {user?.name?.split(" ")[0]}
              </span>

              <button
                onClick={logout}
                className="rounded-lg border border-blue-200 px-4 py-2.5 text-sm font-semibold text-body transition-colors hover:bg-blue-100"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm font-medium text-body transition-colors hover:text-brand"
              >
                Log in
              </Link>

              <Link
                to="/register"
                className="rounded-lg bg-brand px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-hover"
              >
                Get started
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
