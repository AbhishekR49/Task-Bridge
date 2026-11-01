
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Code2,
  BriefcaseBusiness,
  Clock3,
  CheckCircle2,
} from "lucide-react";

function Hero() {
  return (
    <section className="overflow-hidden bg-white">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 py-20 sm:px-8 lg:grid-cols-2 lg:gap-16 lg:py-28">

        {/* Left: Content */}
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-soft-blue px-3.5 py-2 text-sm font-medium text-brand">
            <span className="h-2 w-2 rounded-full bg-green" />
            Engineering talent, discovered through work
          </div>

          <h1 className="mt-7 text-4xl font-bold leading-tight tracking-tight text-heading sm:text-5xl lg:text-[56px]">
            Real challenges.
            <br />
            Real skills.
            <br />
            <span className="text-brand">Real opportunities.</span>
          </h1>

          <p className="mt-6 max-w-lg text-base leading-7 text-body sm:text-lg sm:leading-8">
            Solve meaningful engineering problems, showcase what you can build,
            and connect with companies that recognize your skills.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link
              to="/tasks"
              className="inline-flex items-center gap-2 rounded-lg bg-brand px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-brand-hover"
            >
              Explore challenges
              <ArrowRight size={17} />
            </Link>

            <Link
              to="/register"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-white px-6 py-3.5 text-sm font-semibold text-heading transition-colors hover:bg-slate-50"
            >
              Post a challenge
            </Link>
          </div>

          <div className="mt-8 flex items-center gap-2 text-sm text-muted">
            <CheckCircle2 size={16} className="text-green" />
            <span>Show your skills through real-world work</span>
          </div>
        </div>

        {/* Right: Product Preview */}
        <div className="relative mx-auto w-full max-w-xl">
          <div className="absolute -inset-8 rounded-[2rem] bg-soft-blue/70" />

          <div className="relative rounded-2xl border border-border bg-white p-5 shadow-xl shadow-slate-200/60 sm:p-7">

            {/* Preview Header */}
            <div className="flex items-center justify-between border-b border-border pb-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-brand">
                  <BriefcaseBusiness size={20} />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-heading">
                    Engineering challenges
                  </h3>
                  <p className="mt-0.5 text-xs text-muted">
                    Explore opportunities
                  </p>
                </div>
              </div>

              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-green">
                Open
              </span>
            </div>

            {/* Challenge Card 1 */}
            <div className="mt-5 rounded-xl border border-border p-4 sm:p-5">
              <div className="flex items-center gap-2 text-xs text-muted">
                <Code2 size={14} />
                Full Stack Development
              </div>

              <h4 className="mt-3 text-base font-semibold text-heading">
                Build a project collaboration platform
              </h4>

              <p className="mt-2 text-sm leading-6 text-body">
                Create a workspace where teams can manage projects, tasks,
                and collaborate efficiently.
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {["React", "Node.js", "MongoDB"].map((tech) => (
                  <span
                    key={tech}
                    className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
                <span className="flex items-center gap-1.5 text-xs text-muted">
                  <Clock3 size={14} />
                  Deadline provided by poster
                </span>
                <span className="text-xs font-semibold text-brand">
                  View challenge →
                </span>
              </div>
            </div>

            {/* Challenge Card 2 */}
            <div className="mt-4 rounded-xl border border-border bg-slate-50/70 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-medium text-green">
                    Frontend Development
                  </span>
                  <h4 className="mt-1.5 text-sm font-semibold text-heading">
                    Design a responsive analytics dashboard
                  </h4>
                </div>

                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-green">
                  <Code2 size={17} />
                </div>
              </div>
            </div>

            {/* Preview Footer */}
            <div className="mt-5 flex items-center gap-2 border-t border-border pt-4 text-xs text-muted">
              <CheckCircle2 size={15} className="text-green" />
              <span>Discover. Build. Get recognized.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
