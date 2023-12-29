// TODO: write documentation for colors and palette in own markdown file and add links from here

const palette = {
  neutral100: "#FFFFFF",
  neutral200: "#dedede",
  neutral300: "#bebebe",
  neutral400: "#9e9e9e",
  neutral500: "#808080",
  neutral600: "#636363",
  neutral700: "#484848",
  neutral800: "#2e2e2e",
  neutral900: "#161616",
  neutral: "#030303",

  primary: "#907a55",
  primary100: "#c6bba8",
  primary200: "#bbad97",
  primary300: "#b0a086",
  primary400: "#a59376",
  primary500: "#9b8765",
  primary600: "#907a55",
  primary700: "#7d6949",
  primary800: "#6a593d",
  primary900: "#6a593d",

  secondary100: "#DCDDE9",
  secondary200: "#BCC0D6",
  secondary300: "#9196B9",
  secondary400: "#626894",
  secondary500: "#41476E",

  accent100: "#FFEED4",
  accent200: "#FFE1B2",
  accent300: "#FDD495",
  accent400: "#FBC878",
  accent500: "#FFBB50",

  angry100: "#F2D6CD",
  angry500: "#C03403",

  overlay20: "rgba(25, 16, 21, 0.2)",
  overlay50: "rgba(25, 16, 21, 0.5)",
} as const

export const colors = {
  /**
   * The palette is available to use, but prefer using the name.
   * This is only included for rare, one-off cases. Try to use
   * semantic names as much as possible.
   */
  palette,
  /**
   * A helper for making something see-thru.
   */
  transparent: "rgba(0, 0, 0, 0)",
  /**
   * The default text color in many components.
   */
  text: palette.neutral900,
  /**
   * Secondary text information.
   */
  textDim: palette.neutral600,
  /**
   * The default color of the screen background.
   */
  primary: "#907A55",
  background: "#F7F8FA",
  secondary: "#757171",
  
  /**
   * The default border color.
   */
  border: palette.neutral400,
  /**
   * The main tinting color.
   */
  tint: palette.primary500,
  /**
   * A subtle color used for lines.
   */
  separator: palette.neutral300,
  /**
   * Error messages.
   */
  error: palette.angry500,
  /**
   * Error Background.
   *
   */
  errorBackground: palette.angry100,
}
