export interface GPUSpec {
  name: string
  vram: number // GB
  vendor: string
  generation?: string
  disableInChina?: boolean
}

export const GPU_SPECS: GPUSpec[] = [
  // NVIDIA 数据中心显卡
  {
    name: "H20",
    vram: 96,
    vendor: "NVIDIA",
    generation: "Hopper"
  },
  {
    name: "A10",
    vram: 24,
    vendor: "NVIDIA",
    generation: "Ampere",
  },
  // NVIDIA 消费级显卡
  {
    name: "RTX 4090",
    vram: 24,
    vendor: "NVIDIA",
    generation: "Ada Lovelace",
  },
  {
    name: "RTX 4080",
    vram: 16,
    vendor: "NVIDIA",
    generation: "Ada Lovelace"
  },
  {
    name: "H800",
    vram: 80,
    vendor: "NVIDIA",
    generation: "Hopper",
    disableInChina: true
  },
  {
    name: "H100",
    vram: 80,
    vendor: "NVIDIA",
    generation: "Hopper",
    disableInChina: true,
  },
  {
    name: "A100",
    vram: 80,
    vendor: "NVIDIA",
    generation: "Ampere",
    disableInChina: true,
  },
  {
    name: "L40",
    vram: 48,
    vendor: "NVIDIA",
    generation: "Ada Lovelace",
    disableInChina: true,
  },

  // 沐曦显卡
  {
    name: "C550",
    vram: 64,
    vendor: "沐曦",
    generation: "Metax"
  },
  {
    name: "C500",
    vram: 64,
    vendor: "沐曦",
    generation: "Metax"
  },
  {
    name: "N260",
    vram: 64,
    vendor: "沐曦",
    generation: "Metax"
  },

  // 摩尔线程
  {
    name: "MTT S80",
    vram: 32,
    vendor: "摩尔线程",
    generation: "MUSA"
  },
  {
    name: "MTT S70",
    vram: 16,
    vendor: "摩尔线程",
    generation: "MUSA"
  },
  {
    name: "MTT S60",
    vram: 8,
    vendor: "摩尔线程",
    generation: "MUSA"
  },

  // 壁仞科技
  {
    name: "BR100",
    vram: 64,
    vendor: "壁仞科技",
    generation: "BIRENLAKE"
  },
  {
    name: "BR104",
    vram: 32,
    vendor: "壁仞科技",
    generation: "BIRENLAKE"
  },

  // 燧原科技
  {
    name: "S60",
    vram: 48,
    vendor: "燧原科技",
    generation: "Enflame"
  },
  {
    name: "T20",
    vram: 32,
    vendor: "燧原科技",
    generation: "Enflame"
  },
  {
    name: "i20",
    vram: 16,
    vendor: "燧原科技",
    generation: "Enflame"
  },

  // 天数智芯
  {
    name: "BI-V150",
    vram: 64,
    vendor: "天数智芯",
    generation: "Iluvatar"
  },
  {
    name: "MR-V100",
    vram: 32,
    vendor: "天数智芯",
    generation: "Iluvatar"
  },
]
