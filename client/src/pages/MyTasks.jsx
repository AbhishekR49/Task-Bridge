
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Plus,
  BriefcaseBusiness,
  IndianRupee,
  CalendarDays,
  XCircle,
  LoaderCircle,
  RefreshCw,
  Users,
  CheckCircle2,
} from "lucide-react";

import { getMyTasks, closeTask, completeTask } from "../services/authService";

const statusStyles = {
  open: "bg-emerald-50 text-emerald-700",
  in_progress: "bg-amber-50 text-amber-700",
  completed: "bg-blue-50 text-blue-700",
  closed: "bg-slate-100 text-slate-600",
};

const formatStatus = (status) =>
  status.replace("_", " ").replace(/\b\w/g, (char) => char.toUpperCase());

function MyTasks() {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [closingTaskId, setClosingTaskId] = useState(null);
  const [actionError, setActionError] = useState("");
  const [completingTaskId, setCompletingTaskId] = useState(null);

  const fetchTasks = useCallback(async () => {
    try {
      setError("");
      const response = await getMyTasks();
      setTasks(response.tasks || []);
    } catch (error) {
      setError(
        error.response?.data?.message || "Unable to load your tasks."
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleCloseTask = async (taskId) => {
    const confirmed = window.confirm(
      "Are you sure you want to close this task?"
    );

    if (!confirmed) return;

    try {
      setClosingTaskId(taskId);
      setActionError("");

      await closeTask(taskId);

      // Fetch the latest server data after closing
      await fetchTasks();
    } catch (error) {
      setActionError(
        error.response?.data?.message || "Unable to close this task."
      );
    } finally {
      setClosingTaskId(null);
    }
  };

  const handleCompleteTask = async (taskId) => {
  const confirmed = window.confirm(
    "Are you sure the work has been completed and approved? This action will mark the task as completed."
  );

  if (!confirmed) return;

  try {
    setCompletingTaskId(taskId);
    setActionError("");

    await completeTask(taskId);

    await fetchTasks();
  } catch (error) {
    setActionError(
      error.response?.data?.message ||
        "Unable to complete this task."
    );
  } finally {
    setCompletingTaskId(null);
  }
};

  if (isLoading) {
    return (
      <main className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
        <div className="h-8 w-56 animate-pulse rounded bg-slate-200" />
        <div className="mt-8 space-y-4">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="h-36 animate-pulse rounded-2xl bg-slate-200"
            />
          ))}
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto min-h-[calc(100vh-64px)] max-w-7xl px-5 py-10 sm:px-8">
      <Link
        to="/poster/dashboard"
        className="inline-flex items-center gap-2 text-sm font-medium text-body transition hover:text-brand"
      >
        <ArrowLeft size={16} />
        Back to Dashboard
      </Link>

      <div className="mt-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-semibold text-brand">TASK MANAGEMENT</p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-heading">
            My Tasks
          </h1>

          <p className="mt-2 text-body">
            Manage the challenges you've published.
          </p>
        </div>

        <Link
          to="/tasks/create"
          className="inline-flex items-center gap-2 self-start rounded-lg bg-brand px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-hover"
        >
          <Plus size={17} />
          Create New Task
        </Link>
      </div>

      {error && (
        <div className="mt-8 rounded-xl border border-red-200 bg-red-50 p-5">
          <p className="text-sm font-medium text-red-700">{error}</p>

          <button
            onClick={() => {
              setIsLoading(true);
              fetchTasks();
            }}
            className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-red-700"
          >
            <RefreshCw size={14} />
            Try again
          </button>
        </div>
      )}

      {actionError && (
        <div
          role="alert"
          className="mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {actionError}
        </div>
      )}

      {!error && tasks.length === 0 && (
        <section className="mt-10 rounded-2xl border border-border bg-surface px-6 py-14 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-soft-blue">
            <BriefcaseBusiness size={26} className="text-brand" />
          </div>

          <h2 className="mt-4 text-xl font-semibold text-heading">
            No tasks published yet
          </h2>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-body">
            Your published challenges will appear here. Create your first
            task to start receiving applications.
          </p>

          <Link
            to="/tasks/create"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-brand px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-hover"
          >
            <Plus size={16} />
            Create your first task
          </Link>
        </section>
      )}

      {!error && tasks.length > 0 && (
        <section className="mt-10 space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-heading">
              Published Tasks
            </h2>

            <span className="text-sm text-muted">
              {tasks.length} {tasks.length === 1 ? "task" : "tasks"}
            </span>
          </div>

          {tasks.map((task) => (
            <article
              key={task._id}
              className="rounded-2xl border border-border bg-surface p-6 shadow-sm"
            >
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-lg font-semibold text-heading">
                      {task.title}
                    </h3>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        statusStyles[task.status] ||
                        "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {formatStatus(task.status)}
                    </span>
                  </div>

                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-body">
                    {task.description}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted">
                    <span className="inline-flex items-center gap-1.5">
                      <IndianRupee size={15} />
                      {task.paymentAmount} {task.currency}
                    </span>

                    <span className="inline-flex items-center gap-1.5">
                      <CalendarDays size={15} />
                      {new Date(task.createdAt).toLocaleDateString("en-IN")}
                    </span>
                  </div>
                </div>

               <div className="flex shrink-0 flex-wrap items-center gap-2 self-start">
  <Link
    to={`/poster/tasks/${task._id}/applications`}
    className="inline-flex items-center gap-2 rounded-lg border border-brand/20 bg-soft-blue px-4 py-2.5 text-sm font-semibold text-brand transition hover:bg-blue-100"
  >
    <Users size={16} />
    View Applicants
  </Link>

  {task.status === "open" && (
    <button
      onClick={() => handleCloseTask(task._id)}
      disabled={closingTaskId === task._id}
      className="inline-flex items-center justify-center gap-2 rounded-lg border border-red-200 px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {closingTaskId === task._id ? (
        <>
          <LoaderCircle size={16} className="animate-spin" />
          Closing...
        </>
      ) : (
        <>
          <XCircle size={16} />
          Close Task
        </>
      )}
    </button>
  )}

  {task.status === "in_progress" && (
  <button
    onClick={() => handleCompleteTask(task._id)}
    disabled={completingTaskId === task._id}
    className="inline-flex items-center justify-center gap-2 rounded-lg bg-green px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-green-hover disabled:cursor-not-allowed disabled:opacity-60"
  >
    {completingTaskId === task._id ? (
      <>
        <LoaderCircle size={16} className="animate-spin" />
        Completing...
      </>
    ) : (
      <>
        <CheckCircle2 size={16} />
        Mark Completed
      </>
    )}
  </button>
)}
</div>
              </div>
            </article>
          ))}
        </section>
      )}
    </main>
  );
}

export default MyTasks;
