
import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  BriefcaseBusiness,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  CircleDollarSign,
  Code2,
  Layers3,
  RefreshCw,
  Search,
  Sparkles,
} from "lucide-react";

import { getTasks } from "../services/authService";

const FILTERS = [
  { label: "Open challenges", value: "open" },
  { label: "In progress", value: "in_progress" },
  { label: "Completed", value: "completed" },
  { label: "All challenges", value: "all" },
];

const formatAmount = (amount, currency) => {
  const formatted = Number(amount).toLocaleString("en-IN");

  return currency === "INR"
    ? `₹${formatted}`
    : `${currency} ${formatted}`;
};

const formatDate = (date) => {
  if (!date) return "Recently posted";

  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const statusStyles = {
  open: "bg-emerald-50 text-emerald-700 border-emerald-100",
  in_progress: "bg-blue-50 text-blue-700 border-blue-100",
  completed: "bg-violet-50 text-violet-700 border-violet-100",
  closed: "bg-slate-100 text-slate-600 border-slate-200",
};

const formatStatus = (status) =>
  status?.replace("_", " ") || "Unknown";

function ExploreTasks() {
  const [tasks, setTasks] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 6,
    total: 0,
    totalPages: 1,
  });

  const [activeFilter, setActiveFilter] = useState("open");
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchTasks = useCallback(async () => {
    try {
      setIsLoading(true);
      setError("");

      const params = {
        page: pagination.page,
        limit: pagination.limit,
      };

      if (activeFilter !== "all") {
        params.status = activeFilter;
      }

      const response = await getTasks(params);

      setTasks(response.tasks || []);

      if (response.pagination) {
        setPagination((previous) => ({
          ...previous,
          ...response.pagination,
        }));
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "We couldn't load the challenges. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  }, [activeFilter, pagination.page, pagination.limit]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const filteredTasks = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    if (!query) return tasks;

    return tasks.filter((task) => {
      const title = task.title?.toLowerCase() || "";
      const description = task.description?.toLowerCase() || "";
      const poster = task.posterId?.name?.toLowerCase() || "";

      return (
        title.includes(query) ||
        description.includes(query) ||
        poster.includes(query)
      );
    });
  }, [tasks, searchTerm]);

  const handleFilterChange = (value) => {
    setActiveFilter(value);
    setPagination((previous) => ({ ...previous, page: 1 }));
    setSearchTerm("");
  };

  const changePage = (nextPage) => {
    if (
      nextPage < 1 ||
      nextPage > pagination.totalPages ||
      nextPage === pagination.page
    ) {
      return;
    }

    setPagination((previous) => ({
      ...previous,
      page: nextPage,
    }));

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="min-h-screen bg-[#F4F7FC]">

      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-[#102443]">
        <div className="pointer-events-none absolute -right-24 -top-32 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-48 left-1/3 h-96 w-96 rounded-full bg-emerald-400/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 pb-24 pt-16 sm:px-8 sm:pb-28 sm:pt-20">
          <div className="grid items-center gap-12 lg:grid-cols-[1.2fr_0.8fr]">

            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-300/10 px-4 py-2 text-sm font-medium text-emerald-300">
                <Sparkles size={15} />
                The opportunity starts here
              </div>

              <h1 className="mt-7 max-w-2xl text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
                Don't just learn.
                <span className="block text-emerald-300">
                  Build something real.
                </span>
              </h1>

              <p className="mt-6 max-w-xl text-base leading-8 text-slate-300 sm:text-lg">
                Discover real engineering challenges, solve meaningful
                problems, and show companies what you can actually build.
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-4">
                <a
                  href="#challenge-list"
                  className="inline-flex items-center gap-2 rounded-xl bg-emerald-400 px-6 py-3.5 text-sm font-bold text-[#102443] transition hover:bg-emerald-300"
                >
                  Explore challenges
                  <ArrowRight size={17} />
                </a>

                <span className="text-sm text-slate-400">
                  Real tasks. Real skills. Real opportunities.
                </span>
              </div>
            </div>

            {/* Decorative opportunity panel */}
            <div className="hidden lg:block">
              <div className="relative mx-auto max-w-sm rotate-2 rounded-3xl border border-white/10 bg-white/[0.07] p-5 shadow-2xl backdrop-blur-sm">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                    Your next opportunity
                  </span>
                  <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-semibold text-emerald-300">
                    Open
                  </span>
                </div>

                <div className="mt-7 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-400/15 text-blue-300">
                  <Code2 size={28} />
                </div>

                <h3 className="mt-5 text-xl font-bold text-white">
                  Prove your skills through real work.
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-400">
                  Every challenge is a chance to build, contribute and
                  stand out.
                </p>

                <div className="mt-7 flex items-center justify-between border-t border-white/10 pt-5">
                  <div className="flex -space-x-2">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#172D4E] bg-blue-400 text-xs font-bold text-[#102443]">
                      R
                    </span>
                    <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#172D4E] bg-emerald-300 text-xs font-bold text-[#102443]">
                      A
                    </span>
                    <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#172D4E] bg-violet-300 text-xs font-bold text-[#102443]">
                      S
                    </span>
                  </div>

                  <span className="text-xs text-slate-400">
                    Built for doers
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom transition */}
        <div className="absolute bottom-0 left-0 h-8 w-full rounded-t-[50%] bg-[#F4F7FC]" />
      </section>

      {/* Challenge listing */}
      <section
        id="challenge-list"
        className="mx-auto max-w-7xl px-5 pb-24 pt-10 sm:px-8"
      >

        {/* Section heading */}
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-emerald-700">
              Find your next challenge
            </p>

            <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#172B4D] sm:text-4xl">
              Explore opportunities
            </h2>

            <p className="mt-3 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
              Browse challenges posted by companies and independent
              project creators.
            </p>
          </div>

          <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
            <Layers3 size={17} />
            {pagination.total} challenges found
          </div>
        </div>

        {/* Filters and search */}
        <div className="mt-9 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm sm:p-5">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

            <div className="flex flex-wrap gap-2">
              {FILTERS.map((filter) => {
                const isActive = activeFilter === filter.value;

                return (
                  <button
                    key={filter.value}
                    onClick={() => handleFilterChange(filter.value)}
                    className={`rounded-full px-4 py-2.5 text-sm font-semibold transition ${
                      isActive
                        ? "bg-[#102443] text-white shadow-md shadow-blue-950/10"
                        : "bg-slate-100 text-slate-600 hover:bg-blue-50 hover:text-blue-700"
                    }`}
                  >
                    {filter.label}
                  </button>
                );
              })}
            </div>

            <div className="relative w-full lg:max-w-sm">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="search"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search these results..."
                className="w-full rounded-xl border border-slate-200 bg-[#F8FAFD] py-3 pl-11 pr-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-50"
              />
            </div>
          </div>

          <p className="mt-3 text-xs text-slate-400">
            Search filters the challenges on the current page.
          </p>
        </div>

        {/* Results */}
        <div className="mt-9">
          {isLoading ? (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div
                  key={item}
                  className="h-80 animate-pulse rounded-2xl border border-slate-200 bg-white p-6"
                >
                  <div className="h-5 w-1/3 rounded bg-slate-200" />
                  <div className="mt-8 h-6 w-3/4 rounded bg-slate-200" />
                  <div className="mt-4 h-4 w-full rounded bg-slate-100" />
                  <div className="mt-2 h-4 w-5/6 rounded bg-slate-100" />
                  <div className="mt-10 h-12 rounded-xl bg-slate-100" />
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="rounded-3xl border border-red-100 bg-white px-6 py-16 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-500">
                <RefreshCw size={24} />
              </div>

              <h3 className="mt-5 text-xl font-bold text-[#172B4D]">
                Something went wrong
              </h3>

              <p className="mt-2 text-sm text-slate-500">{error}</p>

              <button
                onClick={fetchTasks}
                className="mt-6 rounded-xl bg-[#102443] px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-900"
              >
                Try again
              </button>
            </div>
          ) : filteredTasks.length === 0 ? (
            <div className="rounded-3xl border border-slate-200 bg-white px-6 py-16 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                <BriefcaseBusiness size={27} />
              </div>

              <h3 className="mt-5 text-xl font-bold text-[#172B4D]">
                {searchTerm
                  ? "No matching challenges"
                  : "No challenges here yet"}
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                {searchTerm
                  ? "Try another keyword or clear your search."
                  : "There aren't any challenges in this category right now. Check another category."}
              </p>

              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="mt-5 text-sm font-semibold text-blue-700 hover:text-blue-900"
                >
                  Clear search
                </button>
              )}
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {filteredTasks.map((task, index) => (
                <article
                  key={task._id}
                  className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-950/5"
                >
                  {/* Colored top strip */}
                  <div
                    className={`h-1.5 ${
                      index % 3 === 0
                        ? "bg-blue-500"
                        : index % 3 === 1
                          ? "bg-emerald-400"
                          : "bg-violet-400"
                    }`}
                  />

                  <div className="flex flex-1 flex-col p-6">

                    {/* Card top */}
                    <div className="flex items-center justify-between">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-700 transition group-hover:bg-blue-100">
                        <Code2 size={21} />
                      </div>

                      <span
                        className={`rounded-full border px-3 py-1.5 text-xs font-semibold capitalize ${
                          statusStyles[task.status] ||
                          "border-slate-200 bg-slate-50 text-slate-600"
                        }`}
                      >
                        {formatStatus(task.status)}
                      </span>
                    </div>

                    {/* Content */}
                    <h3 className="mt-6 text-xl font-bold leading-7 text-[#172B4D] transition group-hover:text-blue-700">
                      {task.title}
                    </h3>

                    <p className="mt-3 line-clamp-3 flex-1 text-sm leading-7 text-slate-500">
                      {task.description}
                    </p>

                    {/* Reward panel */}
                    <div className="mt-6 flex items-center justify-between rounded-xl bg-[#F1F6FF] px-4 py-4">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                          Challenge reward
                        </p>

                        <p className="mt-1 text-2xl font-extrabold tracking-tight text-[#174B9B]">
                          {formatAmount(
                            task.paymentAmount,
                            task.currency
                          )}
                        </p>
                      </div>

                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-emerald-600 shadow-sm">
                        <CircleDollarSign size={21} />
                      </div>
                    </div>

                    {/* Poster and date */}
                    <div className="mt-5 flex items-center justify-between gap-3 border-t border-slate-100 pt-5">
                      <div className="min-w-0">
                        <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                          Posted by
                        </p>

                        <p className="mt-1 truncate text-sm font-semibold text-slate-700">
                          {task.posterId?.name || "Task poster"}
                        </p>
                      </div>

                      <div className="shrink-0 text-right">
                        <p className="flex items-center justify-end gap-1 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                          <CalendarDays size={12} />
                          Posted
                        </p>

                        <p className="mt-1 text-xs font-medium text-slate-600">
                          {formatDate(task.createdAt)}
                        </p>
                      </div>
                    </div>

                    {/* CTA */}
                    <Link
                      to={`/tasks/${task._id}`}
                      className="mt-6 flex items-center justify-between rounded-xl border border-slate-200 px-4 py-3.5 text-sm font-bold text-[#174B9B] transition group-hover:border-[#174B9B] group-hover:bg-[#102443] group-hover:text-white"
                    >
                      View challenge
                      <ArrowUpRight size={18} />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>

        {/* Pagination */}
        {!isLoading &&
          !error &&
          pagination.totalPages > 1 && (
            <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-200 pt-7 sm:flex-row">
              <p className="text-sm text-slate-500">
                Page{" "}
                <span className="font-bold text-slate-800">
                  {pagination.page}
                </span>{" "}
                of{" "}
                <span className="font-bold text-slate-800">
                  {pagination.totalPages}
                </span>
              </p>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => changePage(pagination.page - 1)}
                  disabled={pagination.page === 1}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-40"
                  aria-label="Previous page"
                >
                  <ChevronLeft size={19} />
                </button>

                <span className="flex h-10 min-w-10 items-center justify-center rounded-xl bg-[#102443] px-3 text-sm font-bold text-white">
                  {pagination.page}
                </span>

                <button
                  onClick={() => changePage(pagination.page + 1)}
                  disabled={
                    pagination.page >= pagination.totalPages
                  }
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-40"
                  aria-label="Next page"
                >
                  <ChevronRight size={19} />
                </button>
              </div>
            </div>
          )}
      </section>
    </main>
  );
}

export default ExploreTasks;
