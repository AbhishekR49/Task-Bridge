
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
    <section className="bg-page py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">

        {/* Section Header */}
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <span className="text-sm font-semibold uppercase tracking-wider text-green">
              Explore opportunities
            </span>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-heading sm:text-4xl">
              Challenges worth solving
            </h2>

            <p className="mt-4 text-base leading-7 text-body">
              Work on practical engineering problems and demonstrate your
              skills beyond a resume.
            </p>
          </div>

          <Link
            to="/tasks"
            className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-brand transition-colors hover:text-brand-hover"
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
                ? "bg-emerald-50 text-green"
                : "bg-blue-50 text-brand";

            return (
              <article
                key={challenge.id}
                className="flex flex-col rounded-2xl border border-border bg-white p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-200/50"
              >
                {/* Category */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-muted">
                    {challenge.category}
                  </span>

                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-xl ${iconStyle}`}
                  >
                    <Icon size={20} />
                  </div>
                </div>

                {/* Title and Description */}
                <h3 className="mt-5 text-lg font-semibold leading-7 text-heading">
                  {challenge.title}
                </h3>

                <p className="mt-3 flex-1 text-sm leading-6 text-body">
                  {challenge.description}
                </p>

                {/* Tech Stack */}
                <div className="mt-5 flex flex-wrap gap-2">
                  {challenge.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md bg-slate-100 px-2.5 py-1.5 text-xs font-medium text-slate-600"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Metadata */}
                <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      challenge.difficulty === "Advanced"
                        ? "bg-amber-50 text-amber-700"
                        : "bg-emerald-50 text-emerald-700"
                    }`}
                  >
                    {challenge.difficulty}
                  </span>

                  <span className="flex items-center gap-1.5 text-xs text-muted">
                    <Clock3 size={14} />
                    {challenge.deadline}
                  </span>
                </div>

                {/* Action */}
                <Link
                  to={`/tasks/${challenge.id}`}
                  className="mt-5 flex items-center justify-center gap-2 rounded-lg border border-border px-4 py-3 text-sm font-semibold text-heading transition-colors hover:border-brand hover:bg-soft-blue hover:text-brand"
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
