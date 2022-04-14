import * as React from "react"
import { getValidColors } from "./getValidColors"
import { css } from "./css"
import { hash } from "./hash"
import "./gradient.css"

export type GradientTextProps = {
  children: string
  data?: string
  colors: string | string[]
  as?: "span" | "div" | "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
  animated?: boolean
  direction?: string
}

export const GradientText = (props: GradientTextProps) => {
  const {
    children,
    colors,
    data,
    as = "span",
    animated = false,
    direction = "to right",
  } = props
  const uid = hash(JSON.stringify(props))
  const validColors = getValidColors(colors)
  const validColorsString = validColors.toString()

  React.useLayoutEffect(() => {
    // * Generate CSS and add it to the DOM
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
        ${animated
          ? `
            background-size: 400%;
            -webkit-animation: gradient 5s ease infinite;
            animation: gradient 5s ease infinite;
          `
          : ""}
      }
    `
    const style = document.createElement("style")
    style.innerHTML = rules
    style.setAttribute("id", uid)
    document.head.appendChild(style)

    // * remove css from dom on unmount
    return () => {
      if (style && document.head.contains(style)) {
        document.head.removeChild(style)
      }
    }
  }, [validColorsString])

  // * use createElement API for element as
  return React.createElement(as, {
    className: `gradient-text-${uid}`,
    children: data ?? children,
  })
}

export default GradientText
