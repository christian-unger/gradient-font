export const getValidColors = (colors: string | string[]) => {
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
  return validColors.toString()
}

const isValidColor = (color: string) => {
  const style = new Option().style
  style.color = color
  return style.color !== ""
}
