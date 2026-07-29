import { useTranslation } from "react-i18next";
import { useFinancialsQuery } from "./queries";

export const useFinancialsCardSet = () => {
  const { t } = useTranslation();
  const { data: financials, isError } = useFinancialsQuery();

  const cards = [
    {
      title: t("financials.totalRent"),
      value: `${financials?.total_rent ?? 0} €`,
    },
    {
      title: t("financials.totalMortgage"),
      value: `${financials?.total_mortgage ?? 0} €`,
    },
    {
      title: t("financials.netIncome"),
      value: `${financials?.net_profit ?? 0} €`,
      format: "text-green-600"

    },
  ];

  return {
    cards,
    isError,
  };
};
