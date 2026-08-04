import { useForm } from "@tanstack/react-form";
import { useNavigate } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Input } from "@/components/ui/input";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { useManagersQuery } from "@/features/managers/hooks/queries";
import { useDismissDialog } from "@/hooks/useDismissDialog";
import { useAddPropertyMutation } from "../hooks/queries";
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

export const AddPropertyPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dismissDialog = useDismissDialog();
  const navigateToDashboard = () =>
    navigate({ to: "/dashboard", replace: true });
  const addProperty = useAddPropertyMutation();
  const { data: managers = [] } = useManagersQuery();

  const form = useForm({
    defaultValues: {
      name: "",
      rent: 0,
      mortgage: 0,
      address: "",
      insurance_file: null as File | null,
      contract_file: null as File | null,
      manager_id: "",
    },
    onSubmit: async ({ value }) => {
      await addProperty.mutateAsync({
        ...value,
        manager_id:
          !value.manager_id || value.manager_id === "none"
            ? null
            : value.manager_id,
      });
      navigateToDashboard();
    },
  });

  return (
    <Dialog open={true} onOpenChange={(open) => !open && dismissDialog()}>
      <DialogContent className="sm:max-w-sm backdrop-blur-md bg-white/90">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            {t("properties.add.title")}
          </DialogTitle>
          <DialogDescription className="text-center">
            {t("properties.add.description")}
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
                <FieldLabel htmlFor={field.name}>
                  {t("properties.form.nameLabel")}
                </FieldLabel>
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
                <FieldLabel htmlFor={field.name}>
                  {t("properties.form.addressLabel")}
                </FieldLabel>
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
                <FieldLabel htmlFor={field.name}>
                  {t("properties.form.rentLabel")}
                </FieldLabel>
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
                <FieldLabel htmlFor={field.name}>
                  {t("properties.form.mortgageLabel")}
                </FieldLabel>
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
                {field.state.value instanceof File && (
                  <FieldDescription>
                    {t("properties.form.fileSelected", {
                      fileName: field.state.value.name,
                    })}
                  </FieldDescription>
                )}
              </Field>
            )}
          </form.Field>

          <form.Field name="contract_file">
            {(field) => (
              <Field>
                <FieldLabel htmlFor={field.name}>
                  {t("properties.form.contractLabel")}
                </FieldLabel>
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
                {field.state.value instanceof File && (
                  <FieldDescription>
                    {t("properties.form.fileSelected", {
                      fileName: field.state.value.name,
                    })}
                  </FieldDescription>
                )}
              </Field>
            )}
          </form.Field>

          <form.Field name="manager_id">
            {(field) => (
              <Field>
                <FieldLabel htmlFor={field.name}>
                  {t("properties.form.managerLabel")}
                </FieldLabel>
                <Select
                  value={field.state.value}
                  onValueChange={field.handleChange}
                >
                  <SelectTrigger id={field.name}>
                    <SelectValue
                      placeholder={t("properties.form.managerPlaceholder")}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">
                      {t("properties.form.noManager")}
                    </SelectItem>

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
              disabled={form.state.isSubmitting || addProperty.isPending}
            >
              {form.state.isSubmitting || addProperty.isPending
                ? t("common.adding")
                : t("properties.add.submit")}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
