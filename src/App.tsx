import * as React from "react"
import GradientText from "./GradientText"
import "./App.css"

export const App = () => (
  <main>
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
        A lightweight, declarative react library for creating{" "}
        <GradientText colors={["gold", "orchid"]}>eye-catching</GradientText>{" "}
        <GradientText
          colors={["white", "#6a50d7", "white"]}
          animation="follow-mouse"
          direction="45deg"
          data="animatable"
        />{" "}
        <GradientText colors={["#3FBF8F", "gold"]}>text gradients</GradientText>
      </p>
      <button onClick={scrollToPlayground}>
        <GradientText colors={["orange", ""]}>Try it out</GradientText>
      </button>
    </section>
    <Playground />
  </main>
)

const Playground = () => {
  const [colors, setColors] = React.useState(["green", "yellow"])
  const handleChangeFirstColor: React.ChangeEventHandler<HTMLInputElement> =
    event => {
      setColors(([, secondColor]) => [event.target.value, secondColor])
    }
  const handleChangeSecondColor: React.ChangeEventHandler<HTMLInputElement> =
    event => {
      setColors(([firstColor]) => [firstColor, event.target.value])
    }
  const [text, setText] = React.useState("Try it out")
  const handleChangeText: React.ChangeEventHandler<HTMLInputElement> = event =>
    setText(event.target.value)

  return (
    <section id="playground">
      <form action="">
        <input type="text" value={text} onChange={handleChangeText} />
        <input
          type="text"
          value={colors[0]}
          onChange={handleChangeFirstColor}
        />
        <input
          type="text"
          value={colors[1]}
          onChange={handleChangeSecondColor}
        />
      </form>
      <GradientText as="h1" colors={colors} data={text} />
    </section>
  )
}

const scrollToPlayground = () =>
  document.getElementById("playground")?.scrollIntoView({
    behavior: "smooth",
  })
