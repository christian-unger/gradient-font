import * as React from "react"
import { css, getValidColors, hash, useFollowMouse } from "./lib"

type GradientBorderProps = {
  children: React.ReactNode
  colors: Colors
  style?: React.CSSProperties
  className?: string
  animation?: AnimationType
  direction?: string
  backgroundColor?: React.CSSProperties["background"]
  radius?: React.CSSProperties["borderRadius"]
  width?: React.CSSProperties["borderWidth"]
}

export const GradientBorder = ({
  children,
  colors,
  style = {},
  className = "",
  animation,
  direction = "45deg",
  radius = "1rem",
  width = "4px",
  backgroundColor = "#111",
}: GradientBorderProps) => {
  const uid = hash(JSON.stringify({ colors, animation, direction }))
  const validColors = getValidColors(colors)
  const position = useFollowMouse(animation === "follow-mouse")

  React.useLayoutEffect(() => {
    const style = document.createElement("style")
    style.innerHTML = css`
      .gradient-border-${uid} {
        box-sizing: border-box;
        background: linear-gradient(${backgroundColor}, ${backgroundColor})
            padding-box,
          linear-gradient(to right, ${validColors}) border-box;
        -webkit-border-radius: ${radius};
        border-radius: ${radius};
        border: ${width} solid transparent;
      }
    `
    style.setAttribute("id", uid)
    document.head.appendChild(style)
    return () => {
      if (style && document.head.contains(style)) {
        document.head.removeChild(style)
      }
    }
  }, [uid])

  return (
    <div
      className={`gradient-border-${uid} ${className}`}
      style={animation === "follow-mouse" ? { ...position, ...style } : style}
    >
      {children}
    </div>
  )
}
