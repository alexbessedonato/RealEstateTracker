import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useTenantsQuery } from "../hooks/queries";
import { useNavigate } from "@tanstack/react-router";
import type { TenantForTable } from "../types";
import { useTranslation } from "react-i18next";

export const TenantsList = () => {
    const { t } = useTranslation();
    const { data: tenants = [] } = useTenantsQuery();
    const navigate = useNavigate();
    const navigateToAddTenant = () => navigate({ to: "/add-tenant" });
    const navigateToEditTenant = (tenant: TenantForTable) =>
        navigate({ to: "/edit-tenant/$tenantId", params: { tenantId: tenant.id } });

    return (

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <Card className="w-full">
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <CardTitle>{t("tenants.list.title")}</CardTitle>
                        {tenants.length > 0 && (
                            <Button variant="outline" className="bg-blue-950 text-white" onClick={navigateToAddTenant}>{t("tenants.list.add")}</Button>
                        )}
                    </div>
                </CardHeader>
                {tenants.length === 0 ? (
                    <CardContent>
                        <div className="flex flex-col items-center justify-center py-6">
                            <h2 className="text-lg font-semibold text-gray-700">{t("tenants.list.emptyTitle")}</h2>
                            <p className="mt-1 text-sm text-gray-500">{t("tenants.list.emptyDescription")}</p>
                            <Button variant="outline" className="mt-3" onClick={navigateToAddTenant}>{t("tenants.list.add")}</Button>
                        </div>
                    </CardContent>
                ) : (
                    <CardContent>
                        <div className="rounded-md border border-gray-300 overflow-x-auto">
                            <Table className="w-full">
                                <TableHeader className="bg-gray-100">
                                    <TableRow>
                                        <TableHead className="w-1/4 text-center font-semibold">{t("tenants.list.columns.name")}</TableHead>
                                        <TableHead className="w-1/4 text-center font-semibold">{t("tenants.list.columns.property")}</TableHead>
                                        <TableHead className="w-1/4 text-center font-semibold">{t("tenants.list.columns.email")}</TableHead>
                                        <TableHead className="w-1/4 text-center font-semibold">{t("tenants.list.columns.phone")}</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody className="text-blue-950">
                                    {tenants.map((tenant) => (
                                        <TableRow key={tenant.id} onClick={() => navigateToEditTenant(tenant)}>
                                            <TableCell className="text-center">{tenant.full_name ?? t("common.empty")}</TableCell>
                                            <TableCell className="text-center">{tenant.property?.name ?? t("common.empty")}</TableCell>
                                            <TableCell className="text-center">{tenant.email ?? t("common.empty")}</TableCell>
                                            <TableCell className="text-center">{tenant.phone ?? t("common.empty")}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                )}
            </Card>
        </div>

    );
};
