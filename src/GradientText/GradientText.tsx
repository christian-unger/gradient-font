import * as React from "react"
import { getValidColors } from "./getValidColors"
import { css } from "./css"
import { hash } from "./hash"
import { useFollowMouse } from "./useFollowMouse"
import "./animations.css"

interface BaseGradientTextProps {
  colors: string | string[]
  as?: "span" | "div" | "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
  animation?: "transition" | "follow-mouse"
  direction?: string
  style?: React.CSSProperties
  className?: string
}

interface GradientTextPropsWithChildren extends BaseGradientTextProps {
  children: string
  data?: never
}

interface GradientTextPropsWithData extends BaseGradientTextProps {
  children?: never
  data: string
}

export type GradientTextProps =
  | GradientTextPropsWithChildren
  | GradientTextPropsWithData

export const GradientText = (props: GradientTextProps) => {
  const {
    children,
    className,
    style = {},
    colors,
    data,
    as = "span",
    animation,
    direction = "to right",
  } = props
  const uid = hash(JSON.stringify(props))
  const validColors = getValidColors(colors)
  const validColorsString = validColors.toString()
  const position = useFollowMouse(animation === "follow-mouse")

  React.useLayoutEffect(() => {
    const rules = css`
      .gradient-text-${uid} {
        color: transparent;
        -webkit-background-clip: text;
        background-clip: text;
        background-image: -webkit-gradient(${direction}, ${validColorsString});
        background-image: -o-linear-gradient(
          ${direction},
          ${validColorsString}
        );
        background-image: linear-gradient(${direction}, ${validColorsString});

        ${animation === "transition"
          ? `
        
            background-size: 400%;
            -webkit-animation: gradient 5s ease infinite;
            animation: gradient 5s ease infinite;
          `
          : ""}
        ${animation === "follow-mouse" ? "background-size: 400% auto;" : ""}
      }
    `
    const style = document.createElement("style")
    style.innerHTML = rules
    style.setAttribute("id", uid)
    document.head.appendChild(style)

    return () => {
      if (style && document.head.contains(style)) {
        document.head.removeChild(style)
      }
    }
  }, [validColorsString])

  return React.createElement(as, {
    className: `gradient-text-${uid} ${className}`,
    children: data ?? children,
    style: animation === "follow-mouse" ? { ...position, ...style } : style,
  })
}

export default GradientText
