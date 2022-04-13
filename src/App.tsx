import * as React from 'react'
import './App.css'

export default function App() {
  return (
    <main>
      <h1>
        <span>Create your own</span>
        <br />
        <GradientText colors={["#ef4444", "#3b82f6"]}>gradient fonts like a pro.</GradientText>
      </h1>
    </main>
  )
}

const isValidColor = (color: string) => {
  const style = new Option().style
  style.color = color
  return style.color !== ""
}

type GradientTextProps = {
  children: React.ReactNode
  colors: string[]
}

const GradientText = ({ children, colors }: GradientTextProps) => {
  const validColors = colors.filter(isValidColor)
  const validColorsString = validColors.toString()

  React.useLayoutEffect(() => {
    let root = document.documentElement
    validColors.forEach((color, index) => {
      root.style.setProperty(`--gradient-color-${index}`)
    })
  }, [validColorsString])
  
  return (
    <span className={`gradient`}>{children}</span>
  )
}

