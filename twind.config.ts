import {CSSObject, defineConfig, Preset} from 'twind/core'
import presetAutoprefix from "preset-autoprefix";
import twindPreset from "preset-tailwind";
import presetTypography from "preset-typography";
export const colors = {
  main: "#800856",
  blue: "#000082",
  light: "#ffffff99",
}

export const preflight : CSSObject = {
  "html": {
    scrollBehavior: "smooth",
  },
  "body": {
    minHeight: "100vh",
  },
  "header": {
    backdropFilter: "blur(10px)",
  },
}

export const twindConfig = defineConfig({
  darkMode: "class",
  hash: false,
  presets: [
    presetAutoprefix() as Preset<unknown>,
    twindPreset() as Preset<unknown>,
    presetTypography() as Preset<unknown>,
  ],
  theme: {
    extend: {
      colors,
      textColor: colors,
      backgroundColor: colors,
    },
  },
  variants: [
    ["active", "[active]"],
  ],
  rules: [],
  preflight,
})