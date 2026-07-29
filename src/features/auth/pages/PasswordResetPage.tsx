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
import { usePasswordResetMutation } from "../hooks/mutations";
import { useNavigate } from "@tanstack/react-router";

export function PasswordResetPage() {
  const { t } = useTranslation();
  const dismissDialog = useDismissDialog("/");
  const navigate = useNavigate()
  const navigateToLanding = () => navigate({ to: "/"})
  const resetPassword = usePasswordResetMutation()

  const form = useForm({
    defaultValues: {
      email: "",
    },
    onSubmit: async ({ value }) => {
        await resetPassword.mutateAsync(value)
        navigateToLanding()
    },
  });

  return (
    <Dialog open={true} onOpenChange={(open) => !open && dismissDialog()}>
      <DialogContent className="sm:max-w-sm backdrop-blur-md bg-white/90">
        <DialogHeader>
          <DialogTitle className="mt-8 text-2xl font-bold text-center">
            {t('auth.passwordReset.title')}
          </DialogTitle>
          <DialogDescription className="text-center">
            {t('auth.passwordReset.description')}
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
                  type="email"
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

          <DialogFooter className="pt-4">
            <Button
              type="submit"
              className="w-full"
              disabled={form.state.isSubmitting}
            >
              {form.state.isSubmitting ? t('auth.passwordReset.submitting') : t('auth.passwordReset.submit')}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
