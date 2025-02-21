import { Github } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { ChangelogDialog } from "./changelog-dialog"

export function Footer() {
  return (
    <footer className="py-6 md:px-8 md:py-0">
      <div className="container flex flex-col items-center justify-center gap-2 md:h-24">
        <div className="flex items-center space-x-2">
          <div className="flex items-center">
            <a
              href="https://github.com/aiden0z/llm-vram-calculator"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-3 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Visit GitHub profile"
            >
              <Github className="h-5 w-5" />
            </a>
          </div>
          <Separator orientation="vertical" className="h-4" />
          <ChangelogDialog />
        </div>
      </div>
    </footer>
  )
} 