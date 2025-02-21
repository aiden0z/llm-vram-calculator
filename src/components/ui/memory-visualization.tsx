import { useRef } from "react"
import { useTranslation } from "react-i18next"
import { cn } from "@/lib/utils"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface MemoryVisualizationProps extends React.HTMLAttributes<HTMLDivElement> {
  modelMemory: number
  kvCacheMemory: number
  overheadMemory: number
}

export function MemoryVisualization({
  modelMemory,
  kvCacheMemory,
  overheadMemory,
  className,
  ...props
}: MemoryVisualizationProps) {
  const { t } = useTranslation()
  const containerRef = useRef<HTMLDivElement>(null)
  const totalMemory = modelMemory + kvCacheMemory + overheadMemory

  const data = [
    {
      name: t("gpuRequirements.vRAM.memoryTypes.model"),
      value: modelMemory,
      color: "bg-blue-500/25 hover:bg-blue-500/35 dark:bg-blue-400/25 dark:hover:bg-blue-400/35"
    },
    {
      name: t("gpuRequirements.vRAM.memoryTypes.overhead"),
      value: overheadMemory,
      color: "bg-rose-500/25 hover:bg-rose-500/35 dark:bg-rose-400/25 dark:hover:bg-rose-400/35"
    },
    {
      name: t("gpuRequirements.vRAM.memoryTypes.kvCache"),
      value: kvCacheMemory,
      color: "bg-violet-500/25 hover:bg-violet-500/35 dark:bg-violet-400/25 dark:hover:bg-violet-400/35"
    }
  ].filter(item => item.value > 0)

  if (totalMemory === 0) {
    return <div ref={containerRef} className={cn("w-full h-full", className)} {...props} />
  }

  return (
    <div ref={containerRef} className={cn("w-full h-full", className)} {...props}>
      <TooltipProvider>
        <div className="w-full h-full flex">
          {data.map((item, i) => {
            const percentage = (item.value / totalMemory) * 100
            return (
              <Tooltip key={i} delayDuration={0}>
                <TooltipTrigger asChild>
                  <div
                    className={cn(
                      "h-full flex items-center justify-center relative cursor-default",
                      item.color,
                      "transition-all duration-200",
                      i > 0 && "border-l border-border/5"
                    )}
                    style={{ 
                      width: `${percentage}%`,
                      borderTopLeftRadius: i === 0 ? "0.5rem" : "0",
                      borderBottomLeftRadius: i === 0 ? "0.5rem" : "0",
                      borderTopRightRadius: i === data.length - 1 ? "0.5rem" : "0",
                      borderBottomRightRadius: i === data.length - 1 ? "0.5rem" : "0"
                    }}
                  >
                    <span 
                      className={cn(
                        "text-xs font-medium select-none whitespace-nowrap",
                        percentage < 8 
                          ? cn(
                              "absolute left-1/2 -translate-x-1/2 -bottom-5",
                              item.color.includes("blue") && "text-blue-500/90 dark:text-blue-400/90",
                              item.color.includes("violet") && "text-violet-500/90 dark:text-violet-400/90",
                              item.color.includes("rose") && "text-rose-500/90 dark:text-rose-400/90"
                            )
                          : "text-foreground/90"
                      )}
                    >
                      {percentage.toFixed(1)}%
                    </span>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <div className="flex flex-col items-center gap-1">
                    <p className="text-base font-bold text-foreground">
                      {item.value.toFixed(2)} GB
                    </p>
                    <p className="text-xs text-muted-foreground/80">
                      {item.name}
                    </p>
                  </div>
                </TooltipContent>
              </Tooltip>
            )
          })}
        </div>
      </TooltipProvider>
    </div>
  )
} 