import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useTranslation } from "react-i18next"
import { MemoryVisualization } from "./memory-visualization"
import { FormulaDialog } from "./formula-dialog"
import { CopyButton } from "./copy-button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface VRAMCardProps {
  totalMemory: number
  modelMemory: number
  kvCacheMemory: number
  overheadMemory: number
}

export function VRAMCard({
  totalMemory,
  modelMemory,
  kvCacheMemory,
  overheadMemory,
}: VRAMCardProps) {
  const { t } = useTranslation()

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-baseline gap-2">
          <CardTitle>{t('gpuRequirements.vRAM.title')}</CardTitle>
          <span className="text-sm text-muted-foreground">(GiB)</span>
        </div>
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <div>
                <FormulaDialog />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>{t('gpuRequirements.vRAM.tooltipHint')}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="grid grid-cols-2 gap-3">
          {/* Total Memory */}
          <div className="space-y-2">
            {/* Total Memory Value */}
            <div className="p-2 bg-muted rounded-lg relative">
              <div className="flex items-baseline justify-center">
                <p className="text-2xl font-bold">{totalMemory.toFixed(2)}</p>
              </div>
              <p className="text-sm text-muted-foreground text-center mt-1">
                {t('gpuRequirements.vRAM.memoryTypes.total')}
              </p>
              <CopyButton value={totalMemory.toFixed(2)} />
            </div>

            {/* Sub Memory Values */}
            <div className="grid grid-cols-3 gap-2">
              <div className="p-2 bg-blue-500/25 hover:bg-blue-500/35 dark:bg-blue-400/25 dark:hover:bg-blue-400/35 transition-all rounded-lg">
                <div className="flex items-baseline justify-center">
                  <p className="text-lg font-bold">{modelMemory.toFixed(2)}</p>
                </div>
                <p className="text-xs text-muted-foreground text-center mt-1">
                  {t('gpuRequirements.vRAM.memoryTypes.model')}
                </p>
              </div>

              <div className="p-2 bg-rose-500/25 hover:bg-rose-500/35 dark:bg-rose-400/25 dark:hover:bg-rose-400/35 transition-all rounded-lg">
                <div className="flex items-baseline justify-center">
                  <p className="text-lg font-bold">{overheadMemory.toFixed(2)}</p>
                </div>
                <p className="text-xs text-muted-foreground text-center mt-1">
                  {t('gpuRequirements.vRAM.memoryTypes.overhead')}
                </p>
              </div>

              <div className="p-2 bg-violet-500/25 hover:bg-violet-500/35 dark:bg-violet-400/25 dark:hover:bg-violet-400/35 transition-all rounded-lg">
                <div className="flex items-baseline justify-center">
                  <p className="text-lg font-bold">{kvCacheMemory.toFixed(2)}</p>
                </div>
                <p className="text-xs text-muted-foreground text-center mt-1">
                  {t('gpuRequirements.vRAM.memoryTypes.kvCache')}
                </p>
              </div>
            </div>
          </div>

          {/* Memory Visualization */}
          <div className="bg-muted rounded-lg p-0.5">
            <MemoryVisualization
              modelMemory={modelMemory}
              kvCacheMemory={kvCacheMemory}
              overheadMemory={overheadMemory}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 