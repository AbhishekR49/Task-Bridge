
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Clock3,
  Code2,
  RefreshCw,
} from "lucide-react";
import { getTasks } from "../../services/authService";

function FeaturedChallenges() {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchTasks = useCallback(async () => {
    try {
      setIsLoading(true);
      setError("");

      const response = await getTasks({
        page: 1,
        limit: 3,
        status: "open",
      });

      setTasks(response.tasks || []);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to load challenges. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return (
    <section className="bg-[#EFF6FF] py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">

        {/* Section Header */}
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <span className="text-sm font-semibold uppercase tracking-wider text-emerald-600">
              Explore opportunities
            </span>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#172B4D] sm:text-4xl">
              Challenges worth solving
            </h2>

            <p className="mt-4 text-base leading-7 text-slate-600">
              Work on practical engineering problems and demonstrate your
              skills beyond a resume.
            </p>
          </div>

          <Link
            to="/tasks"
            className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-blue-700 transition-colors hover:text-blue-900"
          >
            Browse all challenges
            <ArrowRight size={17} />
          </Link>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-72 animate-pulse rounded-2xl border border-blue-100 bg-white p-6"
              >
                <div className="h-4 w-1/3 rounded bg-slate-200" />
                <div className="mt-8 h-6 w-3/4 rounded bg-slate-200" />
                <div className="mt-4 h-4 w-full rounded bg-slate-100" />
                <div className="mt-3 h-4 w-2/3 rounded bg-slate-100" />
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {!isLoading && error && (
          <div className="mt-12 rounded-2xl border border-red-100 bg-white p-8 text-center">
            <p className="font-medium text-red-600">{error}</p>

            <button
              onClick={fetchTasks}
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-brand px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-hover"
            >
              <RefreshCw size={15} />
              Try again
            </button>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && tasks.length === 0 && (
          <div className="mt-12 rounded-2xl border border-blue-100 bg-white px-6 py-12 text-center">
            <Code2 className="mx-auto text-slate-400" size={32} />

            <h3 className="mt-4 text-lg font-semibold text-[#172B4D]">
              No open challenges yet
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              New opportunities will appear here when posters publish them.
            </p>
          </div>
        )}

        {/* Real Backend Tasks */}
        {!isLoading && !error && tasks.length > 0 && (
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {tasks.map((task) => (
              <article
                key={task._id}
                className="flex flex-col rounded-2xl border border-blue-100 bg-white p-6 transition-all duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-900/5"
              >
                {/* Status */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Engineering challenge
                  </span>

                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                    {task.status}
                  </span>
                </div>

                {/* Title and Description */}
                <h3 className="mt-5 text-lg font-semibold leading-7 text-[#172B4D]">
                  {task.title}
                </h3>

                <p className="mt-3 flex-1 text-sm leading-6 text-slate-600">
                  {task.description}
                </p>

                {/* Reward */}
                <div className="mt-5 rounded-xl bg-blue-50 p-4">
                  <p className="text-xs font-medium text-slate-500">
                    Reward
                  </p>

                  <p className="mt-1 text-xl font-bold text-blue-700">
                    {task.currency === "INR" ? "₹" : ""}
                    {Number(task.paymentAmount).toLocaleString("en-IN")}
                  </p>
                </div>

                {/* Metadata */}
                <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                  <span className="text-xs text-slate-500">
                    Posted by{" "}
                    <span className="font-semibold text-slate-700">
                      {task.posterId?.name || "Poster"}
                    </span>
                  </span>

                  <span className="flex items-center gap-1.5 text-xs text-slate-500">
                    <Clock3 size={14} />
                    {new Date(task.createdAt).toLocaleDateString("en-IN")}
                  </span>
                </div>

                {/* Action */}
                <Link
                  to={`/tasks/${task._id}`}
                  className="mt-5 flex items-center justify-center gap-2 rounded-lg border border-blue-100 px-4 py-3 text-sm font-semibold text-blue-700 transition-all hover:border-blue-600 hover:bg-blue-50"
                >
                  View challenge
                  <ArrowRight size={15} />
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default FeaturedChallenges;
