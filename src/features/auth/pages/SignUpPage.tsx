import { useForm } from "@tanstack/react-form";
import { useNavigate } from "@tanstack/react-router";
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
import { useSignUpMutation } from "../hooks/mutations";

export function SignUpPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dismissDialog = useDismissDialog("/");
  const navigateToDashboard = () => navigate({ to: "/dashboard", replace: true });
  const signUp = useSignUpMutation();

  const form = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: async ({ value }) => {
      await signUp.mutateAsync(value);
      navigateToDashboard();
    },
  });

  return (
    <Dialog open={true} onOpenChange={(open) => !open && dismissDialog()}>
      <DialogContent className="sm:max-w-sm backdrop-blur-md bg-white/90">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            {t('auth.signUp.title')}
          </DialogTitle>
          <DialogDescription className="text-center">
            {t('auth.signUp.description')}
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="space-y-4 pt-2"
        >
          <form.Field
            name="fullName"
            validators={{
              onChange: ({ value }) =>
                !value ? t('auth.signUp.validation.fullNameRequired') : undefined,
            }}
            children={(field) => (
              <Field>
                <FieldLabel htmlFor={field.name}>{t('auth.signUp.fullNameLabel')}</FieldLabel>
                <Input
                  id={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder={t('auth.signUp.placeholders.fullName')}
                />
                {field.state.meta.errors.length > 0 && (
                  <FieldError>{field.state.meta.errors.join(", ")}</FieldError>
                )}
              </Field>
            )}
          />

          <form.Field
            name="email"
            validators={{
              onChange: ({ value }) =>
                !value.includes("@") ? t('common.validation.emailInvalid') : undefined,
            }}
            children={(field) => (
              <Field>
                <FieldLabel htmlFor={field.name}>{t('common.email')}</FieldLabel>
                <Input
                  id={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder={t('auth.signUp.placeholders.email')}
                />
                {field.state.meta.errors.length > 0 && (
                  <FieldError>{field.state.meta.errors.join(", ")}</FieldError>
                )}
              </Field>
            )}
          />

          <form.Field
            name="password"
            validators={{
              onChange: ({ value }) =>
                value.length < 6 ? t('common.validation.minPassword') : undefined,
            }}
            children={(field) => (
              <Field>
                <FieldLabel htmlFor={field.name}>{t('auth.signUp.passwordLabel')}</FieldLabel>
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
                <FieldLabel htmlFor={field.name}>{t('auth.signUp.confirmPasswordLabel')}</FieldLabel>
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
              disabled={form.state.isSubmitting || signUp.isPending}
            >
              {form.state.isSubmitting || signUp.isPending
                ? t('auth.signUp.submitting')
                : t('auth.signUp.submit')}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
