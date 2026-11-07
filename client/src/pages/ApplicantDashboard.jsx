
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  BriefcaseBusiness,
  Clock3,
  CheckCircle2,
  XCircle,
  ArrowRight,
  FileText,
  ExternalLink,
} from "lucide-react";

import { getApplicantDashboard, getMyApplications } from "../services/authService";

const getStatusStyle = (status) => {
  const styles = {
    pending: "bg-amber-50 text-amber-700 border-amber-200",
    accepted: "bg-emerald-50 text-emerald-700 border-emerald-200",
    rejected: "bg-red-50 text-red-700 border-red-200",
  };

  return styles[status] || "bg-slate-50 text-slate-600 border-slate-200";
};

function ApplicantDashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

const [applications, setApplications] = useState([]);
const [isApplicationsLoading, setIsApplicationsLoading] = useState(true);
const [applicationsError, setApplicationsError] = useState("");

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await getApplicantDashboard();
        setDashboard(response.dashboard);
      } catch (error) {
        setError(
          error.response?.data?.message ||
            "Failed to load your dashboard."
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  useEffect(() => {
  const fetchApplications = async () => {
    try {
      const response = await getMyApplications();
      setApplications(response.applications || []);
    } catch (error) {
      setApplicationsError(
        error.response?.data?.message ||
          "Failed to load your applications."
      );
    } finally {
      setIsApplicationsLoading(false);
    }
  };

  fetchApplications();
}, []);

  const stats = dashboard?.application;

  const statCards = [
    {
      label: "Total Applications",
      value: stats?.total ?? 0,
      icon: BriefcaseBusiness,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      label: "Pending",
      value: stats?.pending ?? 0,
      icon: Clock3,
      color: "text-amber-600",
      bg: "bg-amber-50",
    },
    {
      label: "Accepted",
      value: stats?.accepted ?? 0,
      icon: CheckCircle2,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      label: "Rejected",
      value: stats?.rejected ?? 0,
      icon: XCircle,
      color: "text-red-600",
      bg: "bg-red-50",
    },
  ];

  if (isLoading) {
    return (
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
        <div className="h-8 w-64 animate-pulse rounded bg-slate-200" />
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="h-32 animate-pulse rounded-2xl bg-slate-200"
            />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
        <div className="rounded-xl border border-red-200 bg-red-50 p-5">
          <p className="font-medium text-red-700">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <main className="mx-auto min-h-[calc(100vh-64px)] max-w-7xl px-5 py-10 sm:px-8">
      {/* Welcome section */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-medium text-brand">
            APPLICANT DASHBOARD
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-heading">
            Your Dashboard
          </h1>
          <p className="mt-2 text-body">
            Track your applications and discover new opportunities.
          </p>
        </div>

        <Link
          to="/"
          className="inline-flex items-center gap-2 self-start rounded-lg bg-brand px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-hover"
        >
          Explore Tasks
          <ArrowRight size={16} />
        </Link>
      </div>

      {/* Application statistics */}
      <section className="mt-10">
        <h2 className="mb-5 text-lg font-semibold text-heading">
          Application Overview
        </h2>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {statCards.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.label}
                className="rounded-2xl border border-border bg-surface p-6 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-muted">
                    {stat.label}
                  </span>
                  <div className={`rounded-xl p-2.5 ${stat.bg}`}>
                    <Icon size={20} className={stat.color} />
                  </div>
                </div>

                <p className="mt-4 text-3xl font-bold text-heading">
                  {stat.value}
                </p>
              </div>
            );
          })}
        </div>
      </section>

<section className="mt-12">
  <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
    <div>
      <h2 className="text-xl font-semibold text-heading">
        My Applications
      </h2>
      <p className="mt-1 text-sm text-muted">
        Track the progress of your submitted applications.
      </p>
    </div>

    <span className="text-sm font-medium text-muted">
      {applications.length} application(s)
    </span>
  </div>

  {isApplicationsLoading ? (
    <div className="mt-6 grid gap-4">
      {[1, 2].map((item) => (
        <div
          key={item}
          className="h-36 animate-pulse rounded-2xl bg-slate-200"
        />
      ))}
    </div>
  ) : applicationsError ? (
    <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-5">
      <p className="text-sm font-medium text-red-700">
        {applicationsError}
      </p>
    </div>
  ) : applications.length === 0 ? (
    <div className="mt-6 rounded-2xl border border-border bg-surface px-6 py-10 text-center">
      <FileText
        size={28}
        className="mx-auto text-muted"
      />

      <h3 className="mt-3 font-semibold text-heading">
        No applications yet
      </h3>

      <p className="mt-2 text-sm text-body">
        Your submitted applications will appear here.
      </p>

      <Link
        to="/tasks"
        className="mt-5 inline-flex items-center gap-2 rounded-lg bg-brand px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-hover"
      >
        Explore Tasks
        <ArrowRight size={16} />
      </Link>
    </div>
  ) : (
    <div className="mt-6 grid gap-4">
      {applications.map((application) => {
        const task = application.taskId;

        return (
          <article
            key={application._id}
            className="rounded-2xl border border-border bg-surface p-5 shadow-sm transition hover:shadow-md sm:p-6"
          >
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="text-lg font-semibold text-heading">
                    {task?.title || "Task no longer available"}
                  </h3>

                  <span
                    className={`rounded-full border px-3 py-1 text-xs font-semibold capitalize ${getStatusStyle(
                      application.status
                    )}`}
                  >
                    {application.status}
                  </span>
                </div>

                <p className="mt-2 text-sm text-muted">
                  Posted by{" "}
                  {task?.posterId?.name || "Unknown poster"}
                </p>

                <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted">
                  <span className="flex items-center gap-1.5">
                    <Clock3 size={15} />
                    Applied{" "}
                    {new Date(application.createdAt).toLocaleDateString(
                      "en-IN",
                      {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      }
                    )}
                  </span>

                  <span className="flex items-center gap-1.5">
                    <FileText size={15} />
                    {application.resume?.originalName || "Resume submitted"}
                  </span>
                </div>
              </div>

              <div className="shrink-0 sm:text-right">
                <p className="text-xs font-medium uppercase tracking-wide text-muted">
                  Task Reward
                </p>

                <p className="mt-1 text-2xl font-bold text-heading">
                  {task
                    ? new Intl.NumberFormat("en-IN", {
                        style: "currency",
                        currency: task.currency || "INR",
                        maximumFractionDigits: 0,
                      }).format(task.paymentAmount)
                    : "—"}
                </p>
              </div>
            </div>

            {task?._id && (
              <div className="mt-5 border-t border-border pt-4">
                <Link
                  to={`/tasks/${task._id}`}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-brand transition hover:text-brand-hover"
                >
                  View Task
                  <ExternalLink size={15} />
                </Link>
              </div>
            )}
          </article>
        );
      })}
    </div>
  )}
</section>

      {/* Empty state */}
      {stats?.total === 0 && (
        <section className="mt-10 rounded-2xl border border-border bg-surface px-6 py-12 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-soft-blue">
            <BriefcaseBusiness size={26} className="text-brand" />
          </div>

          <h2 className="mt-4 text-xl font-semibold text-heading">
            Your journey starts here
          </h2>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-body">
            You haven't applied to any challenges yet. Explore available
            tasks and find opportunities to showcase your skills.
          </p>

          <Link
            to="/"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-brand px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-hover"
          >
            Find your first task
            <ArrowRight size={16} />
          </Link>
        </section>
      )}
    </main>
  );
}

export default ApplicantDashboard;
