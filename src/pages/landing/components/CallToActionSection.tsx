import { useNavigate } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";

export const CallToActionSection = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-950 to-slate-900 px-6 py-12 text-center shadow-lg sm:px-12 sm:py-16">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_55%)]"
        />
        <div className="relative mx-auto max-w-2xl">
          <h2 className="text-2xl font-semibold text-white sm:text-3xl">
            {t("landing.cta.title")}
          </h2>
          <p className="mt-4 text-base text-blue-100 sm:text-lg">
            {t("landing.cta.subtitle")}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button
              size="lg"
              className="h-11 bg-white px-6 text-blue-950 hover:bg-slate-100"
              onClick={() => navigate({ to: "/signup" })}
            >
              {t("landing.cta.primary")}
              <ArrowRight className="ml-1 size-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-11 border-white/30 bg-transparent px-6 text-white hover:bg-white/10 hover:text-white"
              onClick={() => navigate({ to: "/login" })}
            >
              {t("landing.cta.secondary")}
            </Button>
          </div>
          <p className="mt-4 text-sm text-blue-200/80">
            {t("landing.cta.footnote")}
          </p>
        </div>
      </div>
    </section>
  );
};
