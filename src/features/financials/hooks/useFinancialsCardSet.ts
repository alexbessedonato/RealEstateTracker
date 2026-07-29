import { useTranslation } from "react-i18next";
import { useFinancialsQuery } from "./queries";

export const useFinancialsCardSet = () => {
  const { t } = useTranslation();
  const { data: financials, isError } = useFinancialsQuery();

  const cards = [
    {
      title: t("financials.totalRent"),
      value: `${financials?.total_rent ?? 0} €`,
      format: "text-green-700"

    },
    {
      title: t("financials.totalMortgage"),
      value: `${financials?.total_mortgage ?? 0} €`,
      format: "text-red-800"

    },
    {
      title: t("financials.netIncome"),
      value: `${financials?.net_profit ?? 0} €`,
      format: "text-blue-900"
    },
  ];

  return {
    cards,
    isError,
  };
};
