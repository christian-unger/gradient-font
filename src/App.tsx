import * as React from "react"
import GradientText from "./GradientText"
import "./App.css"

export const App = () => (
  <main>
    <h1>
      <span>Create your own</span>
      <GradientText colors={["#ef4444", "#3b82f6"]} direction="-45deg" animated>
        gradient text like a pro.
      </GradientText>
    </h1>
    <p>
      A lightweight, declarative react library for creating{" "}
      <GradientText colors={["#6a50d7", "white"]}>astonishing,</GradientText>{" "}
      <GradientText colors={["gold", "orchid"]}>eye-catching</GradientText>{" "}
      <GradientText colors={["#3FBF8F", "#001189"]}>
        text gradients
      </GradientText>
    </p>
  </main>
)
