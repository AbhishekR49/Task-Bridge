
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Clock3,
  Code2,
  Layers3,
} from "lucide-react";

const challenges = [
  {
    id: 1,
    category: "Full Stack Development",
    title: "Build a project management platform",
    description:
      "Develop a platform where teams can organize projects, track tasks, and collaborate in one place.",
    technologies: ["React", "Node.js", "MongoDB"],
    difficulty: "Intermediate",
    deadline: "Set by poster",
    icon: Layers3,
    accent: "blue",
  },
  {
    id: 2,
    category: "Frontend Development",
    title: "Create a responsive analytics dashboard",
    description:
      "Build an interactive dashboard with reusable components and data visualization.",
    technologies: ["React", "Tailwind CSS", "Chart.js"],
    difficulty: "Intermediate",
    deadline: "Set by poster",
    icon: Code2,
    accent: "green",
  },
  {
    id: 3,
    category: "Backend Development",
    title: "Design a RESTful API for a learning platform",
    description:
      "Implement authentication, course management, and structured API endpoints.",
    technologies: ["Node.js", "Express", "MongoDB"],
    difficulty: "Advanced",
    deadline: "Set by poster",
    icon: Code2,
    accent: "blue",
  },
];

function FeaturedChallenges() {
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

        {/* Challenge Cards */}
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {challenges.map((challenge) => {
            const Icon = challenge.icon;

            const iconStyle =
              challenge.accent === "green"
                ? "bg-emerald-100 text-emerald-700"
                : "bg-blue-100 text-blue-700";

            const difficultyStyle =
              challenge.difficulty === "Advanced"
                ? "bg-amber-50 text-amber-700 ring-1 ring-amber-100"
                : "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100";

            return (
              <article
                key={challenge.id}
                className="flex flex-col rounded-2xl border border-blue-100 bg-white p-6 transition-all duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-900/5"
              >
                {/* Category */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold tracking-wide text-slate-500">
                    {challenge.category}
                  </span>

                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-xl ${iconStyle}`}
                  >
                    <Icon size={20} />
                  </div>
                </div>

                {/* Title and Description */}
                <h3 className="mt-5 text-lg font-semibold leading-7 text-[#172B4D]">
                  {challenge.title}
                </h3>

                <p className="mt-3 flex-1 text-sm leading-6 text-slate-600">
                  {challenge.description}
                </p>

                {/* Tech Stack */}
                <div className="mt-5 flex flex-wrap gap-2">
                  {challenge.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs font-medium text-slate-600"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Metadata */}
                <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${difficultyStyle}`}
                  >
                    {challenge.difficulty}
                  </span>

                  <span className="flex items-center gap-1.5 text-xs text-slate-500">
                    <Clock3 size={14} />
                    {challenge.deadline}
                  </span>
                </div>

                {/* Action */}
                <Link
                  to={`/tasks/${challenge.id}`}
                  className="mt-5 flex items-center justify-center gap-2 rounded-lg border border-blue-100 px-4 py-3 text-sm font-semibold text-blue-700 transition-all hover:border-blue-600 hover:bg-blue-50"
                >
                  View challenge
                  <ArrowRight size={15} />
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default FeaturedChallenges;
