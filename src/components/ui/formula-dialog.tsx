import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { HelpCircle } from "lucide-react"
import { useTranslation } from "react-i18next"
import { Markdown } from "@/components/ui/markdown"

export function FormulaDialog() {
  const { t } = useTranslation()

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="cursor-pointer outline-none">
          <HelpCircle className="h-4 w-4 text-muted-foreground hover:text-muted-foreground/80" />
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-2xl outline-none max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>{t('gpuRequirements.vRAM.dialogTitle')}</DialogTitle>
        </DialogHeader>
        <div className="overflow-y-auto">
          <Markdown 
            content={t('gpuRequirements.vRAM.formula')} 
            enableMath 
          />
        </div>
      </DialogContent>
    </Dialog>
  )
} 