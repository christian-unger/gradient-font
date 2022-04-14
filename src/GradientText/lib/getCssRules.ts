export const getCssRules = (
  uid: string,
  direction: string,
  validColors: string,
  animation?: "transition" | "follow-mouse",
) => css`
  .gradient-text-${uid} {
    color: transparent;
    -webkit-background-clip: text;
    background-clip: text;
    background-image: -webkit-gradient(${direction}, ${validColors});
    background-image: -o-linear-gradient(${direction}, ${validColors});
    background-image: linear-gradient(${direction}, ${validColors});
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

export const css = (strings: TemplateStringsArray, ...args: unknown[]) =>
  strings.reduce(
    (acc, string, index) =>
      acc + string + (index < args.length ? args[index] : ""),
    "",
  )
