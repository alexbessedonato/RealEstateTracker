import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"
import { ReceiptText } from "lucide-react"
import { useNavigate } from "@tanstack/react-router"
import { useTranslation } from "react-i18next"
import { usePropertiesList } from "../hooks/usePropertiesList"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import type { PropertyForTable } from "../types"

export const PropertiesList = () => {
    const { t } = useTranslation();
    const { properties, handleOpenFile } = usePropertiesList();

    const navigate = useNavigate();
    const navigateToAddProperty = () => navigate({ to: "/add-property" });
    const navigateToEditProperty = (property: PropertyForTable) => navigate({ to: "/edit-property/$propertyId", params: { propertyId: property.id }});

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <Card className="w-full">
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <div>
                            <CardTitle>{t("properties.list.title")}</CardTitle>
                            <CardDescription>
                                {t("properties.list.updatedOn", { time: new Date().toLocaleTimeString() })}
                            </CardDescription>
                        </div>
                        {properties.length > 0 && (
                            <Button variant="outline" className="bg-blue-950 text-white" onClick={navigateToAddProperty}>{t("properties.list.add")}</Button>
                        )}
                    </div>
                </CardHeader>
                {properties.length === 0 ? (
                    <CardContent>
                        <div className="flex flex-col items-center justify-center py-6">
                            <h2 className="text-lg font-semibold text-gray-700">{t("properties.list.emptyTitle")}</h2>
                            <p className="mt-1 text-sm text-gray-500">{t("properties.list.emptyDescription")}</p>
                            <Button variant="outline" className="mt-3" onClick={navigateToAddProperty}>{t("properties.list.add")}</Button>
                        </div>
                    </CardContent>
                ) : (
                    <CardContent>
                        <div className="rounded-md border border-gray-300 overflow-x-auto">
                            <Table>
                                <TableHeader className="bg-gray-100">
                                    <TableRow>
                                        <TableHead className="text-center font-semibold">{t("properties.list.columns.property")}</TableHead>
                                        <TableHead className="text-center font-semibold">{t("properties.list.columns.tenant")}</TableHead>
                                        <TableHead className="text-center font-semibold">{t("properties.list.columns.manager")}</TableHead>
                                        <TableHead className="text-center font-semibold">{t("properties.list.columns.rent")}</TableHead>
                                        <TableHead className="text-center font-semibold">{t("properties.list.columns.mortgage")}</TableHead>
                                        <TableHead className="text-center font-semibold">{t("properties.list.columns.insurance")}</TableHead>
                                        <TableHead className="text-center font-semibold">{t("properties.list.columns.contract")}</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody className="text-blue-950">
                                    {properties.map((property) => (
                                        <TableRow key={property.name} onClick={() => navigateToEditProperty(property)}>
                                            <TableCell className="text-center">
                                                <div className="flex flex-col items-center leading-tight">
                                                    <span>{property.name}</span>
                                                    {property.address ? (
                                                        <span className="mt-1 text-xs italic text-[#1f3a8a]">{property.address}</span>
                                                    ) : null}
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-center">{property.tenants?.[0]?.full_name ?? t("common.notAssigned")}</TableCell>
                                            <TableCell className="text-center">{property.manager?.name ?? t("common.notAssigned")}</TableCell>
                                            <TableCell className="text-center">{property.rent}€</TableCell>
                                            <TableCell className="text-center">{property.mortgage}€</TableCell>
                                            <TableCell className="text-center">
                                                {property.insurance_url ? (
                                                    <Button
                                                        variant="outline"
                                                        className="font-bold"
                                                        size="sm"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            if (property.insurance_url) {
                                                                void handleOpenFile(property.insurance_url)  
                                                            }}}
                                                        >
                                                        <Eye className="mr-2 h-4 w-4" />
                                                        {t("properties.list.viewInsurance")}
                                                    </Button>
                                                ) : (
                                                    t("properties.list.noInsurance")
                                                )}
                                            </TableCell>
                                            <TableCell className="text-center text-blue-950">
                                                {property.contract_url ? (
                                                    <Button
                                                        variant="outline"
                                                        className="font-bold"
                                                        size="sm"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            if (property.contract_url) {
                                                              void handleOpenFile(property.contract_url);
                                                            }}}
                                                        >
                                                        <ReceiptText className=" mr-2 h-4 w-4" />
                                                        {t("properties.list.viewContract")}
                                                    </Button>
                                                ) : (
                                                    t("properties.list.noContract")
                                                )}
                                            </TableCell>
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
}
