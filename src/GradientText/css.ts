export const css = (strings: TemplateStringsArray, ...args: unknown[]) =>
  strings.reduce(
    (acc, string, index) =>
      acc + string + (index < args.length ? args[index] : ""),
    "",
  )
