interface BaseGradientTextProps {
  colors: string | string[]
  as?: "span" | "div" | "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
  animation?: "transition" | "follow-mouse"
  direction?: string
  style?: React.CSSProperties
  className?: string
}

interface GradientTextPropsWithChildren extends BaseGradientTextProps {
  children: string
  data?: never
}

interface GradientTextPropsWithData extends BaseGradientTextProps {
  children?: never
  data: string
}

type GradientTextProps =
  | GradientTextPropsWithChildren
  | GradientTextPropsWithData
