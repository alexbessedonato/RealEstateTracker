import { useForm } from "@tanstack/react-form";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
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
import { useDismissDialog } from "@/hooks/useDismissDialog";
import { usePasswordUpdateMutation } from "../hooks/mutations";
import { useNavigate } from "@tanstack/react-router";

export function NewPasswordPage() {
  const { t } = useTranslation();
  const dismissDialog = useDismissDialog("/");
  const navigate = useNavigate();
  const navigateToDashboard = () => navigate({ to: "/dashboard" });
  const confirmNewPassword = usePasswordUpdateMutation()

  const form = useForm({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
    onSubmit: async ({ value }) => {
      await confirmNewPassword.mutateAsync(value.password)
      navigateToDashboard();
    },
  });

  return (
    <Dialog open={true} onOpenChange={(open) => !open && dismissDialog()}>
      <DialogContent className="sm:max-w-sm backdrop-blur-md bg-white/90">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            {t('auth.newPassword.title')}
          </DialogTitle>
          <DialogDescription className="text-center">
            {t('auth.newPassword.description')}
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="space-y-4 pt-4"
        >
          <form.Field
            name="password"
            validators={{
              onChange: ({ value }) =>
                value.length < 6 ? t('common.validation.minPassword') : undefined,
            }}
            children={(field) => (
              <Field>
                <FieldLabel htmlFor={field.name}>{t('auth.newPassword.passwordLabel')}</FieldLabel>
                <Input
                  id={field.name}
                  type="password"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                {field.state.meta.errors.length > 0 && (
                  <FieldError>{field.state.meta.errors.join(", ")}</FieldError>
                )}
              </Field>
            )}
          />

          <form.Field
            name="confirmPassword"
            validators={{
              onChange: ({ value, fieldApi }) => {
                if (value !== fieldApi.form.getFieldValue("password")) {
                  return t('common.validation.passwordMismatch');
                }
                return undefined;
              },
            }}
            children={(field) => (
              <Field>
                <FieldLabel htmlFor={field.name}>{t('auth.newPassword.confirmPasswordLabel')}</FieldLabel>
                <Input
                  id={field.name}
                  type="password"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                {field.state.meta.errors.length > 0 && (
                  <FieldError>{field.state.meta.errors.join(", ")}</FieldError>
                )}
              </Field>
            )}
          />

          <DialogFooter className="pt-4">
            <Button
              type="submit"
              className="w-full"
              disabled={form.state.isSubmitting}
            >
              {form.state.isSubmitting ? t('common.saving') : t('auth.newPassword.submit')}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
