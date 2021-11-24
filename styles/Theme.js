// 1. Import `extendTheme`
import { extendTheme, theme as chakraTheme } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";
// aliases for breakpoints
const breakpoints = ["30rem", "48rem", "62rem", "80rem"];
[breakpoints.sm, breakpoints.md, breakpoints.lg, breakpoints.xl] = breakpoints;

const overRides = {
  ...chakraTheme,
  breakpoints,

  // custom components
  components: {
    Button: {
      baseStyle: {
        boxShadow: "none",
        _focus: { boxShadow: "none" },
        _hover: { bg: "none" },
      },
    },
  },
  // This is the default breakpoint
};
// const breakpointss = createBreakpoints({
//   sm: "320px",
//   md: "48em",
//   lg: "62em",
//   xl: "80em",
//   "2xl": "96em",
// });

// 2. Call `extendTheme` and pass your custom values
const customTheme = extendTheme(overRides);
// export customTheme
export default customTheme;
