import { Eye, FileText } from "lucide-react";
import { useTranslation } from "react-i18next";

const summaryCards = [
  { labelKey: "landing.preview.summary.totalRent", value: "5.300 €", accent: "text-blue-950" },
  { labelKey: "landing.preview.summary.totalMortgage", value: "2.950 €", accent: "text-blue-950" },
  { labelKey: "landing.preview.summary.netIncome", value: "2.350 €", accent: "text-emerald-600" },
] as const;

const managers = [
  {
    name: "Jesús Moreno",
    company: "Finques Diagonal",
    email: "jesus@finquesdiagonal.com",
    phone: "676 767 676",
  },
  {
    name: "Anna Puig",
    company: "Gestió Barna SL",
    email: "anna@gestiobarna.com",
    phone: "654 321 098",
  },
] as const;

const tenants = [
  {
    name: "Marc Soler",
    property: "Passeig de Gràcia",
    email: "marc.soler@gmail.com",
    phone: "656 565 656",
  },
  {
    name: "Laia Ferrer",
    property: "Carrer de Balmes",
    email: "laia.ferrer@gmail.com",
    phone: "611 223 344",
  },
] as const;

const SectionCard = ({
  title,
  action,
  children,
}: {
  title: string;
  action: string;
  children: React.ReactNode;
}) => (
  <div className="rounded-lg bg-white p-3 ring-1 ring-slate-200/70">
    <div className="mb-2 flex items-center justify-between">
      <span className="text-xs font-semibold text-slate-900">{title}</span>
      <span className="rounded-md bg-blue-950 px-2 py-1 text-[9px] font-medium text-white">
        {action}
      </span>
    </div>
    {children}
  </div>
);

