import { Building2 } from "lucide-react";
import { useTranslation } from "react-i18next";

export const LandingFooter = () => {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200/70 bg-slate-50">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row sm:px-6">
        <div className="flex items-center gap-2 text-slate-700">
          <Building2 className="size-5 text-blue-950" />
          <span className="font-medium">{t("landing.footer.brand")}</span>
        </div>
        <p className="text-sm text-muted-foreground">
          {t("landing.footer.copyright", { year })}
        </p>
      </div>
    </footer>
  );
};
