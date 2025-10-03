import React from "react";
import { SidebarContext } from "@/context/SidebarContext"; // Importação atualizada

export function useSidebar() {
    const context = React.useContext(SidebarContext);
    if (!context) {
        throw new Error("useSidebar must be used within a SidebarProvider");
    }
    return context;
}