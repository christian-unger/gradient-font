import * as React from "react"
import { getValidColors } from "./getValidColors"
import { css } from "./css"
import { hash } from "./hash"

export type GradientTextProps = {
  children: string
  data?: string
  colors: string | string[]
  as?: "span" | "div" | "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
}

export const GradientText = (props: GradientTextProps) => {
  const { children, colors, data, as = "span" } = props
  const uid = hash(JSON.stringify(props))
  const validColors = getValidColors(colors)
  const validColorsString = validColors.toString()

  React.useLayoutEffect(() => {
    const rules = css`
      .gradient-text-${uid} {
        color: transparent;
        -webkit-background-clip: text;
        background-clip: text;
        background-image: -webkit-gradient(to right, ${validColorsString});
        background-image: -o-linear-gradient(to right, ${validColorsString});
        background-image: linear-gradient(to right, ${validColorsString});
      }
    `
    // * Generate CSS and add it to the DOM
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
