
import { Link } from "react-router-dom";
import { BriefcaseBusiness,  Code2, ArrowUpRight } from "lucide-react";

function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#0B1930] text-white">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">

        {/* Main Footer */}
        <div className="flex flex-col justify-between gap-10 py-12 sm:flex-row sm:items-start sm:py-16">

          {/* Brand */}
          <div className="max-w-sm">
            <Link to="/" className="inline-flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-emerald-500">
                <BriefcaseBusiness size={19} />
              </div>

              <span className="text-xl font-bold tracking-tight">
                Task<span className="text-emerald-400">Bridge</span>
              </span>
            </Link>

            <p className="mt-4 text-sm leading-6 text-slate-400">
              Connecting engineering talent with real-world challenges.
              Build skills, demonstrate your potential, and discover
              meaningful opportunities.
            </p>
          </div>

          {/* Links */}
          <div className="flex gap-16 sm:gap-20">
            <div>
              <h3 className="text-sm font-semibold text-white">Platform</h3>
              <ul className="mt-4 space-y-3">
                <li>
                  <Link
                    to="/tasks"
                    className="text-sm text-slate-400 transition-colors hover:text-emerald-400"
                  >
                    Explore challenges
                  </Link>
                </li>
                <li>
                  <Link
                    to="/register"
                    className="text-sm text-slate-400 transition-colors hover:text-emerald-400"
                  >
                    Post a challenge
                  </Link>
                </li>
                <li>
                  <Link
                    to="/login"
                    className="text-sm text-slate-400 transition-colors hover:text-emerald-400"
                  >
                    Log in
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-white">Connect</h3>
              <ul className="mt-4 space-y-3">
                <li>
                  <a
                    href="https://github.com/AbhishekR49/Task-Bridge"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-emerald-400"
                  >
                    <Code2 size={16} />
                    GitHub
                    <ArrowUpRight size={13} />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col gap-3 border-t border-white/10 py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} TaskBridge. All rights reserved.
          </p>

          <p className="text-xs text-slate-500">
            Built with purpose. Driven by talent.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
