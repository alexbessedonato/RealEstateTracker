import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { PropertyForTable } from "../types";
import { PropertyMap } from "./PropertyMap";
import { Button } from "@/components/ui/button";

export const PropertyProfileCard = ({ property }: { property: PropertyForTable }) => {

  const mainTenant = property.tenants?.[0]?.full_name
  console.log("mainTenant", mainTenant)
  console.log("property", property)
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl">Perfil de la Propiedad</CardTitle>
      </CardHeader>
      <div className="flex flex-col md:flex-row">
        <div className="min-w-0 flex-1">
          <CardContent>
            <PropertyMap />
          </CardContent>
        </div>

        <div className="min-w-0 flex-1">
          <CardContent>
          <h1 className="text-2xl">{property.name}</h1>
          <p className="text-blue-900 italic">{property.address}</p>
            
          {property.tenants?.[0]?.full_name && (
            <div className="mt-6 flex w-full items-end justify-between gap-4">
              <div>
                <p className="text-gray-400">Inquilino Principal</p>
                <p className="text-lg font-semibold">{property.tenants[0].full_name}</p>
              </div>
              <Button>Contactar</Button>
            </div>
          )}
          </CardContent>
        </div>
      </div>
    </Card>
  );
};
