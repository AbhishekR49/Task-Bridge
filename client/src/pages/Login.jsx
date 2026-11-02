
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Mail,
  LockKeyhole,
  Eye,
  EyeOff,
  BriefcaseBusiness,
  Code2,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));

    setSuccessMessage("");
  };

const validateForm = () => {
  const newErrors = {};

  if (!formData.email.trim()) {
    newErrors.email = "Email address is required";
  }

  if (!formData.password.trim()) {
    newErrors.password = "Password is required";
  }

  setErrors(newErrors);

  return Object.keys(newErrors).length === 0;
};

  const handleSubmit = (e) => {
    e.preventDefault();

    setSuccessMessage("");

    const isValid = validateForm();

    if (!isValid) return;

    setSuccessMessage("Frontend validation successful!");

    console.log("Validated login data:", {
      email: formData.email,
      password: formData.password,
      rememberMe,
    });
  };

  return (
    <div className="min-h-screen bg-[#EAF1FB] px-3 py-3 sm:px-5 lg:flex lg:items-center lg:justify-center lg:py-4">

      <div className="mx-auto grid w-full max-w-5xl overflow-hidden rounded-2xl border border-blue-100 bg-[#F4F8FF] shadow-lg lg:grid-cols-2">

        {/* Left: Branding panel */}
        <div className="relative hidden flex-col justify-between overflow-hidden bg-[#0F2347] p-7 text-white lg:flex xl:p-8">

          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />

          <Link to="/" className="relative flex items-center gap-3">
            <div className="rounded-xl bg-gradient-to-br from-blue-500 to-emerald-500 p-2.5">
              <BriefcaseBusiness size={24} />
            </div>

            <span className="text-xl font-bold tracking-tight">
              TaskBridge
            </span>
          </Link>

          <div className="relative my-8">

            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1.5 text-sm text-emerald-300">
              <Code2 size={16} />
              Engineering Talent Marketplace
            </span>

            <h1 className="mt-5 text-3xl font-bold leading-tight xl:text-4xl">
              Welcome
              <span className="block text-emerald-400">
                back to TaskBridge.
              </span>
            </h1>

            <p className="mt-4 max-w-md text-sm leading-6 text-slate-300">
              Continue building your skills, solving real-world challenges,
              and discovering opportunities that matter.
            </p>

            <div className="mt-7 space-y-3">
              {[
                "Pick up where you left off",
                "Explore new engineering challenges",
                "Connect with real opportunities",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle2
                    size={18}
                    className="shrink-0 text-emerald-400"
                  />
                  <span className="text-sm text-slate-200">{item}</span>
                </div>
              ))}
            </div>

          </div>

          <p className="relative text-xs text-slate-400">
            Build with purpose. Grow through experience.
          </p>
        </div>

        {/* Right: Login form */}
        <div className="p-5 sm:p-7 lg:p-10">

          {/* Mobile logo */}
          <div className="mb-6 lg:hidden">
            <Link to="/" className="flex items-center gap-2">
              <div className="rounded-lg bg-gradient-to-br from-blue-500 to-emerald-500 p-2 text-white">
                <BriefcaseBusiness size={20} />
              </div>

              <span className="text-lg font-bold text-heading">
                TaskBridge
              </span>
            </Link>
          </div>

          {/* Heading */}
          <div className="mb-7">
            <p className="text-xs font-semibold tracking-wider text-brand">
              WELCOME BACK
            </p>

            <h2 className="mt-1.5 text-2xl font-bold tracking-tight text-heading">
              Log in to your account
            </h2>

            <p className="mt-2 text-sm text-muted">
              Enter your credentials to continue.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block text-sm font-medium text-heading"
              >
                Email address
              </label>

              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted"
                />

                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  autoComplete="email"
                  className="w-full rounded-lg border border-blue-100 bg-white/70 py-3 pl-11 pr-4 text-sm text-heading outline-none transition focus:border-brand focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {errors.email && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-1.5 block text-sm font-medium text-heading"
              >
                Password
              </label>

              <div className="relative">
                <LockKeyhole
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted"
                />

                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  autoComplete="current-password"
                  className="w-full rounded-lg border border-blue-100 bg-white/70 py-3 pl-11 pr-12 text-sm text-heading outline-none transition focus:border-brand focus:ring-2 focus:ring-blue-100"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted hover:text-heading"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {errors.password && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.password}
                </p>
              )}
            </div>

            {/* Remember me and forgot password */}
            <div className="flex items-center justify-between gap-3">

              <label className="flex cursor-pointer items-center gap-2 text-sm text-body">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 rounded border-border accent-blue-600"
                />
                Remember me
              </label>

              <button
                type="button"
                onClick={() =>
                  alert("Forgot password functionality will be implemented later.")
                }
                className="text-sm font-medium text-brand transition hover:text-brand-hover"
              >
                Forgot password?
              </button>

            </div>

            {/* Success message */}
            {successMessage && (
              <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                {successMessage}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-brand px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-hover focus:outline-none focus:ring-2 focus:ring-blue-100"
            >
              Log in
              <ArrowRight size={18} />
            </button>

          </form>

          {/* Register link */}
          <p className="mt-7 text-center text-sm text-muted">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-semibold text-brand hover:text-brand-hover"
            >
              Create an account
            </Link>
          </p>

          <p className="mt-4 text-center text-xs leading-5 text-muted">
            By continuing, you agree to use TaskBridge responsibly
            and professionally.
          </p>

        </div>
      </div>
    </div>
  );
}

export default Login;
