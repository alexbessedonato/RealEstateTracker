import { useForm } from "@tanstack/react-form";
import { useNavigate } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { useManagersQuery } from "@/features/managers/hooks/queries";
import { useDismissDialog } from "@/hooks/useDismissDialog";
import { useDeletePropertyMutation, useEditPropertyMutation, usePropertiesQuery } from "../hooks/queries";
import { editPropertyRoute } from "@/routes/router";
 
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { GenericAlertDialog } from "@/components/layout/GenericAlertDialog";

export const EditPropertyPage = () => {
    const { t } = useTranslation();
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  
    const navigate = useNavigate();
    const dismissDialog = useDismissDialog();
    const navigateToDashboard = () => navigate({ to: "/dashboard", replace: true });
    const { propertyId } = editPropertyRoute.useParams();
    const { data: properties = [] } = usePropertiesQuery();
    const property = properties.find((property) => property.id === propertyId);
    const { data: managers = [] } = useManagersQuery();
    const editProperty = useEditPropertyMutation();
    const deleteProperty = useDeletePropertyMutation();

  const form = useForm({
    defaultValues: {
      name: property?.name || "",
      rent: property?.rent || 0,
      mortgage: property?.mortgage || 0,
      address: property?.address || "",
      insurance_file: null as File | null,
      contract_file: null as File | null,
      manager_id: property?.manager_id ?? "none",
    },
    onSubmit: async ({ value }) => {
      if (!property) return;

      await editProperty.mutateAsync({
        id: propertyId,
        name: value.name,
        address: value.address,
        rent: value.rent,
        mortgage: value.mortgage,
        insurance_file: value.insurance_file,
        contract_file: value.contract_file,
        insurance_url: property.insurance_url,
        contract_url: property.contract_url,
        manager_id:
          !value.manager_id || value.manager_id === "none"
            ? null
            : value.manager_id,
      });
      navigateToDashboard();
    },
  });

  return (
    <>
    <Dialog open={true} onOpenChange={(open) => !open && dismissDialog()}>
      <DialogContent className="sm:max-w-sm backdrop-blur-md bg-white/90">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            {t("properties.edit.title")}
          </DialogTitle>
          <DialogDescription className="text-center">
            {t("properties.edit.description")}
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="flex flex-col gap-4"
        >
          <form.Field name="name">
            {(field) => (
              <Field>
                <FieldLabel htmlFor={field.name}>{t("properties.form.nameLabel")}</FieldLabel>
                <Input
                  id={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder={t("properties.form.namePlaceholder")}
                />
              </Field>
            )}
          </form.Field>

          <form.Field name="address">
            {(field) => (
              <Field>
                <FieldLabel htmlFor={field.name}>{t("properties.form.addressLabel")}</FieldLabel>
                <Input
                  id={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder={t("properties.form.addressPlaceholder")}
                />
              </Field>
            )}
          </form.Field>

          <form.Field name="rent">
            {(field) => (
              <Field>
                <FieldLabel htmlFor={field.name}>{t("properties.form.rentLabel")}</FieldLabel>
                <Input
                  id={field.name}
                  type="number"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.valueAsNumber)}
                  placeholder={t("properties.form.rentPlaceholder")}
                />
              </Field>
            )}
          </form.Field>

          <form.Field name="mortgage">
            {(field) => (
              <Field>
                <FieldLabel htmlFor={field.name}>{t("properties.form.mortgageLabel")}</FieldLabel>
                <Input
                  id={field.name}
                  type="number"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.valueAsNumber)}
                  placeholder={t("properties.form.mortgagePlaceholder")}
                />
              </Field>
            )}
          </form.Field>

          <form.Field name="insurance_file">
            {(field) => (
              <Field>
                <FieldLabel htmlFor={field.name}>
                  {t("properties.form.insuranceLabel")}
                </FieldLabel>
                <FieldDescription>
                  {t("properties.form.keepCurrentFile")}
                </FieldDescription>
                <Input
                  id={field.name}
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onBlur={field.handleBlur}
                  onChange={(e) => {
                    const file = e.target.files?.[0] || null;
                    field.handleChange(file);
                  }}
                />
              </Field>
            )}
          </form.Field>

          <form.Field name="contract_file">
            {(field) => (
              <Field>
                <FieldLabel htmlFor={field.name}>
                  {t("properties.form.contractLabel")}
                </FieldLabel>
                <FieldDescription>
                  {t("properties.form.keepCurrentFile")}
                </FieldDescription>
                <Input
                  id={field.name}
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onBlur={field.handleBlur}
                  onChange={(e) => {
                    const file = e.target.files?.[0] || null;
                    field.handleChange(file);
                  }}
                />
              </Field>
            )}
          </form.Field>

          <form.Field name="manager_id">
            {(field) => (
              <Field>
                <FieldLabel htmlFor={field.name}>{t("properties.form.managerLabel")}</FieldLabel>
                <Select
                  value={field.state.value}
                  onValueChange={field.handleChange}
                >
                  <SelectTrigger id={field.name}>
                    <SelectValue placeholder={t("properties.form.managerPlaceholder")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">{t("properties.form.noManager")}</SelectItem>

                    {managers.map((manager) => (
                      <SelectItem key={manager.id} value={manager.id}>
                        {manager.name}{" "}
                        {manager.company ? `(${manager.company})` : ""}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
            )}
          </form.Field>

          <DialogFooter className="pt-4">
            <Button
              type="submit"
              className="w-full"
              disabled={
                form.state.isSubmitting ||
                editProperty.isPending
              }
            >
              {form.state.isSubmitting || editProperty.isPending
                ? t("common.saving")
                : t("common.saveChanges")}
            </Button>
          </DialogFooter>

          <DialogFooter className="pt-4">
            <Button
              type="button"
              variant="destructive"
              className="w-full"
              onClick={() => setShowDeleteDialog(true)}
              disabled={deleteProperty.isPending}
            >
              {t("properties.edit.delete")}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>

    <GenericAlertDialog
      open={showDeleteDialog}
      onOpenChange={(open) => {
        if (!deleteProperty.isPending) setShowDeleteDialog(open);
      }}
      isPending={deleteProperty.isPending}
      title={t("properties.edit.deleteDialogTitle")}
      description={t("properties.edit.deleteConfirm")}
      onConfirm={async () => {
        await deleteProperty.mutateAsync(propertyId);
        navigateToDashboard();
      }}
      onCancel={() => setShowDeleteDialog(false)}
    />
    </>
  );
};
