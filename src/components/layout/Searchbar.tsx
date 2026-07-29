import { Input } from "@/components/ui/input"
import { useTranslation } from "react-i18next"

export const Searchbar = () => {
    const { t } = useTranslation()
    return (
        <Input placeholder={t('layout.searchPlaceholder')} className="text-blue-950 border-blue-950/20 placeholder-blue-950" />
    )
}
