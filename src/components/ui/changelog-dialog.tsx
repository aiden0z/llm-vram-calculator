import * as React from "react"
import { History } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Markdown } from "@/components/ui/markdown"

const changelogContent = `
### v0.1.0 (2025-02-20)

#### ✨ Features

* LLM 显存计算器
  - 支持模型参数配置（参数量、层数、维度等）
  - 支持并发场景配置（并发用户数、上下文长度）
  - 自动计算模型参数、KV Cache、系统开销等显存占用
* 硬件配置参考
  - 支持主流 AI 训练/推理显卡选择
  - 自动计算显存利用率和剩余显存
* 多语言支持（中文/英文）
* 自适应主题（亮色/暗色）
`

export function ChangelogDialog() {
  const [open, setOpen] = React.useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <History className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors cursor-pointer ml-2" />
      </DialogTrigger>
      <DialogContent className="lg:max-w-[640px]">
        <DialogHeader className="relative">
          <DialogTitle>Changelog</DialogTitle>
        </DialogHeader>
        <div className="max-h-[60vh] overflow-y-auto pr-6">
          <Markdown 
            content={changelogContent} 
            className="prose-sm" 
          />
        </div>
      </DialogContent>
    </Dialog>
  )
} 