import { DefaultTheme } from "styled-components";

export const theme: DefaultTheme = Object.freeze({
  colors: {
    mainText: "#131313",
    secondText: "#8a8a8a",
    borderColor: "#cccccc",
    bg: "rgb(249, 250, 255)",
    bgComponent: "#ffffff",
    bgItems: "#fbfbfb",
    bgAddInfo: "#F8F9F9",
  },
  shadow: {
    shadowComponent: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
    shadowButton:
      "rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -2px 0px inset",
  },
});
