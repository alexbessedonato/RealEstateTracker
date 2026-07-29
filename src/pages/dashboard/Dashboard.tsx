import { FinancialsCardSet } from "@/features/financials/components/FinancialsCardSet";
import { useFinancialsQuery } from "@/features/financials/hooks/queries";
import { ManagersList } from "@/features/managers/components/ManagersList";
import { useManagersQuery } from "@/features/managers/hooks/queries";
import { PropertiesList } from "@/features/properties/components/PropertiesList";
import { usePropertiesQuery } from "@/features/properties/hooks/queries";
import { TenantsList } from "@/features/tenants/components/TenantsList";
import { useTenantsQuery } from "@/features/tenants/hooks/queries";
import { DashboardSkeleton } from "@/pages/dashboard/DashboardSkeleton";

export const Dashboard = () => {

  const properties = usePropertiesQuery()
  const managers = useManagersQuery();
  const tenants = useTenantsQuery();
  const financials = useFinancialsQuery();

  if (
    properties.isPending || 
    managers.isPending || 
    tenants.isPending || 
    financials.isPending
  ) return <DashboardSkeleton />

  return (
    <section className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 sm:px-6 lg:px-8">
      <PropertiesList />
      <FinancialsCardSet />
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="min-w-0 flex-1">
          <TenantsList />
        </div>
        <div className="min-w-0 flex-1">
          <ManagersList />
        </div>
      </div>
    </section>
  );
};

