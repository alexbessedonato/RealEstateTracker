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
import { useLoginMutation } from "../hooks/mutations";

export function LoginPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dismissDialog = useDismissDialog("/");
  const navigateToDashboard = () => navigate({ to: "/dashboard", replace: true});
  const navigateToPasswordReset = () => navigate({ to: "/password-reset"});
  const login = useLoginMutation();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      await login.mutateAsync(value);
      navigateToDashboard();
    },
  });

  return (
    <Dialog open={true} onOpenChange={(open) => !open && dismissDialog()}>
      <DialogContent className="sm:max-w-sm backdrop-blur-md bg-white/90">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">{t('auth.login.title')}</DialogTitle>
          <DialogDescription className="text-center">
            {t('auth.login.description')}
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
                  placeholder={t('common.placeholders.email')}
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
                <FieldLabel htmlFor={field.name}>{t('auth.login.passwordLabel')}</FieldLabel>
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
              disabled={form.state.isSubmitting || login.isPending}
            >
              {form.state.isSubmitting || login.isPending
                ? t('auth.login.submitting')
                : t('auth.login.submit')}
            </Button>
          </DialogFooter>
        </form>
        
        <Button
              variant="link"
              className="w-full"
              onClick={navigateToPasswordReset}
              
            >
              {t('auth.login.forgotPassword')}
            </Button>
      </DialogContent>
    </Dialog>
  );
}
