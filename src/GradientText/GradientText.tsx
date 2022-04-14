import * as React from "react"
import { css } from "./css"
import { isValidColor } from "./isValidColor"
import { hash } from "./hash"

export type GradientTextProps = {
  children: React.ReactNode
  data?: string
  colors: string | string[]
  as?: "span" | "div" | "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
}

export const GradientText = (props: GradientTextProps) => {
  const { children, colors, data, as = "span" } = props
  const uid = hash(JSON.stringify(props))

  let validColors: string[]
  if (typeof colors === "string") {
    validColors = [colors]
  } else {
    validColors = colors.filter(isValidColor)
  }
  if (validColors.length === 0) {
    validColors = ["red", "blue"]
  }
  if (validColors.length === 1) {
    validColors.push("red")
  }
  const validColorsString = validColors.toString()

  React.useLayoutEffect(() => {
    let root = document.documentElement
    // * Add colors as CSS Custom Properties to root
    validColors.forEach((color, index) => {
      root.style.setProperty(`--gradient-color-${uid}-${index}`, color)
    })
    root.style.setProperty(
      `--gradient-colors-${uid}`,
      validColors
        .map((color, index) => `var(--gradient-color-${uid}-${index})`)
        .join()
    )
    const rules = css`
      .gradient-text-${uid} {
        color: transparent;
        background-clip: text;
        -webkit-background-clip: text;
        background-image: linear-gradient(
          to right,
          var(--gradient-colors-${uid})
        );
      }
    `

    // * Generate CSS and dynamically add it to the DOM
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
