import type { Translation } from '../types'

export const en: Translation = {
  title: "LLM vRAM Calculator",
  description: "How much vRAM does LLM require for 100 concurrent users?? 🧮 🚀",
  modelParams: {
    title: "Model Information",
    modelName: {
      label: "Model",
      placeholder: "Select a model"
    },
    numLayers: {
      label: "Transformer Layers"
    },
    dimensions: {
      label: "Model Dimensions"
    },
    quantization: {
      label: "Quantization Type",
      placeholder: "Select quantization type"
    },
    paramBillions: {
      label: "Model Parameters (B)",
      placeholder: ""
    },
    helpContent: `
#### How LLM Use Memory

The memory usage of Transformer large models can be estimated through model parameters (weights) memory, KV Cache, activation memory, and system overhead. Specifically:

* **Model Parameters (Weights) Memory**: Memory occupied by the model parameters themselves, proportional to the model parameter count.
* **KV Cache**: Cache used for storing and accelerating the self-attention mechanism, proportional to the number of Transformer layers (i.e., Block count), and related to model dimension, quantization type, sequence length, and concurrency.

The above two types of memory can be estimated based on model parameters and concurrency needs. **Activation memory and system overhead are estimated at 10% ~ 20% of the memory occupied by the model parameters themselves, and we will use 20% as an empirical value for calculation.**

For most models, their Transformer layer count, model dimensions, and other parameter information can be found on huggingface. For example, in the [DeepSeek-R1 model configuration file](https://huggingface.co/deepseek-ai/DeepSeek-R1/blob/main/config.json):

- Transformer layer count corresponds to the **num_hidden_layers** parameter
- Model dimension information corresponds to the **hidden_size** parameter

#### Parameter Description

This application has pre-configured official model parameters for DeepSeek-R1. To calculate for other models, select the **Other** option, then input the model parameters (B), Transformer layers, model dimensions, quantization type, and other parameters.

* **Model Parameter Count (B)**: Defines the size of the language model, similar to the "knowledge capacity" in the brain. B represents billion, for example, 14B means the model contains 14 billion parameters. The larger the parameter count, the stronger the model's knowledge reserve and processing capability usually is.
* **Transformer Layers**: The number of core processing units inside the language model, each layer performs deep understanding and processing of input text. Similar to breaking down a complex problem into multiple steps for thinking, more layers mean deeper understanding and processing of text by the model.
* **Model Dimension**: Represents the feature capacity when the language model processes text, determining the depth of understanding for each word. Similar to how many features the brain can remember about one thing simultaneously, larger dimensions mean richer text expression and understanding by the model.
* **Quantization Type**: Used to compress storage and computational resources required for running while maintaining model capabilities, different quantization types represent different compression levels:
  * **FP32**: 32 bits, IEEE 754 standard single-precision floating-point format, the most basic standard precision format. Like using a full-resolution camera, it provides the most accurate calculations, widely used in high-performance computing, graphics rendering, and deep learning training. While highly precise, it requires the most storage and computational resources.
  * **BF16**: 16 bits, an optimized format developed by Google that retains the ability to handle large and small numbers while saving half the space. Suitable for deep learning training, providing good numerical stability, especially for large-scale model training, significantly reducing memory bandwidth requirements while maintaining good precision and range.
  * **FP16**: 16 bits, IEEE 754 standard half-precision floating-point format, a common compression scheme in deep learning, using half the memory of FP32. Suitable for deep learning inference and training, especially when using GPU acceleration. However, it may be unstable when handling extremely large or small numbers, often requiring special numerical stability measures.
  * **BF8**: 8 bits, Google's 8-bit optimized format designed specifically for deep learning inference, optimizing computational stability through specific numerical distribution strategies. While maintaining good computational stability, it significantly reduces memory usage. Commonly used for edge devices and memory-constrained inference tasks.
  * **FP8**: 8 bits, NVIDIA's 8-bit floating-point format, specifically optimized for deep learning inference. Compared to BF8, its implementation is simpler and more direct. Although lower precision than FP16, it's sufficient for most inference tasks and can significantly reduce memory usage.
  * **INT8**: 8-bit integer quantization format that maps floating-point numbers to integers, significantly reducing memory usage and computational load, mainly used in deep learning inference phase. By quantizing floating-point numbers to integers, it reduces computational resource consumption, widely used in hardware-accelerated inference like TPUs and GPUs.
  * **INT4**: 4-bit integer quantization format with extremely small memory footprint, suitable for scenarios with very low storage and computational resource requirements. Although precision loss is noticeable, it can still provide acceptable results when processing text generation tasks, especially advantageous in large-scale model inference.
  * **Q4**: An optimized 4-bit quantization format that significantly compresses model size while maintaining basic precision through special quantization strategies. Mainly used in efficient inference frameworks like Ollama, very useful in inference scenarios requiring extremely low memory usage.
  `
  },
  concurrentRequirements: {
    title: "Concurrency",
    helpContent: `
* **Concurrent Users**: Represents the number of users accessing the LLM simultaneously. Technically, this parameter affects the size of KV Cache in the Transformer model, directly impacting GPU memory usage.

* **Avg Context Tokens**: Defines the length of each conversation round (context window size). For example, a setting of 2048 means the system will retain the most recent 2048 tokens of conversation content. This is similar to how much previous content a person can remember during a conversation. At the technical level, this parameter also affects the size of the KV Cache in the Transformer model, directly impacting the model's memory usage and response latency. Longer context provides better understanding and coherence but consumes more computational resources. Additionally, the application layer utilizes this context length differently in various scenarios. For instance, in regular conversation scenarios, it might refer to the retained rounds of dialogue history, while in RAG scenarios, it includes both retrieved document content and user queries.
    `,
    concurrentUsers: {
      label: "Concurrent Users",
      placeholder: "e.g., 100"
    },
    avgContextTokens: {
      label: "Avg Context Tokens",
      placeholder: "e.g., 2048"
    }
  },
  gpuRequirements: {
    vRAM: {
      title: "Memory Requirements",
      copyButton: {
        tooltip: "Copy to clipboard",
        copied: "Copied"
      },
      memoryTypes: {
        total: "Total",
        model: "Parameters",
        overhead: "Overhead",
        kvCache: "KV Cache"
      },
      dialogTitle: "Calculation Method",
      tooltipHint: "Click to show calculation formula",
      formula: `
#### Total Memory

$ \\small vRAM_{\\text{GiB}} = \\underbrace{M_{\\text{param}}}_{\\text{Model Memory}} + \\underbrace{M_{\\text{kv}}}_{\\text{KV Cache Memory}}  + \\underbrace{M_{\\text{param}} \\times factor_{\\text{overhead}}}_{\\text{Overhead Memory}}  $

Where:
- $M_{\\text{param}}$ represents the memory occupied by model parameters
- $M_{\\text{kv}}$ represents the memory occupied by KV Cache
- $M_{\\text{param}} \\times factor_{\\text{overhead}}$ represents system overhead memory and activation memory, with $ factor $ empirically set to $ 0.2 $

---

#### Model Parameters Memory

$ \\displaystyle M_{\\text{param}} = \\frac{N_{\\text{param}} \\times 4_{\\text{bytes}}}{32_{\\text{bits}}/Q_{\\text{bits}}} $

Where:
- $N_{\\text{param}}$ represents the number of model parameters (in billions)
- $4_{\\text{bytes}}$ represents bytes per parameter in FP32 format
- $32_{\\text{bits}}$ represents the number of bits in FP32 format
- $Q_{\\text{bits}}$ represents bits per parameter after quantization

---

#### KV Cache Memory

$ M_{\\text{kv}} = \\frac{Q_{\\text{bites}}}{8} \\times L_{\\text{layers}} \\times D_{\\text{dim}} \\times N_{\\text{users}} \\times Tokens_{\\text{sequence}} $

Where:
- $Q_{\\text{bites}}$ represents bits per parameter after quantization
- $L_{\\text{layers}}$ represents the number of Transformer layers
- $D_{\\text{dim}}$ represents model dimensions
- $N_{\\text{users}}$ represents concurrent users
- $Tokens_{\\text{sequence}}$ represents average context token length
    `,
      estimatedMemory: {
        label: "Estimated Memory",
        calculating: "Calculating...",
        description: "Real-time memory calculation based on input parameters"
      }
    },
    gpuInfo: {
      title: "Hardware Reference",
      searchPlaceholder: "Search GPU (vendor/model/memory)...",
      noResults: "No GPU found",
      helpContent: `
#### Features

Currently allows users to manually select GPU models and calculate required memory based on GPU memory size and quantity.

* Calculate required vRAM based on model parameters and concurrency needs
* Automatically calculate memory utilization and remaining memory

Additionally coming soon:

* Auto-recommend optimal GPU configuration based on memory requirements
* Support more GPU models and configuration options
`,
      gpuMemory: {
        label: "Memory Size (GB)",
        placeholder: "e.g., 24"
      },
      gpuCount: {
        label: "GPU Count",
        placeholder: "e.g., 4"
      }
    },
    recommendation: {
      title: "Hardware Recommendation",
      required: "Required Memory",
      efficiency: "Efficiency",
      restricted: "Banned in China",
      selectPlaceholder: "Select GPU model",
      gpuModel: "GPU Model",
      gpuCount: "GPU Count",
      memory: "Memory Info",
      maxGPUsLimit: "Maximum {count} GPUs per server",
      insufficient: "Missing",
      remaining: "Remaining",
      memoryInsufficient: "Insufficient Memory"
    }
  },
  theme: {
    light: "Light",
    dark: "Dark",
    system: "System"
  },
  language: {
    zh: "中文",
    en: "English",
    toggle: "Toggle Language"
  },
  changelog: {
    title: "Changelog"
  }
} 