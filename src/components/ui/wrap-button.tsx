import React from "react"
import Link from "next/link"
import { ArrowRight, Globe } from "lucide-react"
import { cn } from "@/lib/utils"

interface WrapButtonProps {
  className?: string
  children?: React.ReactNode
  href?: string
  variant?: "default" | "green"
  onClick?: () => void
}

const WrapButton: React.FC<WrapButtonProps> = ({
  className,
  children,
  href,
  variant = "default",
  onClick,
}) => {
  const isGreen = variant === "green"

  return (
    <div className="flex items-center justify-center">
      {href ? (
        <Link href={href}>
          <div
            className={cn(
              "group cursor-pointer border group border-[#3B3A3A] bg-[#151515] gap-2 h-[64px] flex items-center p-[11px] rounded-full",
              className
            )}
            onClick={onClick}
          >
            <div
              className={cn(
                "border border-[#3B3A3A] h-[43px] rounded-full flex items-center justify-center text-white px-4",
                isGreen ? "bg-green-600 group-hover:bg-green-500" : "bg-[#1e3a8a] group-hover:bg-[#1d4ed8]"
              )}
            >
              <p className="font-medium tracking-tight flex items-center gap-2">
                {children}
              </p>
            </div>
            <div
              className={cn(
                "text-[#3b3a3a] group-hover:ml-2 ease-in-out transition-all size-[26px] flex items-center justify-center rounded-full border-2 border-[#3b3a3a]",
                isGreen ? "group-hover:border-green-500" : "group-hover:border-[#1d4ed8]"
              )}
            >
              <ArrowRight
                size={18}
                className={cn(
                  "ease-in-out transition-all",
                  "group-hover:rotate-45",
                  isGreen ? "text-green-500" : "text-[#1d4ed8]"
                )}
              />
            </div>
          </div>
        </Link>
      ) : (
        <div
          className={cn(
            "group cursor-pointer border group border-[#3B3A3A] bg-[#151515] gap-2 h-[64px] flex items-center p-[11px] rounded-full",
            className
          )}
          onClick={onClick}
        >
          <div
            className={cn(
              "border border-[#3B3A3A] h-[43px] rounded-full flex items-center justify-center text-white px-4",
              isGreen ? "bg-green-600 group-hover:bg-green-500" : "bg-[#fe7500] group-hover:bg-[#ff8c1a]"
            )}
          >
            <Globe
              className={cn(
                "mx-2 animate-spin",
                isGreen && "text-white"
              )}
            />
            <p className="font-medium tracking-tight">
              {children ? children : "Get Started"}
            </p>
          </div>
          <div
            className={cn(
              "text-[#3b3a3a] group-hover:ml-2 ease-in-out transition-all size-[26px] flex items-center justify-center rounded-full border-2 border-[#3b3a3a]",
              isGreen ? "group-hover:border-green-500" : "group-hover:border-[#fe7500]"
            )}
          >
            <ArrowRight
              size={18}
              className={cn(
                "ease-in-out transition-all",
                "group-hover:rotate-45",
                isGreen ? "text-green-500" : "text-[#fe7500]"
              )}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default WrapButton
