import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { useNavigate } from "@tanstack/react-router";
import { usePropertiesQuery } from "@/features/properties/hooks/queries";
import { Input } from "@/components/ui/input";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
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
import { GenericAlertDialog } from "@/components/layout/GenericAlertDialog";
import { useDismissDialog } from "@/hooks/useDismissDialog";
import { editTenantRoute } from "@/routes/router";
import {
  useDeleteTenantMutation,
  useEditTenantMutation,
  useTenantsQuery,
} from "../hooks/queries";
import { useTranslation } from "react-i18next";

export const EditTenantPage = () => {
  const { t } = useTranslation();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const navigate = useNavigate();
  const dismissDialog = useDismissDialog();
  const navigateToDashboard = () => navigate({ to: "/dashboard", replace: true });
  const { tenantId } = editTenantRoute.useParams();
  const { data: tenants = [] } = useTenantsQuery();
  const { data: properties = [] } = usePropertiesQuery();
  const tenant = tenants.find((item) => item.id === tenantId);
  const editTenant = useEditTenantMutation();
  const deleteTenant = useDeleteTenantMutation();

  const form = useForm({
    defaultValues: {
      full_name: tenant?.full_name || "",
      email: tenant?.email || "",
      phone: tenant?.phone || "",
      property_id: tenant?.property_id ?? "none",
    },
    onSubmit: async ({ value }) => {
      if (!tenant) return;

      await editTenant.mutateAsync({
        id: tenantId,
        full_name: value.full_name,
        email: value.email || null,
        phone: value.phone || null,
        property_id:
          !value.property_id || value.property_id === "none"
            ? null
            : value.property_id,
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
              {t("tenants.edit.title")}
            </DialogTitle>
            <DialogDescription className="text-center">
              {t("tenants.edit.description")}
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
            <form.Field name="full_name">
              {(field) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>{t("tenants.form.nameLabel")}</FieldLabel>
                  <Input
                    id={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder={t("tenants.form.namePlaceholder")}
                  />
                </Field>
              )}
            </form.Field>

            <form.Field
              name="email"
              validators={{
                onChange: ({ value }) =>
                  value && !value.includes("@") ? t("common.validation.emailInvalid") : undefined,
              }}
            >
              {(field) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>{t("common.email")}</FieldLabel>
                  <Input
                    id={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder={t("common.placeholders.email")}
                  />
                  {field.state.meta.errors.length > 0 && (
                    <FieldError>{field.state.meta.errors.join(", ")}</FieldError>
                  )}
                </Field>
              )}
            </form.Field>

            <form.Field
              name="phone"
              validators={{
                onChange: ({ value }) => {
                  if (!value) return undefined;
                  const isValid = /^\+?\d{9,15}$/.test(value);
                  return !isValid
                    ? t("common.validation.phoneInvalid")
                    : undefined;
                },
              }}
            >
              {(field) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>{t("common.phone")}</FieldLabel>
                  <Input
                    id={field.name}
                    type="tel"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder={t("common.placeholders.phone")}
                  />
                  {field.state.meta.errors.length > 0 && (
                    <FieldError>{field.state.meta.errors.join(", ")}</FieldError>
                  )}
                </Field>
              )}
            </form.Field>

            <form.Field name="property_id">
              {(field) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>{t("tenants.form.propertyLabel")}</FieldLabel>
                  <Select
                    value={field.state.value}
                    onValueChange={field.handleChange}
                  >
                    <SelectTrigger id={field.name}>
                      <SelectValue placeholder={t("tenants.form.propertyPlaceholder")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">{t("tenants.form.noProperty")}</SelectItem>

                      {properties.map((property) => (
                        <SelectItem key={property.id} value={property.id}>
                          {property.name}{" "}
                          {property.address ? `(${property.address})` : ""}
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
                disabled={form.state.isSubmitting || editTenant.isPending}
              >
                {form.state.isSubmitting || editTenant.isPending
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
                disabled={editTenant.isPending}
              >
                {t("tenants.edit.delete")}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <GenericAlertDialog
        open={showDeleteDialog}
        onOpenChange={(open) => {
          if (!deleteTenant.isPending) setShowDeleteDialog(open);
        }}
        isPending={deleteTenant.isPending}
        title={t("tenants.edit.deleteDialogTitle")}
        description={`${t("tenants.edit.deleteConfirm", { name: tenant?.full_name })}${tenant?.property?.name ? t("tenants.edit.deleteConfirmUnlink", { property: tenant.property.name }) : ""}`}
        onConfirm={async () => {
          await deleteTenant.mutateAsync(tenantId);
          navigateToDashboard();
        }}
        onCancel={() => setShowDeleteDialog(false)}
      />
    </>
  );
};
