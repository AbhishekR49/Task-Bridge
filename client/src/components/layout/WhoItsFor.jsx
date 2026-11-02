
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Code2,
  Building2,
  CheckCircle2,
} from "lucide-react";

function WhoItsFor() {
  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">

        {/* Section heading */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-emerald-600">
            Built for both sides
          </span>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#172B4D] sm:text-4xl">
            One platform. Two possibilities.
          </h2>

          <p className="mt-4 text-base leading-7 text-slate-600">
            Whether you're looking to prove your skills or discover
            exceptional talent, TaskBridge brings you together.
          </p>
        </div>

        {/* Two panels */}
        <div className="mt-12 grid gap-6 md:grid-cols-2">

          {/* Developers */}
          <div className="rounded-2xl border border-blue-100 bg-[#EFF6FF] p-8 sm:p-10 transition-all duration-200 hover:shadow-lg hover:shadow-blue-900/5">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-blue-700 shadow-sm">
              <Code2 size={24} />
            </div>

            <h3 className="mt-6 text-2xl font-bold text-[#172B4D]">
              For developers
            </h3>

            <p className="mt-3 max-w-md text-sm leading-6 text-slate-600">
              Go beyond tutorials. Solve meaningful engineering challenges
              and let your work speak for itself.
            </p>

            <ul className="mt-6 space-y-3">
              {[
                "Work on practical engineering problems",
                "Showcase your technical abilities",
                "Build a portfolio through real work",
                "Get discovered by potential employers",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm text-slate-700"
                >
                  <CheckCircle2
                    size={17}
                    className="mt-0.5 shrink-0 text-emerald-600"
                  />
                  {item}
                </li>
              ))}
            </ul>

            <Link
              to="/tasks"
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-blue-700 transition-colors hover:text-blue-900"
            >
              Explore challenges
              <ArrowRight size={16} />
            </Link>
          </div>

          {/* Companies */}
          <div className="rounded-2xl border border-emerald-100 bg-[#ECFDF5] p-8 sm:p-10 transition-all duration-200 hover:shadow-lg hover:shadow-emerald-900/5">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-emerald-700 shadow-sm">
              <Building2 size={24} />
            </div>

            <h3 className="mt-6 text-2xl font-bold text-[#172B4D]">
              For companies
            </h3>

            <p className="mt-3 max-w-md text-sm leading-6 text-slate-600">
              Discover capable developers by evaluating how they approach
              and solve real engineering problems.
            </p>

            <ul className="mt-6 space-y-3">
              {[
                "Post engineering challenges",
                "Evaluate skills through actual work",
                "Connect with motivated developers",
                "Discover potential future teammates",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm text-slate-700"
                >
                  <CheckCircle2
                    size={17}
                    className="mt-0.5 shrink-0 text-emerald-600"
                  />
                  {item}
                </li>
              ))}
            </ul>

            <Link
              to="/register"
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 transition-colors hover:text-emerald-900"
            >
              Post a challenge
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WhoItsFor;
