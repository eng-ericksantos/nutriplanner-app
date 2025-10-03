import * as React from "react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cva } from "class-variance-authority"
import { PanelLeft } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useSidebar } from "@/hooks/use-sidebar"

const sidebarVariants = cva(
  "fixed h-full z-50 gap-4 bg-background p-4 flex-col",
  {
    variants: {
      side: {
        left: "left-0 top-0",
        right: "right-0 top-0",
      },
      isOpen: {
        true: "flex",
        false: "hidden",
      },
    },
    defaultVariants: {
      side: "left",
      isOpen: false,
    },
  }
)

const Sidebar = React.forwardRef(
  ({ className, side = "left", children, ...props }, ref) => {
    const { isMobile } = useSidebar()
    const Comp = isMobile ? Sheet : "aside"

    if (Comp === "aside") {
      return (
        <aside
          ref={ref}
          className={cn(sidebarVariants({ side, isOpen: true }), "w-72 border-r", className)}
          {...props}
        >
          {children}
        </aside>
      )
    }

    return (
      <Sheet {...props}>
        {children}
      </Sheet>
    )
  }
)
Sidebar.displayName = "Sidebar"

function SidebarTrigger({ className, ...props }) {
  const { isMobile } = useSidebar()
  if (!isMobile) return null

  return (
    <SheetTrigger asChild>
      <Button
        variant="ghost"
        size="icon"
        className={cn("size-10 shrink-0", className)}
        {...props}
      >
        <PanelLeft />
        <span className="sr-only">Toggle Sidebar</span>
      </Button>
    </SheetTrigger>
  )
}

const SidebarContent = React.forwardRef(
  ({ className, side, children, ...props }, ref) => {
    const { isMobile } = useSidebar()

    if (!isMobile) {
      return (
        <div ref={ref} className="flex flex-col h-full" {...props}>
          {children}
        </div>
      )
    }

    return (
      <SheetContent ref={ref} side={side} className={cn("w-72 p-4", className)}>
        {children}
      </SheetContent>
    )
  }
)
SidebarContent.displayName = "SidebarContent"

function SidebarHeader({ className, children, ...props }) {
  return (
    <div className={cn("flex flex-col gap-2 p-2", className)} {...props}>
      {children}
    </div>
  )
}

function SidebarMenu({ className, children, ...props }) {
  return (
    <ul className={cn("flex flex-col gap-2", className)} {...props}>
      {children}
    </ul>
  )
}

function SidebarMenuItem({ className, children, ...props }) {
  return <li className={cn("", className)} {...props}>{children}</li>
}

function SidebarMenuButton({ className, children, ...props }) {
  return (
    <Button
      variant="ghost"
      className={cn("w-full justify-start", className)}
      {...props}
    >
      {children}
    </Button>
  )
}

function SidebarGroup({ className, children, ...props }) {
  return (
    <div className={cn("flex flex-col gap-4", className)} {...props}>
      {children}
    </div>
  )
}

function SidebarGroupContent({ className, children, ...props }) {
  return (
    <div className={cn("flex flex-col gap-2 pl-4", className)} {...props}>
      {children}
    </div>
  )
}

function SidebarSeparator({ className, ...props }) {
  return <Separator className={cn("my-2", className)} {...props} />
}

export {
  Sidebar,
  SidebarTrigger,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupContent,
  SidebarSeparator,
}
