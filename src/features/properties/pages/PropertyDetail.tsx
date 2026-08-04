import { propertyDetailRoute } from "@/routes/router";
import { usePropertiesQuery } from "../hooks/queries";
import { PropertyProfileCard } from "../components/PropertyProfileCard";
import { PropertyManagersCard } from "../components/PropertyManagersCard";
import { PropertyTenantsCard } from "../components/PropertyTenantsCard";
import { PropertyPaymentsCard } from "../components/PropertyPaymentsCard";

export const PropertyDetail = () => {
  const { propertyId } = propertyDetailRoute.useParams();
  const { data: properties = [] } = usePropertiesQuery();
  const property = properties.find((property) => property.id === propertyId);

  if (!property) {
    return <p>Property not found</p>;
  }

  return (
    <section className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 sm:px-6 lg:px-8">
      <PropertyProfileCard property={property} />
      <div className="flex flex-col gap-4 md:flex-row">

        <div className="min-w-0 flex-1">
        <PropertyManagersCard />
        </div>

        <div className="min-w-0 flex-1">
        <PropertyTenantsCard />
        </div>

      </div>
      <PropertyPaymentsCard />
    </section>
  );
};