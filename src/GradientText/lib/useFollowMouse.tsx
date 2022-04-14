import * as React from "react"

export const useFollowMouse = (enabled: boolean) => {
  const [position, setPosition] = React.useState({
    backgroundPositionX: 0,
    backgroundPositionY: 0,
  })

  React.useLayoutEffect(() => {
    const handlePositionChange = (event: MouseEvent) =>
      setPosition({
        backgroundPositionX: event.clientX / 2,
        backgroundPositionY: event.clientY / 2,
      })

    if (enabled) {
      window.addEventListener("mousemove", handlePositionChange)
    }

    return () => {
      window.removeEventListener("mousemove", handlePositionChange)
    }
  }, [enabled])

  return position
}
