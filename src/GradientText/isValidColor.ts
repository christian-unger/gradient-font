export const isValidColor = (color: string) => {
  const style = new Option().style;
  style.color = color;
  return style.color !== "";
};
