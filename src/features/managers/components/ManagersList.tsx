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
import { useManagersQuery } from "../hooks/queries";
import { useNavigate } from '@tanstack/react-router';
import type { Manager } from "../types";
import { useTranslation } from "react-i18next";

export const ManagersList = () => {
    const { t } = useTranslation();
    const { data: managers = [] } = useManagersQuery();
    const navigate = useNavigate();
    const navigateToAddManager = () => navigate({ to: "/add-manager" });
    const navigateToEditManager = (manager: Manager) =>
        navigate({ to: "/edit-manager/$managerId", params: { managerId: manager.id } });

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <Card className="w-full">
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <CardTitle>{t("managers.list.title")}</CardTitle>
                        {managers.length > 0 && (
                            <Button variant="outline" className="bg-blue-950 text-white" onClick={navigateToAddManager}>{t("managers.list.add")}</Button>
                        )}
                    </div>
                </CardHeader>
                {managers.length === 0 ? (
                    <CardContent>
                        <div className="flex flex-col items-center justify-center py-6">
                            <h2 className="text-lg font-semibold text-gray-700">{t("managers.list.emptyTitle")}</h2>
                            <p className="mt-1 text-sm text-gray-500">{t("managers.list.emptyDescription")}</p>
                            <Button variant="outline" className="mt-3" onClick={navigateToAddManager}>{t("managers.list.add")}</Button>
                        </div>
                    </CardContent>
                ) : (
                    <CardContent>
                        <div className="rounded-md border border-gray-300 overflow-x-auto">
                            <Table className="w-full">
                                <TableHeader className="bg-gray-100">
                                    <TableRow>
                                        <TableHead className="w-1/4 text-center font-semibold">{t("managers.list.columns.name")}</TableHead>
                                        <TableHead className="w-1/4 text-center font-semibold">{t("managers.list.columns.company")}</TableHead>
                                        <TableHead className="w-1/4 text-center font-semibold">{t("managers.list.columns.email")}</TableHead>
                                        <TableHead className="w-1/4 text-center font-semibold">{t("managers.list.columns.phone")}</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody className="text-blue-950">
                                    {managers.map((manager) => (
                                        <TableRow key={manager.id} onClick={() => navigateToEditManager(manager)}>
                                            <TableCell className="text-center">{manager.name ?? t("common.empty")}</TableCell>
                                            <TableCell className="text-center">{manager.company ?? t("common.empty")}</TableCell>
                                            <TableCell className="text-center">{manager.email ?? t("common.empty")}</TableCell>
                                            <TableCell className="text-center">{manager.phone ?? t("common.empty")}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                )}
            </Card>
        </div>
    )
};
