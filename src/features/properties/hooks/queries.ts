import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { addProperty, deleteProperty, editProperty, getProperties } from "../api/properties";
import type { PropertyEditInput, PropertyFormValues } from "../types";
import { PROPERTIES_QUERY_KEY } from "../constants/propertiesQueryKey";
import { FINANCIALS_QUERY_KEY } from "@/features/financials/constants/financialsQueryKey";
import { TENANTS_QUERY_KEY } from "@/features/tenants/constants/tenantsQueryKey";
import { useStore } from "@nanostores/react";
import { $auth } from "@/features/auth/store/authStore";
import i18n from "@/i18n.js";

export const usePropertiesQuery = () => {
  const { status } = useStore($auth);
  return useQuery({
    queryKey: PROPERTIES_QUERY_KEY,
    queryFn: getProperties,
    enabled: status === "authenticated",
  });
};

export const useDeletePropertyMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (propertyId: string) => deleteProperty(propertyId),
    onSuccess: () => {
      toast.success(i18n.t("properties.toasts.deleteSuccess"))
      queryClient.invalidateQueries({ queryKey: PROPERTIES_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: FINANCIALS_QUERY_KEY});
      queryClient.invalidateQueries({ queryKey: TENANTS_QUERY_KEY});
    },
    onError: (error: unknown) => {
      toast.error(i18n.t("properties.toasts.deleteError"), {description: getErrorMessage(error)})
    }
  })

}

export const useEditPropertyMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (property: PropertyEditInput) => editProperty(property),
    onSuccess: () => {
      toast.success(i18n.t("properties.toasts.updateSuccess"));
      queryClient.invalidateQueries({ queryKey: PROPERTIES_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: FINANCIALS_QUERY_KEY});

    },
    onError: (error: unknown) => {
      toast.error(i18n.t("properties.toasts.updateError"), {
        description: getErrorMessage(error),
      });
    },
  });
};

export const useAddPropertyMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (property: PropertyFormValues) => addProperty(property),
    onSuccess: () => {
      toast.success(i18n.t("properties.toasts.addSuccess"));
      queryClient.invalidateQueries({ queryKey: PROPERTIES_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: FINANCIALS_QUERY_KEY});
    },
    onError: (error: unknown) => {
      toast.error(i18n.t("properties.toasts.addError"), {
        description: getErrorMessage(error),
      });
    },
  });
};
