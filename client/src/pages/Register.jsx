
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  UserRound,
  Mail,
  LockKeyhole,
  Eye,
  EyeOff,
  BriefcaseBusiness,
  Code2,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "developer",
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

  if (!formData.name.trim()) {
    newErrors.name = "Full name is required";
  }

  if (!formData.email.trim()) {
    newErrors.email = "Email address is required";
  }

  if (formData.password.length < 8) {
    newErrors.password = "Password must be at least 8 characters";
  }

  if (formData.password !== formData.confirmPassword) {
    newErrors.confirmPassword = "Passwords do not match";
  }

  setErrors(newErrors);

  return Object.keys(newErrors).length === 0;
};

const handleSubmit = (e) => {
  e.preventDefault();

  setSuccessMessage("");

  const isValid = validateForm();

  if (!isValid) {
    return;
  }

  setSuccessMessage("Frontend validation successful!");

  console.log("Validated form data:", {
    name: formData.name,
    email: formData.email,
    password: formData.password,
    role: formData.role,
  });
};

  return (
    <div  className="min-h-screen bg-[#EAF1FB] px-4 py-6 sm:px-6 lg:py-8">
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
              Your skills deserve
              <span className="block text-emerald-400">
                real opportunities.
              </span>
            </h1>

            <p className="mt-4 max-w-md text-sm leading-6 text-slate-300">
              Solve real engineering challenges, build meaningful projects,
              and connect with companies that value what you can do.
            </p>

            <div className="mt-7 space-y-3">
              {[
                "Build a portfolio through real-world work",
                "Demonstrate skills beyond your resume",
                "Connect with companies and opportunities",
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

        {/* Right: Registration form */}
        <div className="p-5 sm:p-7 lg:p-8">

          {/* Mobile logo */}
          <div className="mb-5 lg:hidden">
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
          <div className="mb-6">
            <p className="text-xs font-semibold tracking-wider text-brand">
              GET STARTED
            </p>

            <h2 className="mt-1.5 text-2xl font-bold tracking-tight text-heading">
              Create your account
            </h2>

            <p className="mt-2 text-sm text-muted">
              Join TaskBridge and turn your skills into opportunities.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">

            {/* Full name */}
            <div>
              <label
                htmlFor="name"
                className="mb-1.5 block text-sm font-medium text-heading"
              >
                Full name
              </label>

              <div className="relative">
                <UserRound
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted"
                />

                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  autoComplete="name"
                  className="w-full rounded-lg border border-blue-100 bg-white/70 py-2.5 pl-11 pr-4 text-sm text-heading outline-none transition focus:border-brand focus:ring-2 focus:ring-blue-100"
                />
              </div>
              {errors.name && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.name}
                </p>
               )}
            </div>

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
                  className="w-full rounded-lg border border-blue-100 bg-white/70 py-2.5 pl-11 pr-4 text-sm text-heading outline-none transition focus:border-brand focus:ring-2 focus:ring-blue-100"
                />
              </div> {errors.email && (
                       <p className="mt-1 text-xs text-red-600">
                          {errors.email}
                       </p>
                    )}
            </div>

            {/* Role selection */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-heading">
                I want to join as
              </label>

              <div className="grid grid-cols-2 gap-3">

                <button
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      role: "developer",
                    }))
                  }
                  className={`flex items-center justify-center gap-2 rounded-lg border px-3 py-2.5 text-sm font-medium transition ${
                    formData.role === "developer"
                      ? "border-brand bg-soft-blue text-brand"
                      : "border-blue-100 bg-white/70 text-body hover:border-blue-300"
                  }`}
                >
                  <Code2 size={17} />
                  Developer
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      role: "company",
                    }))
                  }
                  className={`flex items-center justify-center gap-2 rounded-lg border px-3 py-2.5 text-sm font-medium transition ${
                    formData.role === "company"
                      ? "border-green bg-soft-green text-green"
                      : "border-blue-100 bg-white/70 text-body hover:border-emerald-300"
                  }`}
                >
                  <BriefcaseBusiness size={17} />
                  Company
                </button>

              </div>
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
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  minLength={8}
                  autoComplete="new-password"
                  className="w-full rounded-lg border border-blue-100 bg-white/70 py-2.5 pl-11 pr-12 text-sm text-heading outline-none transition focus:border-brand focus:ring-2 focus:ring-blue-100"
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

              <p className="mt-1 text-xs text-muted">
                Minimum 8 characters.
              </p>
              {errors.password && (
                 <p className="mt-1 text-xs text-red-600">
                    {errors.password}
                 </p>
              )}
            </div>

            {/* Confirm password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="mb-1.5 block text-sm font-medium text-heading"
              >
                Confirm password
              </label>

              <div className="relative">
                <LockKeyhole
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted"
                />

                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Re-enter your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  autoComplete="new-password"
                  className="w-full rounded-lg border border-blue-100 bg-white/70 py-2.5 pl-11 pr-12 text-sm text-heading outline-none transition focus:border-brand focus:ring-2 focus:ring-blue-100"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword((prev) => !prev)
                  }
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted hover:text-heading"
                  aria-label={
                    showConfirmPassword
                      ? "Hide confirm password"
                      : "Show confirm password"
                  }
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div> {errors.confirmPassword && (
                   <p className="mt-1 text-xs text-red-600">
                 {errors.confirmPassword}
                   </p>
                )}
            </div>

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
              Create account
              <ArrowRight size={18} />
            </button>

          </form>

          {/* Login link */}
          <p className="mt-5 text-center text-sm text-muted">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-brand hover:text-brand-hover"
            >
              Log in
            </Link>
          </p>

          <p className="mt-3 text-center text-xs leading-5 text-muted">
            By creating an account, you agree to use TaskBridge responsibly
            and professionally.
          </p>

        </div>
      </div>
    </div>
  );
}

export default Register;
