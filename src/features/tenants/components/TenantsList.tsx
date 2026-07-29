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
                        <Table className="w-full text-xs">
                            <TableHeader className="bg-gray-100">
                                <TableRow>
                                    <TableHead className="w-1/4 text-center font-semibold">{t("tenants.list.columns.name")}</TableHead>
                                    <TableHead className="w-1/4 text-center font-semibold">{t("tenants.list.columns.property")}</TableHead>
                                    <TableHead className="w-1/4 text-center font-semibold">{t("tenants.list.columns.email")}</TableHead>
                                    <TableHead className="w-1/4 text-center font-semibold">{t("tenants.list.columns.phone")}</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody className="text-blue-950">
                                {tenants.map((tenant) => {
                                    const name = tenant.full_name ?? t("common.empty");
                                    const property = tenant.property?.name ?? t("common.empty");
                                    const email = tenant.email ?? t("common.empty");
                                    const phone = tenant.phone ?? t("common.empty");

                                    return (
                                        <TableRow key={tenant.id} onClick={() => {
                                            const selection = window.getSelection();
                                            if (selection && selection.toString().length > 0) return
                                            navigateToEditTenant(tenant)}}>
                                            <TableCell className="max-w-[8rem] text-center">
                                                <span className="block truncate" title={name}>{name}</span>
                                            </TableCell>
                                            <TableCell className="max-w-[8rem] text-center">
                                                <span className="block truncate" title={property}>{property}</span>
                                            </TableCell>
                                            <TableCell className="max-w-[8rem] text-center">
                                                <span className="block truncate" title={email}>{email}</span>
                                            </TableCell>
                                            <TableCell className="max-w-[8rem] text-center">
                                                <span className="block truncate" title={phone}>{phone}</span>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            )}
        </Card>
    );
};
