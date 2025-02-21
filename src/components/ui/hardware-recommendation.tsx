import { useState, useMemo } from "react"
import { useTranslation } from "react-i18next"
import { GPU_SPECS } from "@/data/gpu-specs"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Check, ChevronsUpDown } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface HardwareRecommendationProps {
  requiredMemory: number // GB
}

interface GPUCalculation {
  efficiency: number
  remainingMemory: number
  totalMemory: number
  perCardMemory: number
  isInsufficient: boolean
}


const formatMemory = (gb: number) => {
  if (gb >= 1000) {
    return `${(gb / 1024).toFixed(1)} TB`
  }
  return `${gb.toFixed(1)} GB`
}

export function HardwareRecommendation({ requiredMemory }: HardwareRecommendationProps) {
  const { t } = useTranslation()
  const [selectedGPU, setSelectedGPU] = useState<string>("")
  const [gpuCount, setGpuCount] = useState<string>("1")
  const [open, setOpen] = useState(false)

  // 按厂商分组的显卡列表
  const groupedGPUs = useMemo(() => {
    return GPU_SPECS.reduce((acc, gpu) => {
      if (!acc[gpu.vendor]) {
        acc[gpu.vendor] = []
      }
      acc[gpu.vendor].push(gpu)
      return acc
    }, {} as Record<string, typeof GPU_SPECS>)
  }, [])

  // 计算结果
  const calculation = useMemo<GPUCalculation | null>(() => {
    if (!selectedGPU || requiredMemory <= 0) return null
    const gpu = GPU_SPECS.find(g => g.name === selectedGPU)
    if (!gpu) return null

    const count = parseInt(gpuCount || "1")
    const totalMemory = count * gpu.vram
    const efficiency = (requiredMemory / totalMemory) * 100
    return {
      efficiency: Math.min(efficiency, 100),
      remainingMemory: totalMemory - requiredMemory,
      totalMemory,
      perCardMemory: gpu.vram,
      isInsufficient: efficiency > 100
    }
  }, [selectedGPU, gpuCount, requiredMemory])

  // 处理显卡数量变更
  const handleCountChange = (value: string) => {
    // 允许空值
    if (value === "") {
      setGpuCount("")
      return
    }
    
    // 验证是否为正整数
    const count = parseInt(value)
    if (!isNaN(count) && count > 0) {
      setGpuCount(value)
    }
  }

  // 获取显卡显示名称
  const getGPUDisplayName = (gpu: { name: string; vram: number }) => {
    return `${gpu.name} · ${gpu.vram} GB`
  }

  // 获取完整的显卡显示名称（包含厂商）
  const getFullGPUDisplayName = (gpu: { vendor: string; name: string; vram: number }) => {
    return `${gpu.vendor} · ${gpu.name} · ${gpu.vram} GB`
  }

  // 获取内存状态类名
  const getMemoryStatusClassName = (calculation: GPUCalculation) => {
    if (calculation.isInsufficient) return "text-red-500/70 dark:text-red-400/70"
    return "text-muted-foreground"
  }

  // 获取利用率颜色
  const getEfficiencyColor = (efficiency: number) => {
    if (efficiency < 50) return "text-yellow-500 dark:text-yellow-400"
    if (efficiency >= 50 && efficiency < 70) return "text-green-500 dark:text-green-400"
    return "text-blue-500 dark:text-blue-400"
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-12 gap-6">
        {/* 显卡选择 */}
        <div className="col-span-4 space-y-3">
          <Label className="text-sm font-medium">
            {t('gpuRequirements.recommendation.gpuModel')}
          </Label>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                className={cn(
                  "w-full justify-between h-9",
                  !selectedGPU && "text-muted-foreground"
                )}
              >
                {selectedGPU ? (
                  <div className="flex items-center gap-2">
                    <span className="font-medium">
                      {getFullGPUDisplayName(GPU_SPECS.find(g => g.name === selectedGPU)!)}
                    </span>
                  </div>
                ) : (
                  t('gpuRequirements.recommendation.selectPlaceholder')
                )}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent 
              className="w-[var(--radix-popover-trigger-width)] p-0" 
              align="start"
              sideOffset={4}
            >
              <Command className="flex flex-col overflow-hidden rounded-md">
                <CommandInput 
                  placeholder={t('gpuRequirements.gpuInfo.searchPlaceholder')} 
                  className="h-11 flex-shrink-0 border-0 focus:ring-0 px-4"
                />
                <CommandList className="h-[280px] overflow-y-auto">
                  <CommandEmpty>{t('gpuRequirements.gpuInfo.noResults')}</CommandEmpty>
                  {Object.entries(groupedGPUs).map(([vendor, gpus]) => (
                    <CommandGroup key={vendor} heading={vendor} className="px-3 py-1">
                      {gpus.map((gpu) => (
                        <CommandItem
                          key={gpu.name}
                          value={gpu.name}
                          onSelect={(value) => {
                            setSelectedGPU(value)
                            setOpen(false)
                          }}
                          className="cursor-pointer py-2"
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              selectedGPU === gpu.name ? "opacity-100" : "opacity-0"
                            )}
                          />
                          <div className="flex items-center gap-2">
                            <span className="text-small">{getGPUDisplayName(gpu)}</span>
                            {gpu.disableInChina && (
                              <Badge variant="secondary" className="text-xs h-4 px-1 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400">
                                {t('gpuRequirements.recommendation.restricted')}
                              </Badge>
                            )}
                          </div>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  ))}
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>

        {/* 显卡数量 */}
        <div className="col-span-2 space-y-3">
          <div className="flex flex-col items-center justify-center"> 
            <Label className="text-sm font-medium">
              {t('gpuRequirements.recommendation.gpuCount')}
            </Label>
          </div>
          <Input
            type="number"
            min="1"
            value={gpuCount}
            onChange={(e) => handleCountChange(e.target.value)}
            className={cn(
              "h-9 text-right pr-3",
              calculation?.isInsufficient && "border-yellow-500 dark:border-yellow-400",
              !selectedGPU && "opacity-50"
            )}
            disabled={!selectedGPU}
            placeholder="1"
          />
        </div>

        {/* 内存利用率 */}
        <div className="col-span-2 space-y-3">
          <div className="flex flex-col items-center justify-center">
            <Label className="text-sm font-medium">
              {t('gpuRequirements.recommendation.efficiency')}
            </Label>
          </div>
          <div className="h-10 flex items-center justify-center">
            {calculation ? (
              <div className="text-center">
                {!calculation.isInsufficient && (
                  <span className={cn(
                    "text-lg font-medium",
                    getEfficiencyColor(calculation.efficiency)
                  )}>
                    {calculation.efficiency.toFixed(1)}%
                  </span>
                )}
              </div>
            ) : (
              <span className="text-sm text-muted-foreground font-medium">--</span>
            )}
          </div>
        </div>

        {/* 内存信息 */}
        <div className="col-span-4 space-y-3">
          <div className="flex flex-col items-center justify-center">
            <Label className="text-sm font-medium">
              {t('gpuRequirements.recommendation.memory')}
            </Label>
          </div>

          <div className="h-10 flex flex-col items-center justify-center">
            {calculation ? (
              <div className="text-right">
                <div className={cn(
                  "text-lg font-medium",
                  calculation.isInsufficient && "text-red-500/70 dark:text-red-400/70"
                )}>
                  {formatMemory(calculation.totalMemory)}
                  <span className="text-sm text-muted-foreground/80 ml-1">
                    ({calculation.perCardMemory} GiB × {gpuCount})
                  </span>
                </div>
                {calculation.remainingMemory !== 0 && (
                  <div className={cn(
                    "text-sm mt-0.5",
                    getMemoryStatusClassName(calculation)
                  )}>
                    {calculation.remainingMemory > 0 
                      ? `${t('gpuRequirements.recommendation.remaining')} ${formatMemory(calculation.remainingMemory)}`
                      : `${t('gpuRequirements.recommendation.insufficient')} ${formatMemory(Math.abs(calculation.remainingMemory))}`
                    }
                  </div>
                )}
              </div>
            ) : (
              <span className="text-sm text-muted-foreground font-medium mr-2">--</span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 