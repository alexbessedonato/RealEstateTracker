import { useNavigate } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";

export function LoginButton() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Button
      variant="outline"
      className="bg-blue-950 text-white"
      onClick={() => navigate({ to: "/login" })}
    >
      {t("layout.nav.login")}
    </Button>
  );
}
