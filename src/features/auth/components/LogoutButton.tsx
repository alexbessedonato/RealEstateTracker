import { Button } from "@/components/ui/button";
import { useLogoutMutation } from "../hooks/mutations";
import { useNavigate } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

export function LogoutButton() {
  const logout = useLogoutMutation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const navigateToLanding = () => navigate({ to: "/", replace: true });
  return (
    <Button
      variant="outline"
      className="bg-blue-950 text-white"
      onClick={() => {
        logout
        .mutateAsync()
        .then(navigateToLanding)
        .catch(()=>{})
        
      }}
      disabled={logout.isPending}
    >
      {logout.isPending ? t("layout.nav.loggingOut") : t("layout.nav.logout")}
    </Button>
  );
}
