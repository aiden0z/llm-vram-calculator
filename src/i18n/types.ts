export interface Translation {
  title: string
  description: string
  modelParams: {
    title: string
    helpContent: string
    modelName: {
      label: string
      placeholder: string
    }
    numLayers: {
      label: string
    }
    dimensions: {
      label: string
    }
    quantization: {
      label: string
      placeholder: string
    }
    paramBillions: {
      label: string
      placeholder: string
    }
  },
  concurrentRequirements: {
    title: string
    helpContent: string
    concurrentUsers: {
      label: string
      placeholder: string
    }
    avgContextTokens: {
      label: string
      placeholder: string
    }
  }
  gpuRequirements: {
    vRAM: {
      title: string
      dialogTitle: string
      tooltipHint: string
      formula: string
      estimatedMemory: {
        label: string
        calculating: string
        description: string
      }
      memoryTypes: {
        total: string
        model: string
        kvCache: string
        overhead: string
      }
      copyButton: {
        tooltip: string
        copied: string
      }
    }
    gpuInfo: {
      title: string
      helpContent: string
      searchPlaceholder: string
      noResults: string
      gpuMemory: {
        label: string
        placeholder: string
      }
      gpuCount: {
        label: string
        placeholder: string
      }
    }
    recommendation: {
      title: string
      required: string
      efficiency: string
      restricted: string
      selectPlaceholder: string
      gpuModel: string
      gpuCount: string
      memory: string
      maxGPUsLimit: string
      insufficient: string
      remaining: string
      memoryInsufficient: string
    }
  }
  theme: {
    light: string
    dark: string
    system: string
  }
  language: {
    zh: string
    en: string
    toggle: string
  }
  changelog: {
    title: string
  }
} 