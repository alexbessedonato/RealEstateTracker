import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { useNavigate } from "@tanstack/react-router";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { GenericAlertDialog } from "@/components/layout/GenericAlertDialog";
import { useDismissDialog } from "@/hooks/useDismissDialog";
import { editManagerRoute } from "@/routes/router";
import {
  useDeleteManagerMutation,
  useEditManagerMutation,
  useManagersQuery,
} from "../hooks/queries";
import { useTranslation } from "react-i18next";

export const EditManagerPage = () => {
  const { t } = useTranslation();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const navigate = useNavigate();
  const dismissDialog = useDismissDialog();
  const navigateToDashboard = () => navigate({ to: "/dashboard", replace: true });
  const { managerId } = editManagerRoute.useParams();
  const { data: managers = [] } = useManagersQuery();
  const manager = managers.find((m) => m.id === managerId);
  const editManager = useEditManagerMutation();
  const deleteManager = useDeleteManagerMutation();

  const form = useForm({
    defaultValues: {
      name: manager?.name || "",
      company: manager?.company || "",
      email: manager?.email || "",
      phone: manager?.phone || "",
    },
    onSubmit: async ({ value }) => {
      if (!manager) return;

      await editManager.mutateAsync({
        id: managerId,
        name: value.name,
        company: value.company || null,
        email: value.email || null,
        phone: value.phone || null,
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
              {t("managers.edit.title")}
            </DialogTitle>
            <DialogDescription className="text-center">
              {t("managers.edit.description")}
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
                  <FieldLabel htmlFor={field.name}>{t("managers.form.nameLabel")}</FieldLabel>
                  <Input
                    id={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder={t("managers.form.namePlaceholder")}
                  />
                </Field>
              )}
            </form.Field>

            <form.Field name="company">
              {(field) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>{t("managers.form.companyLabel")}</FieldLabel>
                  <Input
                    id={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder={t("managers.form.companyPlaceholder")}
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
                    placeholder={t("managers.form.emailPlaceholder")}
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

            <DialogFooter className="pt-4">
              <Button
                type="submit"
                className="w-full"
                disabled={form.state.isSubmitting || editManager.isPending}
              >
                {form.state.isSubmitting || editManager.isPending
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
                disabled={editManager.isPending}
              >
                {t("managers.edit.delete")}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <GenericAlertDialog
        open={showDeleteDialog}
        onOpenChange={(open) => {
          if (!deleteManager.isPending) setShowDeleteDialog(open);
        }}
        isPending={deleteManager.isPending}
        title={t("managers.edit.deleteDialogTitle")}
        description={t("managers.edit.deleteConfirm", { name: manager?.name })}
        onConfirm={async () => {
          await deleteManager.mutateAsync(managerId);
          navigateToDashboard();
        }}
        onCancel={() => setShowDeleteDialog(false)}
      />
    </>
  );
};
