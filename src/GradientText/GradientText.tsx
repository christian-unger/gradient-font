import * as React from "react"
import { getValidColors, useFollowMouse, getCssRules, hash } from "./lib"
import "./styles/animations.css"

export const GradientText = ({
  children,
  className,
  style = {},
  colors,
  data,
  element = "span",
  animation,
  direction = "to right",
}: GradientTextProps) => {
  const uid = hash(JSON.stringify({ colors, animation, direction }))
  const validColors = getValidColors(colors)
  const position = useFollowMouse(animation === "follow-mouse")

  React.useLayoutEffect(() => {
    const style = document.createElement("style")
    style.innerHTML = getCssRules(uid, direction, validColors, animation)
    style.setAttribute("id", uid)
    document.head.appendChild(style)
    return () => {
      if (style && document.head.contains(style)) {
        document.head.removeChild(style)
      }
    }
  }, [uid])

  const GradientElement = React.createElement(element, {
    className: `gradient-text-${uid} ${className}`,
    children: data ?? children,
    style: animation === "follow-mouse" ? { ...position, ...style } : style,
  })

  return GradientElement
}
