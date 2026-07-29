import {
  Building2,
  FileText,
  LineChart,
  UserCog,
  Users,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const features = [
  {
    icon: LineChart,
    titleKey: "landing.features.items.financials.title",
    descriptionKey: "landing.features.items.financials.description",
    span: "sm:col-span-2",
    featured: true,
  },
  {
    icon: Building2,
    titleKey: "landing.features.items.properties.title",
    descriptionKey: "landing.features.items.properties.description",
    span: "",
    featured: false,
  },
  {
    icon: FileText,
    titleKey: "landing.features.items.documents.title",
    descriptionKey: "landing.features.items.documents.description",
    span: "",
    featured: false,
  },
  {
    icon: Users,
    titleKey: "landing.features.items.tenants.title",
    descriptionKey: "landing.features.items.tenants.description",
    span: "",
    featured: false,
  },
  {
    icon: UserCog,
    titleKey: "landing.features.items.managers.title",
    descriptionKey: "landing.features.items.managers.description",
    span: "",
    featured: false,
  },
] as const;

export const FeaturesSection = () => {
  const { t } = useTranslation();

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
          {t("landing.features.title")}
        </h2>
        <p className="mt-4 text-base text-slate-600 sm:text-lg">
          {t("landing.features.subtitle")}
        </p>
      </div>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {features.map(({ icon: Icon, titleKey, descriptionKey, span, featured }) => (
          <Card
            key={titleKey}
            className={`border-slate-200/80 shadow-sm transition-shadow hover:shadow-md ${span} ${
              featured
                ? "bg-gradient-to-br from-blue-950 to-slate-900 text-white"
                : "bg-white"
            }`}
          >
            <CardHeader>
              <div
                className={`mb-2 flex size-10 items-center justify-center rounded-lg ${
                  featured
                    ? "bg-white/15 text-white"
                    : "bg-blue-950/10 text-blue-950"
                }`}
              >
                <Icon className="size-5" />
              </div>
              <CardTitle
                className={`text-lg ${featured ? "text-white" : "text-slate-900"}`}
              >
                {t(titleKey)}
              </CardTitle>
              <CardDescription
                className={`text-base leading-relaxed ${
                  featured ? "text-blue-100" : ""
                }`}
              >
                {t(descriptionKey)}
              </CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </section>
  );
};
