import { createTheme } from "@mui/material";
import {
  DARK_BLUE_COLOR,
  ERROR_COLOR,
  PRIMARY_COLOR,
  SUCCESS_COLOR,
  TRANSPARENT_WHITE_COLOR,
  WARNING_COLOR,
  WHITE_COLOR,
} from "./variable";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: PRIMARY_COLOR,
      contrastText: WHITE_COLOR,
    },
    secondary: {
      main: DARK_BLUE_COLOR,
      contrastText: WHITE_COLOR,
    },
    success: {
      main: SUCCESS_COLOR,
      contrastText: WHITE_COLOR,
    },
    warning: {
      main: WARNING_COLOR,
      contrastText: WHITE_COLOR,
    },
    error: {
      main: ERROR_COLOR,
      contrastText: WHITE_COLOR,
    },
  },
  typography: {
    // In Chinese and Japanese the characters are usually larger,
    // so a smaller fontsize may be appropriate.
    fontSize: 12,
    fontFamily: ["Open Sans"],
  },
  components: {
    // MuiBackdrop: {
    //   styleOverrides: {
    //     root: {
    //       backdropFilter: "blur(5px)",
    //       background: TRANSPARENT_WHITE_COLOR,
    //     },
    //   },
    // },
  },
});
