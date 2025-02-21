import { Copy } from "lucide-react"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface CopyButtonProps {
  value: string
}

export function CopyButton({ value }: CopyButtonProps) {
  const { t } = useTranslation()
  const [showTooltip, setShowTooltip] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value)
      setShowTooltip(true)
      // 重置 tooltip 状态，以便下次点击时能再次触发
      setTimeout(() => setShowTooltip(false), 1000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <TooltipProvider>
      <Tooltip open={showTooltip}>
        <TooltipTrigger asChild>
          <button
            onClick={handleCopy}
            className="absolute bottom-2 right-2 p-1 rounded-md hover:bg-background/80 transition-colors"
          >
            <Copy className="h-4 w-4 text-muted-foreground" />
          </button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{t('gpuRequirements.vRAM.copyButton.copied')}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
} 