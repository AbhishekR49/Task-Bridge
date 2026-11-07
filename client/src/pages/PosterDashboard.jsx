
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  BriefcaseBusiness,
  CircleDot,
  Clock3,
  CheckCircle2,
  LockKeyhole,
  Users,
  Plus,
  ArrowRight,
} from "lucide-react";

import { getPosterDashboard } from "../services/authService";

function PosterDashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await getPosterDashboard();
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

  const task = dashboard?.task;

  const statCards = [
    {
      label: "Total Tasks",
      value: task?.total ?? 0,
      icon: BriefcaseBusiness,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      label: "Open",
      value: task?.open ?? 0,
      icon: CircleDot,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      label: "In Progress",
      value: task?.in_progress ?? 0,
      icon: Clock3,
      color: "text-amber-600",
      bg: "bg-amber-50",
    },
    {
      label: "Completed",
      value: task?.completed ?? 0,
      icon: CheckCircle2,
      color: "text-green-600",
      bg: "bg-green-50",
    },
    {
      label: "Closed",
      value: task?.closed ?? 0,
      icon: LockKeyhole,
      color: "text-slate-600",
      bg: "bg-slate-100",
    },
    {
      label: "Applications Received",
      value: dashboard?.totalApplications ?? 0,
      icon: Users,
      color: "text-violet-600",
      bg: "bg-violet-50",
    },
  ];

  if (isLoading) {
    return (
      <main className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
        <div className="h-8 w-64 animate-pulse rounded bg-slate-200" />

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div
              key={item}
              className="h-32 animate-pulse rounded-2xl bg-slate-200"
            />
          ))}
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
        <div className="rounded-xl border border-red-200 bg-red-50 p-5">
          <p className="font-medium text-red-700">{error}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto min-h-[calc(100vh-64px)] max-w-7xl px-5 py-10 sm:px-8">
      {/* Welcome */}
      
<div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
  {/* Dashboard heading */}
  <div>
    <p className="text-sm font-medium text-brand">
      POSTER DASHBOARD
    </p>

    <h1 className="mt-2 text-3xl font-bold tracking-tight text-heading">
      Manage Your Challenges
    </h1>

    <p className="mt-2 text-body">
      Track your tasks and manage incoming applications.
    </p>
  </div>

  {/* Action buttons */}
  <div className="flex flex-wrap items-center gap-3">
    <Link
      to="/my-tasks"
      className="inline-flex items-center justify-center gap-2 rounded-lg border border-border px-4 py-3 text-sm font-semibold text-heading transition hover:bg-slate-200"
    >
      <BriefcaseBusiness size={17} />
      Manage My Tasks
    </Link>

    <Link
      to="/tasks/create"
      className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-hover"
    >
      <Plus size={17} />
      Post a New Task
    </Link>
  </div>
</div>


      {/* Statistics */}
      <section className="mt-10">
        <h2 className="mb-5 text-lg font-semibold text-heading">
          Overview
        </h2>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
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

      {/* Empty state */}
      {task?.total === 0 && (
        <section className="mt-10 rounded-2xl border border-border bg-surface px-6 py-12 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-soft-blue">
            <BriefcaseBusiness size={26} className="text-brand" />
          </div>

          <h2 className="mt-4 text-xl font-semibold text-heading">
            Your first challenge starts here
          </h2>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-body">
            You haven't posted any tasks yet. Create a challenge
            and invite talented applicants to work on it.
          </p>

          <Link
            to="/tasks/create"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-brand px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-hover"
          >
            Create your first task
            <ArrowRight size={16} />
          </Link>
        </section>
      )}
    </main>
  );
}

export default PosterDashboard;
