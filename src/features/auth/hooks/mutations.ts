import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import i18n from "@/i18n.js";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { loginWithEmail, logout, resetPassword, signUpWithEmail, updatePassword } from "../api/auth";
import type {
  LoginFormValues,
  PasswordResetFormValues,
  SignUpFormValues,
} from "../types";

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: (values: LoginFormValues) => loginWithEmail(values),
    onSuccess: () => {
      toast.success(i18n.t('auth.toasts.loginSuccess'));
    },
    onError: (error: unknown) => {
      toast.error(i18n.t('auth.toasts.loginError'), {
        description: getErrorMessage(error),
      });
    },
  });
};

export const useSignUpMutation = () => {
  return useMutation({
    mutationFn: (values: SignUpFormValues) => signUpWithEmail(values),
    onSuccess: () => {
      toast.success(i18n.t('auth.toasts.signUpSuccess'));
    },
    onError: (error: unknown) => {
      toast.error(i18n.t('auth.toasts.signUpError'), {
        description: getErrorMessage(error),
      });
    },
  });
};

export const useLogoutMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.removeQueries();
      toast.success(i18n.t('auth.toasts.logoutSuccess'));
    },
    onError: (error: unknown) => {
      toast.error(i18n.t('auth.toasts.logoutError'), {
        description: getErrorMessage(error),
      });
    },
  });
};

export const usePasswordResetMutation = () => {
  return useMutation({
    mutationFn: (values: PasswordResetFormValues) => resetPassword(values),
    onSuccess: () => {
      toast.success(i18n.t('auth.toasts.passwordResetSuccess'))
    },
    onError: (error: unknown) => {
      toast.error(i18n.t('auth.toasts.passwordResetError'), {
        description: getErrorMessage(error)
      })
    }
  })
}

export const usePasswordUpdateMutation = () => {
  return useMutation({
    mutationFn: (values: string) => updatePassword(values),
    onSuccess: () => {
      toast.success(i18n.t('auth.toasts.passwordUpdateSuccess'))
    },
    onError: (error: unknown)=> {
      toast.error(i18n.t('auth.toasts.passwordUpdateError'), {
        description: getErrorMessage(error)
      })
    }
  })
}
