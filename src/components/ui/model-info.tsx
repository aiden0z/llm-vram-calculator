import { useTranslation } from "react-i18next"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { HelpDialog } from "./help-dialog"
import { MODEL_SPECS, QUANTIZATION_TYPES } from "@/data/model-specs"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

interface ModelParams {
  param_billions: string
  num_hidden_layers: string
  num_dimensions: string
  quantization_type: string
  quantization_bits: number
}

interface ModelInfoProps {
  modelName: string
  setModelName: (value: string) => void
  modelParams: ModelParams
  onModelParamChange: (
    field: keyof ModelParams,
    value: string,
    min?: number
  ) => void
  onQuantizationChange: (type: string) => void
  className?: string
}

export function ModelInfo({
  modelName,
  setModelName,
  modelParams,
  onModelParamChange,
  onQuantizationChange,
  className
}: ModelInfoProps) {
  const { t } = useTranslation()

  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle>{t('modelParams.title')}</CardTitle>
        <HelpDialog
          title={t('modelParams.title')}
          content={t('modelParams.helpContent')}
        />
      </CardHeader>
      <CardContent className="space-y-4 pt-0">
        {/* Model Name */}
        <div className="space-y-1.5">
          <Label htmlFor="model-name">
            {t('modelParams.modelName.label')}
          </Label>
          <Select value={modelName} onValueChange={setModelName}>
            <SelectTrigger id="model-name" className="w-full">
              <SelectValue placeholder={t('modelParams.modelName.placeholder')} />
            </SelectTrigger>
            <SelectContent>
              {MODEL_SPECS.map(model => (
                <SelectItem key={model.model_name} value={model.model_name}>
                  {model.model_name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Model Parameters */}
        <div className="grid grid-cols-12 gap-3">
          <div className="col-span-4 space-y-1.5">
            <Label htmlFor="param-billions">
              {t('modelParams.paramBillions.label')}
            </Label>
            <Input
              id="param-billions"
              type="number"
              min="0"
              value={modelParams.param_billions}
              onChange={(e) => onModelParamChange('param_billions', e.target.value, 0)}
              placeholder={t('modelParams.paramBillions.placeholder')}
            />
          </div>

          <div className="col-span-4 space-y-1.5">
            <Label htmlFor="num-layers">
              {t('modelParams.numLayers.label')}
            </Label>
            <Input
              id="num-layers"
              type="number"
              min="0"
              value={modelParams.num_hidden_layers}
              onChange={(e) => onModelParamChange('num_hidden_layers', e.target.value, 0)}
            />
          </div>

          <div className="col-span-4 space-y-1.5">
            <Label htmlFor="dimensions">
              {t('modelParams.dimensions.label')}
            </Label>
            <Input
              id="dimensions"
              type="number"
              min="0"
              value={modelParams.num_dimensions}
              onChange={(e) => onModelParamChange('num_dimensions', e.target.value, 0)}
            />
          </div>
        </div>

        {/* Quantization Type */}
        <div className="grid grid-cols-12 items-center gap-2">
          <Label className="col-span-3">
            {t('modelParams.quantization.label')}
          </Label>
          <ToggleGroup
            type="single"
            value={modelParams.quantization_type}
            onValueChange={onQuantizationChange}
            className="col-span-9 flex flex-wrap gap-1.5"
          >
            {Object.entries(QUANTIZATION_TYPES).map(([type, info]) => (
              <ToggleGroupItem
                key={type}
                value={type}
                className="px-2 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
                aria-label={`${type} (${info.bits} bits)`}
              >
                {type}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>
      </CardContent>
    </Card>
  )
} 