import type { Translation } from '../types'

export const zh: Translation = {
  title: "LLM vRAM 计算器 ",
  description: "DeepSeek-R1 在100人并发下需要多少显存？🧮 🚀",
  modelParams: {
    title: "模型信息",
    modelName: {
      label: "模型",
      placeholder: "请选择模型"
    },
    numLayers: {
      label: "Transformer 层数"
    },
    dimensions: {
      label: "模型维度"
    },
    quantization: {
      label: "量化类型",
      placeholder: "请选择量化类型"
    },
    paramBillions: {
      label: "模型参数量 (B)",
      placeholder: ""
    },
    helpContent: `


#### 大模型如何使用内存

Transformer 大模型的内存使用可以通过模型参数量（权重）内存、KV Cache、激活内存、以及系统开销来估算。其中

* **模型参数量（权重）内存**：模型参数本身占用的内存，与模型参数量成正比。
* **KV Cache**：用于存储和加速自注意力机制的缓存，与 Transformer 层数（即 Block 数量）、模型维度、量化类型、序列长度和并发情况有关。

以上两类内存可以基于模型参数以及并发需求进行估算。 **激活内存和系统开销则基于模型参数占用内存的 10% ~ 20% 进行估算，后续将使用 20% 经验值进行计算。**

对于大多数模型，其 Transfomer 层数、模型维度等参数信息可以在 huggingface 上查询到，比如在 [DeepSeek-R1 模型配置文件](https://huggingface.co/deepseek-ai/DeepSeek-R1/blob/main/config.json) 中 

- Transfomer 层数信息对应于 **num_hidden_layers** 参数
- 模型维度信息对应于 **hidden_size** 参数

#### 参数说明

本应用已经预置了 DeepSeek-R1 官方模型参数信息，如需计算其他模型，选择 **Other** 选项，然后输入模型参数量（B）、Transformer 层数、模型维度、量化类型等参数即可。

- **模型参数量（B）**：定义语言模型的规模大小，类似大脑中的"知识容量"。B代表十亿，比如14B表示模型包含140亿个参数，参数量越大，模型的知识储备和处理能力通常越强。
- **Transformer 层数**：语言模型内部的核心处理单元数量，每一层都会对输入的文本进行深入理解和处理。类似于将一个复杂问题分解成多个步骤来思考，层数越多，模型对文本的理解和处理越深入。
- **模型维度**：表示语言模型处理文本时的特征容量，决定了模型对每个词的理解深度。类似于大脑同时能记住一个事物的多少个特征，维度越大，模型对文本的表达和理解就越丰富。
- **量化类型**：用于在保持模型能力的同时压缩其存储和运行所需的计算资源，不同的量化类型代表不同的压缩程度：
  - **FP32**: 32 bits，IEEE 754 标准的单精度浮点格式，最基础的标准精度格式，类似于使用完整分辨率的相机拍摄，提供最精确的计算效果，广泛应用于高性能计算、图形渲染和深度学习训练。虽然精度高，但需要最大的存储和计算资源。
  - **BF16**: 16 bits，Google 开发的优化格式，通过特殊设计保留了处理大数和小数的能力，同时节省一半空间。适合深度学习训练，能够提供较好的数值稳定性，尤其适用于大规模模型训练，显著降低内存带宽需求，保持较好的精度和范围。
  - **FP16**: 16 bits，IEEE 754 标准的半精度浮点格式，在深度学习中常用的压缩方案，内存占用是 FP32 的一半。适用于深度学习推理和训练，尤其在使用 GPU 加速时。但在处理极大或极小的数字时可能不稳定，因此常需要特别的数值稳定性措施。
  - **BF8**: 8 bits，Google 推出的 8 位优化格式，专为深度学习推理设计，通过特定的数值分布策略来优化计算稳定性。在保持不错的计算稳定性的同时，显著降低内存占用。常用于边缘设备和内存受限的推理任务。
  - **FP8**: 8 bits，NVIDIA 推出的 8 位浮点格式，专门优化用于深度学习推理。与 BF8 相比，它实现更简单直接。尽管精度低于 FP16，但足以满足大多数推理任务的需求，能够显著减少内存占用。
  - **INT8**: 8 位整数量化格式，将浮点数映射为整数，显著减少内存占用和计算量，主要用于深度学习推理阶段。通过量化浮点数为整数，减少计算资源消耗，广泛用于硬件加速推理，如 TPU 和 GPU。
  - **INT4**: 4 位整数量化格式，内存占用极小，适用于对存储和计算资源要求非常低的场景。虽然精度损失明显，但在处理文本生成等任务时仍然可以提供可接受的结果，尤其在大规模模型推理中有优势。
  - **Q4**: 使用 4 位量化的优化格式，通过特殊的量化策略，在保持基本精度的同时大幅压缩模型体积。主要用于高效推理框架，如 Ollama，在需要极低内存占用的推理场景中非常有用。


  `
  },
  concurrentRequirements: {
    title: "并发需求",
    helpContent: `
* **并发用户数**：表示同一时间使用 LLM 的用户数。在技术上，这个参数会影响 Transfomer 模型中的 KV Cache 内存大小。

* **平均上下文Token长度**：定义每论对话长度（上下文窗口大小）。比如设置为 2048，表示在对话过程中会保留最近的 2048 个 token 的对话内容。这就像人类交谈时能记住的前文内容多少。在技术层面，这个参数也将影响Transformer 模型 KV Cache 的大小，直接影响模型的显存占用和响应延迟。较长的上下文可以提供更好的理解和连贯性，但也会消耗更多计算资源。此外，在不同的场景下应用层对于这个上下文长度利用不同，比如在普通对话场景中可能是指保留的几轮对话历史，RAG 场景中是指检索到的文档内容和用户问题等等。
    `,
    concurrentUsers: {
      label: "并发用户数",
      placeholder: "例如：100"
    },
    avgContextTokens: {
      label: "平均上下文Token长度",
      placeholder: "例如：2048"
    }
  },
  gpuRequirements: {
    vRAM: {
      title: "显存需求",
      copyButton: {
        tooltip: "复制到剪贴板",
        copied: "已复制"
      },
      memoryTypes: {
        total: "总内存",
        model: "参数内存",
        overhead: "系统开销",
        kvCache: "KV Cache"
      },
      dialogTitle: "计算方法",
      tooltipHint: "点击展示计算公式",
      formula: `
#### 总内存

$$ \\small vRAM_{\\text{GiB}} = \\underbrace{M_{\\text{param}}}_{\\text{Model Memory}} + \\underbrace{M_{\\text{kv}}}_{\\text{KV Cache Memory}}  + \\underbrace{M_{\\text{param}} \\times factor_{\\text{overhead}}}_{\\text{Overhead Memory}}  $$

其中
- $M_{\\text{param}}$ 表示模型参数占用的内存
- $M_{\\text{kv}}$ 表示 KV Cache 占用的内存
- $M_{\\text{param}} \\times factor_{\\text{overhead}}$ 表示系统开销内存和激活内存等，$ factor $ 取经验值 $ 0.2 $

---

#### 模型参数内存

$$ \\displaystyle M_{\\text{param}} = \\frac{N_{\\text{param}} \\times 4_{\\text{bytes}}}{32_{\\text{bits}}/Q_{\\text{bits}}} $$

其中
- $N_{\\text{param}}$ 表示模型参数数量（以十亿为单位）
- $4_{\\text{bytes}}$ 表示 FP32 格式下每个参数占用的字节数
- $32_{\\text{bits}}$ 表示 FP32 格式的bit位数
- $Q_{\\text{bits}}$ 表示量化后每个参数的bit位数

---

#### KV Cache 内存

$$ M_{\\text{kv}} = \\frac{Q_{\\text{bites}}}{8} \\times L_{\\text{layers}} \\times D_{\\text{dim}} \\times N_{\\text{users}} \\times Tokens_{\\text{sequence}} $$

其中
- $Q_{\\text{bites}}$ 表示量化后每个参数的bit位数
- $L_{\\text{layers}}$ 表示Transformer 层数
- $D_{\\text{dim}}$ 表示模型维度
- $N_{\\text{users}}$ 表示并发用户数
- $Tokens_{\\text{sequence}}$ 表示平均上下文Token长度


    `,
      estimatedMemory: {
        label: "预估内存需求",
        calculating: "计算中...",
        description: "根据输入参数实时计算所需内存"
      }
    },
    gpuInfo: {
      title: "硬件配置参考",
      searchPlaceholder: "搜索显卡（厂商/型号/显存）...",
      noResults: "未找到匹配的显卡",
      helpContent: `
#### 功能说明

当前允许用户手动选择显卡型号，并根据显卡显存大小和数量，计算所需显存。

* 根据模型参数和并发需求，计算所需显存
* 自动计算显存利用率和剩余显存

此外即将支持：

* 根据显存需求自动推荐最优显卡配置
* 支持更多显卡型号和配置选项

`,
      gpuMemory: {
        label: "显存大小 (GB)",
        placeholder: "例如：24"
      },
      gpuCount: {
        label: "显卡数量",
        placeholder: "例如：4"
      }
    },
    recommendation: {
      title: "硬件配置推荐",
      required: "所需显存",
      efficiency: "利用率",
      restricted: "中国禁售",
      selectPlaceholder: "请选择显卡型号",
      gpuModel: "显卡型号",
      gpuCount: "显卡数量",
      memory: "显存信息",
      maxGPUsLimit: "单服务器最多支持 {count} 张显卡",
      insufficient: "缺少",
      remaining: "剩余",
      memoryInsufficient: "显存不足"
    }
  },
  theme: {
    light: "浅色模式",
    dark: "深色模式",
    system: "跟随系统"
  },
  language: {
    zh: "中文",
    en: "English",
    toggle: "切换语言"
  },
  changelog: {
    title: "更新日志"
  }
} 