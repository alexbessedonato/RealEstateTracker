import i18n from "@/i18n.js"

export const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) return error.message
  if (typeof error === "string") return error
  return i18n.t('common.unexpectedError')
}
