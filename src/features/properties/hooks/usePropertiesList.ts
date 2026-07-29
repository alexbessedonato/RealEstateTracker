import { toast } from "sonner";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { getSignedUrl } from "../api/properties";
import { usePropertiesQuery } from "./queries";
import i18n from "@/i18n.js";

export const usePropertiesList = () => {
  const { data: properties = [] } = usePropertiesQuery();

  const handleOpenFile = async (filePath: string) => {
    try {
      const signedUrl = await getSignedUrl(filePath);
      window.open(signedUrl, "_blank", "noopener,noreferrer");
    } catch (err: unknown) {
      toast.error(i18n.t("properties.toasts.signedUrlError"), {
        description: getErrorMessage(err),
      });
    }
  };

  return {
    properties,
    handleOpenFile,
  };
};
