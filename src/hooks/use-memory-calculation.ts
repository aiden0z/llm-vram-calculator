interface MemoryCalculationParams {
  paramBillions: number    // 模型参数量（十亿）
  numHiddenLayers: number  // Transformer 层数
  numDimensions: number    // 模型维度
  quantizationBits: number // 量化位数
  concurrentUsers: number  // 并发用户数
  avgSequenceTokens: number // 平均序列长度
}

export function useMemoryCalculation({
  paramBillions,
  numHiddenLayers,
  numDimensions,
  quantizationBits,
  concurrentUsers,
  avgSequenceTokens
}: MemoryCalculationParams) {
  // 1. 模型参数内存 (GiB)
  const modelMemory = paramBillions * 4 * (quantizationBits / 32)

  // 2. 系统开销内存 (GiB)
  const overheadMemory = modelMemory * 0.2

  // 3. KV Cache 内存 (GiB)
  // $M_{kv} = \frac{Q_{bits}}{8} \times L_{layers} \times D_{dim} \times N_{users} \times Tokens_{sequence}$
  const kvCacheBytes = (quantizationBits / 8) * numHiddenLayers * numDimensions * concurrentUsers * avgSequenceTokens
  const kvCacheMemory = kvCacheBytes / (1024 * 1024 * 1024)

  // 4. 总内存 (GiB)
  // $vRAM_{GiB} = M_{param} + M_{param} \times factor_{overhead} + M_{kv}$
  const totalMemory = modelMemory + overheadMemory + kvCacheMemory

  return {
    totalMemory,
    modelMemory,
    overheadMemory,
    kvCacheMemory
  }
} 