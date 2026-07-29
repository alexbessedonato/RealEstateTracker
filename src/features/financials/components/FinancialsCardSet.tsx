import { cn } from "@/lib/utils";
import { useFinancialsCardSet } from "../hooks/useFinancialsCardSet";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "react-i18next";

export const FinancialsCardSet = () => {
  const { t } = useTranslation();
  const { cards, isError } = useFinancialsCardSet();

  if (isError) {
    return <p className="text-sm text-red-600">{t("financials.loadError")}</p>;
  }

  return (
    <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-3">
      {cards.map((card) => (
        <Card key={card.title} className="w-full">
          <CardHeader>
            <CardTitle className="text-2xl">{card.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className={cn("text-3xl font-semibold", card.format ? card.format : "text-blue-950")}>{card.value}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
