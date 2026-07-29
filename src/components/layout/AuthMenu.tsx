import { LoginButton } from "@/features/auth/components/LoginButton"
import { SignUpButton } from "@/features/auth/components/SignUpButton"
import { $auth } from "@/features/auth/store/authStore"
import { useStore } from "@nanostores/react"
import { useTranslation } from "react-i18next"
import { Separator } from "../ui/separator"
import { LogoutButton } from "@/features/auth/components/LogoutButton"
import { NavAvatar } from "./NavAvatar"

export const AuthMenu = () => {
    const auth = useStore($auth)
    const { t } = useTranslation()
    return (
        <div>
            {auth.status === 'loading' && <span>{t('common.loadingEllipsis')}</span>}

            {auth.status === 'unauthenticated' && (<>
                <div className="flex items-center gap-2">
                    <LoginButton />
                    <Separator orientation="vertical" />
                    <SignUpButton />
                </div>
            </>)}

            {auth.status === 'authenticated' && (
                <div className="flex items-center gap-2">
                    <NavAvatar />
                    <Separator orientation="vertical" />
                    <LogoutButton />
                </div>
            )}
        </div>
    )
}
