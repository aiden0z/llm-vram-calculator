import ReactMarkdown from 'react-markdown'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import rehypeRaw from 'rehype-raw'
import 'katex/dist/katex.min.css'
import { cn } from "@/lib/utils"
import type { Components } from 'react-markdown'

interface MarkdownProps {
  content: string
  className?: string
  enableMath?: boolean
}

// 默认的 Markdown 组件配置
const defaultComponents: Components = {
  // 段落样式
  p: ({ children }) => (
    <p className="leading-relaxed mb-4">{children}</p>
  ),
  // 列表样式
  ul: ({ children }) => (
    <ul className="my-2 list-disc pl-6">{children}</ul>
  ),
  // 列表项样式
  li: ({ children }) => (
    <li className="mb-1">{children}</li>
  ),
  // 链接样式
  a: ({ children, href }) => {
    const isExternal = href?.startsWith('http')
    return (
      <a 
        href={href}
        className="text-blue-500 dark:text-blue-400 underline hover:no-underline"
        {...(isExternal && {
          target: "_blank",
          rel: "noopener noreferrer"
        })}
      >
        {children}
      </a>
    )
  },
  // 标题样式
  h3: ({ children }) => (
    <h3 className="text-lg font-semibold mt-6 mb-4">{children}</h3>
  ),
  h4: ({ children }) => (
    <h4 className="text-base font-semibold mt-4 mb-2">{children}</h4>
  ),
}

export function Markdown({ content, className = "", enableMath = false }: MarkdownProps) {

  return (
    <ReactMarkdown
      className={cn(
        // 基础样式
        "prose dark:prose-invert max-w-none [--tw-prose-links:theme(colors.prose-links)] dark:[--tw-prose-links:theme(colors.prose-links-dark)]",
        // 标题样式
        "prose-headings:mt-6 prose-headings:mb-4",
        // 自定义类名
        className
      )}
      remarkPlugins={enableMath ? [remarkMath] : []}
      rehypePlugins={[rehypeRaw, ...(enableMath ? [rehypeKatex] : [])]}
      components={defaultComponents}
    >
      {content}
    </ReactMarkdown>
  )
} 