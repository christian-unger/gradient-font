import * as React from "react"
import GradientText from "./GradientText"
import "./App.css"
import { GradientBorder } from "./GradientText/GradientBorder"
import { GradientButton } from "./GradientText/GradientButton"

export const App = () => (
  <main>
    <Home />
    <Demo />
  </main>
)

const Home = () => {
  const scrollToDemo = () =>
    document.getElementById("demo")?.scrollIntoView({
      behavior: "smooth",
    })

  return (
    <section>
      <h1>
        <span>Create your own</span>
        <GradientText
          colors={["#ef4444", "#3b82f6"]}
          direction="-45deg"
          animation="transition"
          data="gradient text like a pro."
        />
      </h1>
      <p>
        A lightweight React library ⚛️ for creating <br />
        <GradientText
          colors={["white", "#9684E3", "white"]}
          animation="follow-mouse"
          direction="45deg"
        >
          effortless
        </GradientText>{" "}
        <GradientText colors={["gold", "orchid"]}>eye-catching</GradientText>{" "}
        <GradientText colors={["#3FBF8F", "gold"]}>text gradients</GradientText>
      </p>
      <div style={{ paddingTop: "2rem" }}>
        <GradientButton colors={["#0080ef", "#04d3db"]} onClick={scrollToDemo}>
          Try it out
        </GradientButton>
      </div>
    </section>
  )
}

const Demo = () => {
  const ukraineFlagColors = ["#005bbb", "#ffd500"]
  // replace with reducer
  const [colors, setColors] = React.useState(ukraineFlagColors)
  const [text, setText] = React.useState("Україна")
  const [animated, setAnimated] = React.useState(true)

  const handleChangeFirstColor: React.ChangeEventHandler<HTMLInputElement> =
    event => setColors(([, secondColor]) => [event.target.value, secondColor])

  const handleChangeSecondColor: React.ChangeEventHandler<HTMLInputElement> =
    event => setColors(([firstColor]) => [firstColor, event.target.value])

  const handleChangeText: React.ChangeEventHandler<HTMLInputElement> = event =>
    setText(event.target.value)

  const toggleAnimated = () => setAnimated(animated => !animated)

  return (
    <section id="demo">
      <GradientText
        element="h1"
        style={{ fontSize: "min(9rem, 20vw)", margin: "2rem" }}
        colors={colors}
        animation={animated ? "transition" : undefined}
        direction="90deg"
      >
        {text}
      </GradientText>
      <form>
        <div>
          <label htmlFor="text">Text</label>
          <input
            type="text"
            id="text"
            value={text}
            onChange={handleChangeText}
          />
        </div>
        <div>
          <label htmlFor="color-1">Color 1</label>
          <input
            type="text"
            id="color-1"
            value={colors[0]}
            onChange={handleChangeFirstColor}
          />
        </div>
        <div>
          <label htmlFor="color-2">Color 2</label>
          <input
            type="text"
            id="color-2"
            value={colors[1]}
            onChange={handleChangeSecondColor}
          />
        </div>
        <div>
          <label htmlFor="animated">Animated</label>
          <input
            type="checkbox"
            name="animated"
            id="animated"
            checked={animated}
            onChange={toggleAnimated}
          />
        </div>
      </form>
    </section>
  )
}
