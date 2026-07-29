import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useStore } from "@nanostores/react";
import { toast } from "sonner";
import { $auth } from "@/features/auth/store/authStore";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { addTenant, deleteTenant, editTenant, getTenants } from "../api/tenants";
import type { AddTenantInput, TenantEditInput } from "../types";
import { TENANTS_QUERY_KEY } from "../constants/tenantsQueryKey";
import { PROPERTIES_QUERY_KEY } from "@/features/properties/constants/propertiesQueryKey";
import i18n from "@/i18n.js";

export const useTenantsQuery = () => {
  const { status } = useStore($auth);
  return useQuery({
    queryKey: TENANTS_QUERY_KEY,
    queryFn: getTenants,
    enabled: status === "authenticated",
  });
};

export const useAddTenantMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (tenant: AddTenantInput) => addTenant(tenant),
    onSuccess: () => {
      toast.success(i18n.t("tenants.toasts.addSuccess"));
      queryClient.invalidateQueries({ queryKey: TENANTS_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: PROPERTIES_QUERY_KEY });
    },
    onError: (error: unknown) => {
      toast.error(i18n.t("tenants.toasts.addError"), {
        description: getErrorMessage(error),
      });
    },
  });
};

export const useEditTenantMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (tenant: TenantEditInput) => editTenant(tenant),
    onSuccess: () => {
      toast.success(i18n.t("tenants.toasts.updateSuccess"));
      queryClient.invalidateQueries({ queryKey: TENANTS_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: PROPERTIES_QUERY_KEY });
    },
    onError: (error: unknown) => {
      toast.error(i18n.t("tenants.toasts.updateError"), {
        description: getErrorMessage(error),
      });
    },
  });
};

export const useDeleteTenantMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (tenantId: string) => deleteTenant(tenantId),
    onSuccess: () => {
      toast.success(i18n.t("tenants.toasts.deleteSuccess"));
      queryClient.invalidateQueries({ queryKey: TENANTS_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: PROPERTIES_QUERY_KEY });
    },
    onError: (error: unknown) => {
      toast.error(i18n.t("tenants.toasts.deleteError"), {
        description: getErrorMessage(error),
      });
    },
  });
};
