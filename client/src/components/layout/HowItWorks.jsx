
import { Search, Code2, Rocket } from "lucide-react";

const steps = [
  {
    icon: Search,
    number: "01",
    title: "Discover challenges",
    description:
      "Explore real engineering problems shared by companies and project creators.",
    color: "bg-blue-50 text-brand",
  },
  {
    icon: Code2,
    number: "02",
    title: "Show your skills",
    description:
      "Apply to challenges, share your approach, and demonstrate what you can build.",
    color: "bg-emerald-50 text-green",
  },
  {
    icon: Rocket,
    number: "03",
    title: "Unlock opportunities",
    description:
      "Get noticed for your work and connect with people looking for your talent.",
    color: "bg-blue-50 text-brand",
  },
];

function HowItWorks() {
  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">

        {/* Section heading */}
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-green">
            Simple process
          </span>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-heading sm:text-4xl">
            How TaskBridge works
          </h2>

          <p className="mt-4 text-base leading-7 text-body">
            From solving real-world problems to building meaningful connections,
            your next opportunity starts here.
          </p>
        </div>

        {/* Steps */}
        <div className="grid gap-6 md:grid-cols-3">
          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <div
                key={step.number}
                className="rounded-2xl border border-border bg-white p-8 transition-shadow hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl ${step.color}`}
                  >
                    <Icon size={23} />
                  </div>

                  <span className="text-sm font-semibold text-slate-300">
                    {step.number}
                  </span>
                </div>

                <h3 className="mt-6 text-xl font-semibold text-heading">
                  {step.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-body">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
