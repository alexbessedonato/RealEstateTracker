import { useNavigate } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";

export function SignUpButton() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Button variant="outline" onClick={() => navigate({ to: "/signup" })}>
      {t("layout.nav.signUp")}
    </Button>
  );
}
