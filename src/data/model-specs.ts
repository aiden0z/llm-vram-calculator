export interface ModelSpec {
  model_name: string
  param_billions: number
  num_hidden_layers: number
  num_dimensions: number
  quantization_type: string
}

export const MODEL_SPECS: ModelSpec[] = [
  {
    model_name: "DeepSeek-R1-671B",
    param_billions: 671,
    num_hidden_layers: 61,
    num_dimensions: 7168,
    quantization_type: "FP8"
  },
  {
    model_name: "DeepSeek-R1-Distill-Llama-70B",
    param_billions: 70,
    num_hidden_layers: 80,
    num_dimensions: 8192,
    quantization_type: "BF16"
  },
  {
    model_name: "DeepSeek-R1-Distill-Qwen-32B",
    param_billions: 32,
    num_hidden_layers: 64,
    num_dimensions: 5120,
    quantization_type: "BF16"
  },
  {
    model_name: "DeepSeek-R1-Distill-Qwen-14B",
    param_billions: 14,
    num_hidden_layers: 48,
    num_dimensions: 5120,
    quantization_type: "BF16"
  },
  {
    model_name: "DeepSeek-R1-Distill-Llama-8B",
    param_billions: 8,
    num_hidden_layers: 32,
    num_dimensions: 4096,
    quantization_type: "BF16"
  },
  {
    model_name: "DeepSeek-R1-Distill-Qwen-7B",
    param_billions: 7,
    num_hidden_layers: 32,
    num_dimensions: 3584,
    quantization_type: "BF16"
  },
  {
    model_name: "DeepSeek-R1-Distill-Qwen-1.5B",
    param_billions: 1.5,
    num_hidden_layers: 28,
    num_dimensions: 1536,
    quantization_type: "BF16"
  },
  {
    model_name: "Other",
    param_billions: 0,
    num_hidden_layers: 0,
    num_dimensions: 0,
    quantization_type: "BF16"
  },
]

export interface QuantizationType {
  type: string
  bits: number
}

export const QUANTIZATION_TYPES: Record<string, QuantizationType> = {
  "FP32": { type: "FP32", bits: 32 },
  "BF16": { type: "FP16", bits: 16 },
  "FP16": { type: "FP16", bits: 16 },
  "BF8": { type: "BF8", bits: 8 },
  "FP8": { type: "FP8", bits: 8 },
  "INT4": { type: "INT4", bits: 4 },
  "Q4": { type: "Q4", bits: 4 },
} 