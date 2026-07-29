import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { useTranslation } from 'react-i18next'
import './index.css'
import App from './app/App.tsx'
import { setAuth } from './features/auth/store/authStore.ts'
import { supabase } from './lib/supabaseClient.ts'
import "./i18n"

supabase.auth.onAuthStateChange((_event, session) => {
  setAuth(session?.user ?? null)
})

function LoadingFallback() {
  const { t } = useTranslation()
  return <>{t('common.loading')}</>
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Suspense fallback={<LoadingFallback />}>
    <App />
    </Suspense>
  </StrictMode>,
)
