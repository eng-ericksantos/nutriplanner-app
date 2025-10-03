import * as React from "react"

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState(false)

  React.useEffect(() => {
    const checkIsMobile = () => {
      const isMobileDevice = window.matchMedia("(max-width: 768px)").matches
      setIsMobile(isMobileDevice)
    }

    checkIsMobile()

    window.addEventListener("resize", checkIsMobile)

    return () => {
      window.removeEventListener("resize", checkIsMobile)
    }
  }, [])

  return isMobile
}