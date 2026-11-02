
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Code2,
  BriefcaseBusiness,
  Layers3,
  CheckCircle2,
} from "lucide-react";

function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#0F2347] text-white">
      {/* Subtle background accents */}
      <div className="pointer-events-none absolute -left-40 -top-40 h-96 w-96 rounded-full bg-blue-600/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-48 right-0 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-5 py-20 sm:px-8 lg:grid-cols-2 lg:gap-20 lg:py-28">

        {/* Left: Hero Content */}
        <div>
          <div className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-blue-100">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            Engineering Talent Marketplace
          </div>

          <h1 className="mt-7 text-4xl font-bold leading-[1.15] tracking-tight sm:text-5xl lg:text-[58px]">
            Real challenges.
            <br />
            Real skills.
            <br />
            <span className="text-emerald-400">
              Real opportunities.
            </span>
          </h1>

          <p className="mt-6 max-w-lg text-base leading-7 text-blue-100/80 sm:text-lg sm:leading-8">
            Solve meaningful engineering problems, showcase what you
            can build, and connect with companies that value your skills.
          </p>

          {/* CTA Buttons */}
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link
              to="/tasks"
              className="inline-flex items-center gap-2.5 rounded-lg bg-emerald-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-emerald-950/20 transition-colors hover:bg-emerald-600"
            >
              Explore challenges
              <ArrowRight size={17} />
            </Link>

            <Link
              to="/register"
              className="inline-flex items-center gap-2 rounded-lg border border-white/25 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              Post a challenge
            </Link>
          </div>

          {/* Value proposition strip */}
          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4 text-sm text-blue-100/80">
            <div className="flex items-center gap-2">
              <Code2 size={17} className="text-emerald-400" />
              Solve challenges
            </div>

            <div className="hidden h-5 w-px bg-white/20 sm:block" />

            <div className="flex items-center gap-2">
              <Layers3 size={17} className="text-emerald-400" />
              Build portfolio
            </div>

            <div className="hidden h-5 w-px bg-white/20 sm:block" />

            <div className="flex items-center gap-2">
              <BriefcaseBusiness size={17} className="text-emerald-400" />
              Get discovered
            </div>
          </div>
        </div>

        {/* Right: Product Preview */}
        <div className="relative mx-auto w-full max-w-xl">

          {/* Decorative backdrop */}
          <div className="absolute -inset-4 rotate-[-4deg] rounded-2xl border border-white/10 bg-white/[0.03] sm:-inset-6" />
          <div className="absolute -inset-2 rotate-[3deg] rounded-2xl border border-white/10 bg-white/[0.04]" />

          {/* Preview Window */}
          <div className="relative rounded-2xl border border-slate-200/80 bg-white p-5 text-heading shadow-2xl shadow-black/20 sm:p-7">

            {/* Header */}
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
                    Practical problems. Real opportunities.
                  </p>
                </div>
              </div>

              <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
                Open
              </span>
            </div>

            {/* Challenge 1 */}
            <div className="mt-5 rounded-xl border border-border bg-white p-4 sm:p-5">
              <div className="flex items-center gap-2 text-xs font-medium text-muted">
                <Layers3 size={15} />
                Full Stack Development
              </div>

              <h4 className="mt-3 text-base font-semibold leading-6 text-heading">
                Build a project management platform
              </h4>

              <p className="mt-2 text-sm leading-6 text-body">
                Create a platform where teams can organize projects,
                track tasks, and collaborate efficiently.
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

              <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
                <span className="text-xs text-muted">
                  Technical challenge
                </span>

                <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
                  Intermediate
                </span>
              </div>
            </div>

            {/* Challenge 2 */}
            <div className="mt-4 rounded-xl border border-border bg-slate-50 p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                  <Code2 size={19} />
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-heading">
                    Responsive analytics dashboard
                  </h4>
                  <p className="mt-1 text-xs text-muted">
                    React · Tailwind CSS · Data visualization
                  </p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
              <span className="flex items-center gap-2 text-xs font-medium text-emerald-700">
                <CheckCircle2 size={15} />
                Showcase your skills
              </span>

              <span className="text-xs font-semibold text-brand">
                Explore all →
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
