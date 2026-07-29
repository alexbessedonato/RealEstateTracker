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
                        <Table className="w-full text-xs">
                            <TableHeader className="bg-gray-100">
                                <TableRow>
                                    <TableHead className="w-1/4 text-center font-semibold">{t("managers.list.columns.name")}</TableHead>
                                    <TableHead className="w-1/4 text-center font-semibold">{t("managers.list.columns.company")}</TableHead>
                                    <TableHead className="w-1/4 text-center font-semibold">{t("managers.list.columns.email")}</TableHead>
                                    <TableHead className="w-1/4 text-center font-semibold">{t("managers.list.columns.phone")}</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody className="text-blue-950">
                                {managers.map((manager) => {
                                    const name = manager.name ?? t("common.empty");
                                    const company = manager.company ?? t("common.empty");
                                    const email = manager.email ?? t("common.empty");
                                    const phone = manager.phone ?? t("common.empty");

                                    return (
                                        <TableRow key={manager.id} onClick={() => {
                                            const selection = window.getSelection();
                                            if (selection && selection.toString().length > 0) return
                                            navigateToEditManager(manager)}}>
                                            <TableCell className="max-w-[8rem] text-center">
                                                <span className="block truncate" title={name}>{name}</span>
                                            </TableCell>
                                            <TableCell className="max-w-[8rem] text-center">
                                                <span className="block truncate" title={company}>{company}</span>
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
    )
};
