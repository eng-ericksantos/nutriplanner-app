import React from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { SidebarContext } from "@/context/SidebarContext"; // Importação atualizada

export function SidebarProvider({ children }) {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = React.useState(false);

  const value = React.useMemo(() => ({
    isOpen,
    setIsOpen,
    isMobile,
  }), [isOpen, isMobile]);

  return (
    <SidebarContext.Provider value={value}>
      {children}
    </SidebarContext.Provider>
  );
}