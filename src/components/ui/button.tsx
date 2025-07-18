import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-primary hover:shadow-glow hover:scale-105 font-audiowide",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 font-audiowide",
        outline:
          "border border-primary bg-background hover:bg-primary hover:text-primary-foreground hover:shadow-glow font-audiowide",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 font-audiowide",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        hero: "bg-gradient-neon text-background hover:shadow-glow hover:scale-105 shadow-primary font-audiowide",
        chat: "bg-gradient-neon text-background hover:shadow-glow hover:scale-110 shadow-primary rounded-full font-audiowide",
        neon: "bg-primary text-primary-foreground hover:shadow-glow hover:scale-105 border border-primary/30 font-audiowide",
        magenta: "bg-accent text-accent-foreground hover:shadow-magenta hover:scale-105 font-audiowide",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
