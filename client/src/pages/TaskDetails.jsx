
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowUpRight,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  CircleDollarSign,
  Clock3,
  Code2,
  FileText,
  LoaderCircle,
  LockKeyhole,
  Send,
  ShieldCheck,
  Upload,
} from "lucide-react";

import { getTaskById, applyToTask } from "../services/authService";
import { useAuth } from "../context/AuthContext";

const formatAmount = (amount, currency) => {
  const value = Number(amount).toLocaleString("en-IN");

  return currency === "INR"
    ? `₹${value}`
    : `${currency} ${value}`;
};

const formatDate = (date) => {
  if (!date) return "Recently posted";

  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

function TaskDetails() {
  const { id } = useParams();
  const { user, isAuthenticated } = useAuth();

  const [task, setTask] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [pageError, setPageError] = useState("");

  const [message, setMessage] = useState("");
  const [resume, setResume] = useState(null);
  const [applicationError, setApplicationError] = useState("");
  const [applicationSuccess, setApplicationSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchTask = async () => {
      try {
        setIsLoading(true);
        setPageError("");

        const response = await getTaskById(id);

        if (isMounted) {
          setTask(response.task);
        }
      } catch (error) {
        if (isMounted) {
          setPageError(
            error.response?.data?.message ||
              "Unable to load this challenge."
          );
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchTask();

    return () => {
      isMounted = false;
    };
  }, [id]);

  const handleApplicationSubmit = async (event) => {
    event.preventDefault();

    setApplicationError("");
    setApplicationSuccess("");

    if (message.trim().length < 20 || message.trim().length > 2000) {
      setApplicationError(
        "Your application message must contain 20–2,000 characters."
      );
      return;
    }

    if (!resume) {
      setApplicationError("Please upload your resume.");
      return;
    }

    try {
      setIsSubmitting(true);

      const response = await applyToTask(id, {
        message: message.trim(),
        resume,
      });

      setApplicationSuccess(
        response.message || "Your application was submitted successfully."
      );

      setMessage("");
      setResume(null);

      const fileInput = document.getElementById("resume-upload");
      if (fileInput) fileInput.value = "";
    } catch (error) {
      setApplicationError(
        error.response?.data?.message ||
          "Application submission failed. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-[#F4F7FC]">
        <div className="text-center">
          <LoaderCircle
            size={34}
            className="mx-auto animate-spin text-blue-600"
          />
          <p className="mt-4 text-sm font-medium text-slate-500">
            Loading challenge details...
          </p>
        </div>
      </div>
    );
  }

  if (pageError || !task) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-[#F4F7FC] px-5">
        <div className="max-w-md rounded-3xl border border-slate-200 bg-white p-9 text-center shadow-sm">
          <Code2 size={35} className="mx-auto text-slate-400" />

          <h2 className="mt-5 text-2xl font-bold text-[#172B4D]">
            Challenge not found
          </h2>

          <p className="mt-3 text-sm leading-6 text-slate-500">
            {pageError || "This challenge may have been removed."}
          </p>

          <Link
            to="/tasks"
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#102443] px-5 py-3 text-sm font-semibold text-white hover:bg-blue-900"
          >
            <ArrowLeft size={16} />
            Back to challenges
          </Link>
        </div>
      </div>
    );
  }

  const isOpen = task.status === "open";
  const isApplicant = user?.role === "applicant";

  return (
    <main className="min-h-screen bg-[#F4F7FC]">

      {/* Header */}
      <section className="relative overflow-hidden bg-[#102443]">
        <div className="pointer-events-none absolute -right-20 -top-40 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-40 left-1/3 h-80 w-80 rounded-full bg-emerald-400/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16">
          <Link
            to="/tasks"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-300 transition hover:text-white"
          >
            <ArrowLeft size={16} />
            Back to challenges
          </Link>

          <div className="mt-10 max-w-3xl">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-blue-300/20 bg-blue-300/10 px-3 py-1.5 text-xs font-semibold text-blue-200">
                <Code2 size={14} />
                Engineering challenge
              </span>

              <span
                className={`rounded-full px-3 py-1.5 text-xs font-semibold capitalize ${
                  isOpen
                    ? "bg-emerald-300/15 text-emerald-300"
                    : "bg-white/10 text-slate-300"
                }`}
              >
                {task.status?.replace("_", " ")}
              </span>
            </div>

            <h1 className="mt-6 text-3xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
              {task.title}
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300">
              Review the challenge requirements, understand the reward,
              and submit your application to get started.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-3 text-sm text-slate-400">
              <span className="flex items-center gap-2">
                <BriefcaseBusiness size={16} />
                {task.posterId?.name || "Task poster"}
              </span>

              <span className="flex items-center gap-2">
                <CalendarDays size={16} />
                Posted {formatDate(task.createdAt)}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="mx-auto grid max-w-7xl gap-8 px-5 py-12 sm:px-8 lg:grid-cols-[1fr_370px]">

        {/* Left: Challenge information */}
        <div className="space-y-7">

          {/* Reward */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#174B9B] to-[#102443] p-7 text-white shadow-lg shadow-blue-950/10 sm:p-9">
            <div className="pointer-events-none absolute -right-10 -top-16 h-52 w-52 rounded-full border-[25px] border-white/5" />

            <div className="relative flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-blue-200">
                  Challenge reward
                </p>

                <p className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl">
                  {formatAmount(task.paymentAmount, task.currency)}
                </p>

                <p className="mt-3 text-sm text-blue-200">
                  Reward offered by the task poster
                </p>
              </div>

              <div className="hidden h-16 w-16 items-center justify-center rounded-2xl bg-white/10 sm:flex">
                <CircleDollarSign size={34} className="text-emerald-300" />
              </div>
            </div>
          </div>

          {/* Description */}
          <article className="rounded-3xl border border-slate-200/80 bg-white p-7 shadow-sm sm:p-9">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                <FileText size={21} />
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-blue-700">
                  The challenge
                </p>

                <h2 className="mt-1 text-xl font-bold text-[#172B4D]">
                  What you'll be working on
                </h2>
              </div>
            </div>

            <div className="mt-7 whitespace-pre-wrap text-sm leading-8 text-slate-600 sm:text-base">
              {task.description}
            </div>
          </article>

          {/* Poster information */}
          <article className="rounded-3xl border border-slate-200/80 bg-white p-7 shadow-sm sm:p-9">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                <BriefcaseBusiness size={21} />
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                  Opportunity posted by
                </p>

                <h2 className="mt-1 text-xl font-bold text-[#172B4D]">
                  {task.posterId?.name || "Task poster"}
                </h2>
              </div>
            </div>

            <p className="mt-5 text-sm leading-7 text-slate-500">
              This challenge was published on {formatDate(task.createdAt)}.
              Review the requirements carefully before submitting your
              application.
            </p>
          </article>
        </div>

        {/* Right: Application panel */}
        <aside className="lg:sticky lg:top-8 lg:self-start">
          <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-lg shadow-blue-950/5">

            <div className="bg-[#102443] p-6 text-white">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-300">
                  Take the next step
                </span>

                <ArrowUpRight size={20} className="text-emerald-300" />
              </div>

              <h2 className="mt-4 text-2xl font-bold">
                Ready to take on this challenge?
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-300">
                Introduce yourself and explain why you're a good fit.
              </p>
            </div>

            <div className="p-6">

              {!isOpen ? (
                <div className="rounded-2xl bg-slate-50 p-5 text-center">
                  <LockKeyhole
                    size={25}
                    className="mx-auto text-slate-400"
                  />

                  <h3 className="mt-3 font-bold text-[#172B4D]">
                    Applications unavailable
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    This challenge is no longer accepting applications.
                  </p>
                </div>
              ) : !isAuthenticated ? (
                <div className="text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
                    <LockKeyhole size={25} />
                  </div>

                  <h3 className="mt-4 font-bold text-[#172B4D]">
                    Login to apply
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    Sign in with your applicant account to submit your
                    application.
                  </p>

                  <Link
                    to="/login"
                    className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-[#102443] px-5 py-3.5 text-sm font-bold text-white transition hover:bg-blue-900"
                  >
                    Login to continue
                    <ChevronRight size={17} />
                  </Link>
                </div>
              ) : !isApplicant ? (
                <div className="rounded-2xl bg-amber-50 p-5 text-center">
                  <BriefcaseBusiness
                    size={26}
                    className="mx-auto text-amber-600"
                  />

                  <h3 className="mt-3 font-bold text-[#172B4D]">
                    Applicant accounts only
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    You are signed in as a poster. Switch to an applicant
                    account to apply for challenges.
                  </p>
                </div>
              ) : applicationSuccess ? (
                <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-5 text-center">
                  <CheckCircle2
                    size={34}
                    className="mx-auto text-emerald-600"
                  />

                  <h3 className="mt-3 font-bold text-emerald-800">
                    Application submitted!
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-emerald-700">
                    {applicationSuccess}
                  </p>

                  <Link
                    to="/applicant/dashboard"
                    className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-emerald-800 hover:text-emerald-900"
                  >
                    Go to dashboard
                    <ArrowUpRight size={16} />
                  </Link>
                </div>
              ) : (
                <form
                  onSubmit={handleApplicationSubmit}
                  className="space-y-5"
                >
                  <div>
                    <label
                      htmlFor="application-message"
                      className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                      Why are you a good fit?
                    </label>

                    <textarea
                      id="application-message"
                      value={message}
                      onChange={(event) => setMessage(event.target.value)}
                      rows={5}
                      minLength={20}
                      maxLength={2000}
                      required
                      placeholder="Introduce yourself and explain how you would approach this challenge..."
                      className="w-full resize-y rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-50"
                    />

                    <p className="mt-2 text-right text-xs text-slate-400">
                      {message.length}/2000 characters
                    </p>
                  </div>

                  <div>
                    <label
                      htmlFor="resume-upload"
                      className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                      Upload your resume
                    </label>

                    <label
                      htmlFor="resume-upload"
                      className="flex cursor-pointer flex-col items-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 px-4 py-6 text-center transition hover:border-blue-300 hover:bg-blue-50/50"
                    >
                      <Upload size={25} className="text-blue-600" />

                      <span className="mt-3 text-sm font-semibold text-slate-700">
                        {resume ? resume.name : "Choose your resume"}
                      </span>

                      <span className="mt-1 text-xs text-slate-400">
                        Select a file from your device
                      </span>

                      <input
                        id="resume-upload"
                        type="file"
                        required
                        onChange={(event) =>
                          setResume(event.target.files?.[0] || null)
                        }
                        className="sr-only"
                      />
                    </label>
                  </div>

                  {applicationError && (
                    <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm leading-6 text-red-600">
                      {applicationError}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 py-4 text-sm font-bold text-white shadow-lg shadow-emerald-500/15 transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isSubmitting ? (
                      <>
                        <LoaderCircle size={18} className="animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        Submit application
                        <Send size={17} />
                      </>
                    )}
                  </button>

                  <div className="flex items-start gap-2 text-xs leading-5 text-slate-400">
                    <ShieldCheck
                      size={16}
                      className="mt-0.5 shrink-0 text-emerald-600"
                    />
                    Your application and resume will be shared with the
                    task poster.
                  </div>
                </form>
              )}
            </div>
          </div>

          <div className="mt-5 flex items-start gap-3 rounded-2xl border border-blue-100 bg-blue-50/80 p-4">
            <Clock3 size={18} className="mt-0.5 shrink-0 text-blue-700" />

            <p className="text-xs leading-6 text-blue-900">
              Take time to understand the requirements before applying.
              A thoughtful application is better than a generic one.
            </p>
          </div>
        </aside>
      </section>
    </main>
  );
}

export default TaskDetails;
