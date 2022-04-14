import * as React from "react"
import { getValidColors } from "./getValidColors"
import { css } from "./css"
import { hash } from "./hash"
import { useFollowMouse } from "./useFollowMouse"
import "./animations.css"

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
  const uid = hash(JSON.stringify({ colors, animation, direction }))
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
  }, [uid])

  const GradientElement = React.createElement(as, {
    className: `gradient-text-${uid} ${className}`,
    children: data ?? children,
    style: animation === "follow-mouse" ? { ...position, ...style } : style,
  })

  return GradientElement
}

export default GradientText
