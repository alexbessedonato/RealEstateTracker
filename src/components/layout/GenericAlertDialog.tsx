import { useTranslation } from "react-i18next"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "../ui/alert-dialog"

export const GenericAlertDialog = ({
  title, 
  description, 
  onConfirm, 
  onCancel, 
  open, 
  onOpenChange,
  isPending
}: {title: string, description: string, onConfirm: () => void, onCancel: () => void, open: boolean, onOpenChange: (open: boolean) => void, isPending?: boolean}) => {
  const { t } = useTranslation()
    
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending} onClick={onCancel}>{t('common.cancel')}</AlertDialogCancel>
          <AlertDialogAction disabled={isPending} variant="destructive" onClick={
            async (e) => {
              e.preventDefault();
              await onConfirm();
            }
            }>
              {isPending ? t('common.deleting') : t('common.confirm')}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
    );
};
