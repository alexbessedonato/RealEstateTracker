import { useTranslation } from "react-i18next";

const steps = [
  {
    step: "01",
    titleKey: "landing.howItWorks.steps.addProperties.title",
    descriptionKey: "landing.howItWorks.steps.addProperties.description",
  },
  {
    step: "02",
    titleKey: "landing.howItWorks.steps.linkPeople.title",
    descriptionKey: "landing.howItWorks.steps.linkPeople.description",
  },
  {
    step: "03",
    titleKey: "landing.howItWorks.steps.trackFinances.title",
    descriptionKey: "landing.howItWorks.steps.trackFinances.description",
  },
] as const;

export const HowItWorksSection = () => {
  const { t } = useTranslation();

  return (
    <section className="border-y border-slate-200/70 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            {t("landing.howItWorks.title")}
          </h2>
          <p className="mt-4 text-base text-slate-600 sm:text-lg">
            {t("landing.howItWorks.subtitle")}
          </p>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-3">
          {steps.map(({ step, titleKey, descriptionKey }) => (
            <div key={step} className="relative">
              <span className="text-4xl font-semibold text-blue-950/15">
                {step}
              </span>
              <h3 className="mt-2 text-lg font-medium text-slate-900">
                {t(titleKey)}
              </h3>
              <p className="mt-2 text-base leading-relaxed text-slate-600">
                {t(descriptionKey)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
