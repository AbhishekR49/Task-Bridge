
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft, IndianRupee, LoaderCircle } from "lucide-react";

import { createTask } from "../services/authService";

const initialFormData = {
  title: "",
  description: "",
  paymentAmount: "",
};

function CreateTask() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const descriptionLength = formData.description.trim().length;

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    const title = formData.title.trim();
    const description = formData.description.trim();
    const paymentAmount = Number(formData.paymentAmount);

    // Frontend validation matching the backend Zod schema
    if (title.length < 5 || title.length > 120) {
      setError("Title must contain between 5 and 120 characters.");
      return;
    }

    if (description.length < 200 || description.length > 5000) {
      setError("Description must contain between 200 and 5000 characters.");
      return;
    }

    if (!formData.paymentAmount || !Number.isFinite(paymentAmount) || paymentAmount <= 0) {
      setError("Please enter a valid positive payment amount.");
      return;
    }

    try {
      setIsSubmitting(true);

      const taskData = {
        title,
        description,
        paymentAmount,
        currency: "INR",
      };

      await createTask(taskData);

      // Return to poster dashboard after successful creation
      navigate("/poster/dashboard");
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Unable to create the task. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-[calc(100vh-64px)] bg-page px-5 py-10 sm:px-8">
      <div className="mx-auto max-w-3xl">
        {/* Back navigation */}
        <Link
          to="/poster/dashboard"
          className="inline-flex items-center gap-2 text-sm font-medium text-body transition hover:text-brand"
        >
          <ArrowLeft size={16} />
          Back to Dashboard
        </Link>

        {/* Header */}
        <div className="mt-8">
          <p className="text-sm font-semibold text-brand">
            CREATE A CHALLENGE
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-heading">
            Post a New Task
          </h1>

          <p className="mt-3 text-body">
            Describe your challenge clearly so the right applicants can find it.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-6 rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-8"
        >
          {/* Title */}
          <div>
            <label
              htmlFor="title"
              className="mb-2 block text-sm font-semibold text-heading"
            >
              Task Title
            </label>

            <input
              id="title"
              name="title"
              type="text"
              value={formData.title}
              onChange={handleChange}
              minLength={5}
              maxLength={120}
              required
              placeholder="e.g. Build a responsive dashboard using React"
              className="w-full rounded-lg border border-border bg-white px-4 py-3 text-sm text-heading outline-none transition placeholder:text-slate-400 focus:border-brand focus:ring-2 focus:ring-brand/10"
            />

            <p className="mt-1.5 text-xs text-muted">
              {formData.title.trim().length}/120 characters (minimum 5)
            </p>
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="mb-2 block text-sm font-semibold text-heading"
            >
              Task Description
            </label>

            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              minLength={200}
              maxLength={5000}
              required
              rows={8}
              placeholder="Explain the problem, expected deliverables, requirements, and how success will be evaluated..."
              className="w-full resize-y rounded-lg border border-border bg-white px-4 py-3 text-sm leading-6 text-heading outline-none transition placeholder:text-slate-400 focus:border-brand focus:ring-2 focus:ring-brand/10"
            />

            <div className="mt-1.5 flex justify-between text-xs">
              <span
                className={
                  descriptionLength < 200
                    ? "text-amber-600"
                    : "text-emerald-600"
                }
              >
                {descriptionLength < 200
                  ? `${200 - descriptionLength} more characters required`
                  : "Minimum length reached"}
              </span>

              <span className="text-muted">
                {descriptionLength}/5000
              </span>
            </div>
          </div>

          {/* Payment */}
          <div>
            <label
              htmlFor="paymentAmount"
              className="mb-2 block text-sm font-semibold text-heading"
            >
              Reward / Payment
            </label>

            <div className="relative">
              <IndianRupee
                size={17}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted"
              />

              <input
                id="paymentAmount"
                name="paymentAmount"
                type="number"
                value={formData.paymentAmount}
                onChange={handleChange}
                min="0.01"
                step="0.01"
                required
                placeholder="500"
                className="w-full rounded-lg border border-border bg-white py-3 pl-10 pr-4 text-sm text-heading outline-none transition placeholder:text-slate-400 focus:border-brand focus:ring-2 focus:ring-brand/10"
              />
            </div>

            <p className="mt-1.5 text-xs text-muted">
              Payment is in Indian Rupees (INR).
            </p>
          </div>

          {/* Error */}
          {error && (
            <div
              role="alert"
              className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
            >
              {error}
            </div>
          )}

          {/* Submit */}
          <div className="border-t border-border pt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-brand px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-brand-hover disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
            >
              {isSubmitting ? (
                <>
                  <LoaderCircle size={17} className="animate-spin" />
                  Creating Task...
                </>
              ) : (
                "Publish Task"
              )}
            </button>

            <p className="mt-3 text-xs text-muted">
              Your task will be published with an open status.
            </p>
          </div>
        </form>
      </div>
    </main>
  );
}

export default CreateTask;
