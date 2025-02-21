import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Footer } from "@/components/ui/Footer"
import { Header } from "@/components/ui/Header"
import { ChevronsDown } from "lucide-react"
import { ErrorBoundary } from 'react-error-boundary'
import { useTranslation } from "react-i18next"
import { HelpDialog } from "@/components/ui/help-dialog"
import { MODEL_SPECS, QUANTIZATION_TYPES } from "@/data/model-specs"
import React from "react"
import { useMemoryCalculation } from "@/hooks/use-memory-calculation"
import { clampNumber } from "@/lib/utils"
import { HardwareRecommendation } from "@/components/ui/hardware-recommendation"
import { VRAMCard } from "@/components/ui/vram-card"
import { ModelInfo } from "@/components/ui/model-info"

function ErrorFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-lg font-semibold">Something went wrong</h2>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-md"
        >
          Reload page
        </button>
      </div>
    </div>
  )
}

export default function App() {
  const { t } = useTranslation()
  const [selectedModel, setSelectedModel] = React.useState<string>("")
  const [modelParams, setModelParams] = React.useState({
    param_billions: "",
    num_hidden_layers: "",
    num_dimensions: "",
    quantization_type: "BF16",
    quantization_bits: QUANTIZATION_TYPES["BF16"]?.bits || 16
  })

  // 添加并发参数的状态
  const [concurrentParams, setConcurrentParams] = React.useState({
    num_concurrent_users: "10",
    avg_sequence_tokens: "2048"
  })

  const handleModelChange = (modelName: string) => {
    const model = MODEL_SPECS.find(m => m.model_name === modelName)
    setSelectedModel(modelName)
    if (model) {
      const quantizationBits = QUANTIZATION_TYPES[model.quantization_type]?.bits || 0
      console.log('Selected quantization type:', model.quantization_type)
      
      setModelParams({
        param_billions: String(model.param_billions),
        num_hidden_layers: String(model.num_hidden_layers),
        num_dimensions: String(model.num_dimensions),
        quantization_type: model.quantization_type,
        quantization_bits: quantizationBits
      })
    }
  }

  const handleQuantizationChange = (type: string) => {
    setModelParams(prev => ({
      ...prev,
      quantization_type: type,
      quantization_bits: QUANTIZATION_TYPES[type]?.bits || 0
    }))
  }

  const handleModelParamChange = (
    field: keyof typeof modelParams,
    value: string,
    min: number = 0
  ) => {
    const numValue = clampNumber(Number(value), min)
    setModelParams(prev => ({
      ...prev,
      [field]: numValue || ""
    }))
  }

  const handleConcurrentParamChange = (
    field: keyof typeof concurrentParams,
    value: string,
    min: number = 0,
    max: number
  ) => {
    const numValue = clampNumber(Number(value), min, max)
    setConcurrentParams(prev => ({
      ...prev,
      [field]: numValue ? String(numValue) : ""
    }))
  }

  console.log('Current quantization type:', modelParams.quantization_type)

  const { modelMemory, kvCacheMemory, overheadMemory, totalMemory } = useMemoryCalculation({
    paramBillions: Number(modelParams.param_billions) || 0,
    numHiddenLayers: Number(modelParams.num_hidden_layers) || 0,
    numDimensions: Number(modelParams.num_dimensions) || 0,
    quantizationBits: modelParams.quantization_bits,
    concurrentUsers: Number(concurrentParams.num_concurrent_users) || 0,
    avgSequenceTokens: Number(concurrentParams.avg_sequence_tokens) || 0
  })

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="container mx-auto p-4 sm:p-6 space-y-8 flex-1">
          {/* First Section */}
          <div className="grid grid-cols-12 gap-4">
            <div className="hidden lg:block lg:col-span-2" />
            <div className="col-span-12 lg:col-span-8">
              <div className="grid grid-cols-7 gap-4">
                {/* Model Params - spans 5 columns */}
                <ModelInfo
                  className="col-span-5"
                  modelName={selectedModel}
                  setModelName={handleModelChange}
                  modelParams={modelParams}
                  onModelParamChange={handleModelParamChange}
                  onQuantizationChange={handleQuantizationChange}
                />

                {/* Concurrent Requirements - spans 2 columns */}
                <Card className="col-span-2">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                    <CardTitle>{t('concurrentRequirements.title')}</CardTitle>
                    <HelpDialog 
                      title={t('concurrentRequirements.title')}
                      content={t('concurrentRequirements.helpContent')}
                    />
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="concurrent-users">
                        {t('concurrentRequirements.concurrentUsers.label')}
                      </Label>
                      <Input 
                        id="concurrent-users" 
                        type="number"
                        min="0"
                        max="10000"
                        value={concurrentParams.num_concurrent_users}
                        onChange={(e) => handleConcurrentParamChange('num_concurrent_users', e.target.value, 0, 10000)}
                        placeholder={t('concurrentRequirements.concurrentUsers.placeholder')} 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="avg-context-tokens">
                        {t('concurrentRequirements.avgContextTokens.label')}
                      </Label>
                      <Input 
                        id="avg-context-tokens" 
                        type="number"
                        min="0"
                        max="128000"
                        value={concurrentParams.avg_sequence_tokens}
                        onChange={(e) => handleConcurrentParamChange('avg_sequence_tokens', e.target.value, 0, 128000)}
                        placeholder={t('concurrentRequirements.avgContextTokens.placeholder')} 
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
            <div className="hidden lg:block lg:col-span-2" />
          </div>

          {/* First Divider */}
          <div className="grid grid-cols-12">
            <div className="hidden lg:block lg:col-span-2" />
            <div className="col-span-12 lg:col-span-8 relative">
              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2">
                <div className="border-t border-border" />
              </div>
              <div className="relative flex justify-center">
                <div className="bg-background px-2">
                  <ChevronsDown className="h-4 w-4 text-muted-foreground" />
                </div>
              </div>
            </div>
            <div className="hidden lg:block lg:col-span-2" />
          </div>

          {/* vRAM Requirements Section */}
          <div className="grid grid-cols-12 gap-6">
            <div className="hidden lg:block lg:col-span-2" />
            <div className="col-span-12 lg:col-span-8">
              <VRAMCard
                totalMemory={totalMemory}
                modelMemory={modelMemory}
                kvCacheMemory={kvCacheMemory}
                overheadMemory={overheadMemory}
              />
            </div>
            <div className="hidden lg:block lg:col-span-2" />
          </div>

          {/* Second Divider */}
          <div className="grid grid-cols-12">
            <div className="hidden lg:block lg:col-span-2" />
            <div className="col-span-12 lg:col-span-8 relative">
              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2">
                <div className="border-t border-border" />
              </div>
              <div className="relative flex justify-center">
                <div className="bg-background px-2">
                  <ChevronsDown className="h-4 w-4 text-muted-foreground" />
                </div>
              </div>
            </div>
            <div className="hidden lg:block lg:col-span-2" />
          </div>

          {/* Hardware Reference Section */}
          <div className="grid grid-cols-12 gap-4">
            <div className="hidden lg:block lg:col-span-2" />
            <div className="col-span-12 lg:col-span-8">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                  <CardTitle>{t('gpuRequirements.gpuInfo.title')}</CardTitle>
                  <HelpDialog 
                    title={t('gpuRequirements.gpuInfo.title')}
                    content={t('gpuRequirements.gpuInfo.helpContent')}
                  />
                </CardHeader>
                <CardContent className="space-y-6">
                  <HardwareRecommendation requiredMemory={totalMemory} />
                </CardContent>
              </Card>
            </div>
            <div className="hidden lg:block lg:col-span-2" />
          </div>
        </main>
        <Footer />
      </div>
    </ErrorBoundary>
  )
}