export const DashboardPreview = () => {
  const { t } = useTranslation();

  const properties = [
    {
      name: "Passeig de Gràcia",
      tenant: "Marc Soler",
      manager: "Finques Diagonal",
      rent: "2.100€",
      mortgage: "1.200€",
    },
    {
      name: "Carrer de Balmes",
      tenant: "Laia Ferrer",
      manager: "Gestió Barna SL",
      rent: "1.450€",
      mortgage: "800€",
    },
    {
      name: "Avinguda Diagonal",
      tenant: "Pol Ramos",
      manager: t("common.notAssigned"),
      rent: "1.750€",
      mortgage: "950€",
    },
  ] as const;

  return (
    <div className="w-full rounded-2xl bg-slate-100 p-3 shadow-2xl shadow-blue-950/10 ring-1 ring-slate-200/80">
      <div className="flex flex-col gap-3">
        <SectionCard
          title={t("landing.preview.properties.title")}
          action={t("landing.preview.properties.action")}
        >
          <div className="overflow-hidden rounded-md ring-1 ring-slate-200/70">
            <div className="grid grid-cols-[1.3fr_1fr_1fr_1fr_0.7fr] gap-2 bg-slate-50 px-2.5 py-1.5 text-[8px] font-semibold tracking-wide text-muted-foreground uppercase">
              <span className="min-w-0 truncate">{t("landing.preview.properties.columns.property")}</span>
              <span className="min-w-0 truncate">{t("landing.preview.properties.columns.tenant")}</span>
              <span className="min-w-0 truncate text-center">{t("landing.preview.properties.columns.rent")}</span>
              <span className="min-w-0 truncate text-center">{t("landing.preview.properties.columns.mortgage")}</span>
              <span className="text-right">{t("landing.preview.properties.columns.docs")}</span>
            </div>
            {properties.map((property, index) => (
              <div
                key={property.name}
                className={`grid grid-cols-[1.3fr_1fr_1fr_1fr_0.7fr] items-center gap-2 px-2.5 py-1.5 text-[9px] ${
                  index < properties.length - 1 ? "border-b border-slate-100" : ""
                }`}
              >
                <span className="min-w-0 truncate font-medium text-slate-800">
                  {property.name}
                </span>
                <span className="min-w-0 truncate text-slate-600">
                  {property.tenant}
                </span>
                <span className="min-w-0 truncate text-center text-slate-700">
                  {property.rent}
                </span>
                <span className="min-w-0 truncate text-center text-slate-700">
                  {property.mortgage}
                </span>
                <span className="flex items-center justify-end gap-1 text-blue-950/70">
                  <Eye className="size-3" />
                  <FileText className="size-3" />
                </span>
              </div>
            ))}
          </div>
        </SectionCard>

        <div className="grid grid-cols-3 gap-3">
          {summaryCards.map((card) => (
            <div
              key={card.labelKey}
              className="rounded-lg bg-white p-2.5 ring-1 ring-slate-200/70"
            >
              <p className="truncate text-[9px] font-medium text-muted-foreground">
                {t(card.labelKey)}
              </p>
              <p className={`mt-1 text-sm font-semibold ${card.accent}`}>
                {card.value}
              </p>
            </div>
          ))}
        </div>

        <SectionCard
          title={t("landing.preview.managers.title")}
          action={t("landing.preview.managers.action")}
        >
          <div className="overflow-hidden rounded-md ring-1 ring-slate-200/70">
            <div className="grid grid-cols-[1fr_1fr_1.4fr_0.9fr] gap-2 bg-slate-50 px-2.5 py-1.5 text-[8px] font-semibold tracking-wide text-muted-foreground uppercase">
              <span className="min-w-0 truncate">{t("landing.preview.managers.columns.name")}</span>
              <span className="min-w-0 truncate">{t("landing.preview.managers.columns.company")}</span>
              <span className="min-w-0 truncate">{t("landing.preview.managers.columns.email")}</span>
              <span className="text-right">{t("landing.preview.managers.columns.phone")}</span>
            </div>
            {managers.map((manager, index) => (
              <div
                key={manager.name}
                className={`grid grid-cols-[1fr_1fr_1.4fr_0.9fr] items-center gap-2 px-2.5 py-1.5 text-[9px] ${
                  index < managers.length - 1 ? "border-b border-slate-100" : ""
                }`}
              >
                <span className="min-w-0 truncate font-medium text-slate-800">
                  {manager.name}
                </span>
                <span className="min-w-0 truncate text-slate-600">
                  {manager.company}
                </span>
                <span className="min-w-0 truncate text-slate-600">
                  {manager.email}
                </span>
                <span className="text-right text-slate-700">
                  {manager.phone}
                </span>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard
          title={t("landing.preview.tenants.title")}
          action={t("landing.preview.tenants.action")}
        >
          <div className="overflow-hidden rounded-md ring-1 ring-slate-200/70">
            <div className="grid grid-cols-[1fr_1fr_1.4fr_0.9fr] gap-2 bg-slate-50 px-2.5 py-1.5 text-[8px] font-semibold tracking-wide text-muted-foreground uppercase">
              <span className="min-w-0 truncate">{t("landing.preview.tenants.columns.name")}</span>
              <span className="min-w-0 truncate">{t("landing.preview.tenants.columns.property")}</span>
              <span className="min-w-0 truncate">{t("landing.preview.tenants.columns.email")}</span>
              <span className="text-right">{t("landing.preview.tenants.columns.phone")}</span>
            </div>
            {tenants.map((tenant, index) => (
              <div
                key={tenant.name}
                className={`grid grid-cols-[1fr_1fr_1.4fr_0.9fr] items-center gap-2 px-2.5 py-1.5 text-[9px] ${
                  index < tenants.length - 1 ? "border-b border-slate-100" : ""
                }`}
              >
                <span className="min-w-0 truncate font-medium text-slate-800">
                  {tenant.name}
                </span>
                <span className="min-w-0 truncate text-slate-600">
                  {tenant.property}
                </span>
                <span className="min-w-0 truncate text-slate-600">
                  {tenant.email}
                </span>
                <span className="text-right text-slate-700">{tenant.phone}</span>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </div>
  );
};
