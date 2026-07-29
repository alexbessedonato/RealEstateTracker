import { useTranslation } from "react-i18next"

export const Logo = () => {
    const { t } = useTranslation()
    return (
        <div className="flex items-center gap-2">
            <img
                src="/GeminiLogo.png"
                alt={t('layout.logoAlt')}
                style={{ height: '40px', width: 'auto' }}
            />
        </div>
    )
}
