import * as React from "react"
import { GradientBorder } from "./GradientBorder"
import { GradientText } from "./GradientText"

type GradientButtonProps = {
  colors: Colors
  onClick: React.MouseEventHandler
  children: string
}

export const GradientButton = ({
  colors,
  onClick,
  children,
}: GradientButtonProps) => {
  return (
    <GradientBorder colors={colors} style={{ padding: "1rem 2rem" }}>
      <button type="button" onClick={onClick}>
        <GradientText colors={colors}>{children}</GradientText>
      </button>
    </GradientBorder>
  )
}
