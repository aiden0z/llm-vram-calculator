interface XCloudLogoProps {
  className?: string
}

export function XCloudLogo({ className }: XCloudLogoProps) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 100 30" 
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* 这里放 xCloud 的 SVG 路径 */}
      <path d="..." />
    </svg>
  )
} 