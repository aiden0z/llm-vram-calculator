import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { HelpCircle } from "lucide-react"
import { Markdown } from "@/components/ui/markdown"

interface HelpDialogProps {
  title: string
  content: string
  iconClassName?: string
}

export function HelpDialog({ 
  title,
  content, 
  iconClassName 
}: HelpDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="cursor-pointer outline-none">
          <HelpCircle 
            className={iconClassName || "h-4 w-4 text-muted-foreground hover:text-muted-foreground/80"} 
          />
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-2xl outline-none max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="overflow-y-auto">
          <Markdown content={content} />
        </div>
      </DialogContent>
    </Dialog>
  )
} 