
import { Link } from "react-router-dom";
import { ArrowRight, Code2, Building2 } from "lucide-react";

function FinalCTA() {
  return (
    <section className="bg-[#0F2347] px-5 py-20 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-5xl text-center">

        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/10 text-emerald-400">
          <Code2 size={26} />
        </div>

        <h2 className="mt-7 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
          Your next opportunity
          <br />
          <span className="text-emerald-400">starts with what you build.</span>
        </h2>

        <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-blue-100/75">
          Whether you're a developer ready to prove your skills or a company
          looking for exceptional talent, there's a place for you on TaskBridge.
        </p>

        <div className="mt-9 flex flex-wrap justify-center gap-4">
          <Link
            to="/register"
            className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-emerald-600"
          >
            Get started
            <ArrowRight size={17} />
          </Link>

          <Link
            to="/tasks"
            className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            Explore challenges
          </Link>
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-6 text-sm text-blue-100/70">
          <span className="flex items-center gap-2">
            <Code2 size={16} className="text-emerald-400" />
            For developers
          </span>
          <span className="flex items-center gap-2">
            <Building2 size={16} className="text-emerald-400" />
            For companies
          </span>
        </div>
      </div>
    </section>
  );
}

export default FinalCTA;
