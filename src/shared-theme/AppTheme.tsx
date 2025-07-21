import { ThemeProvider, createTheme } from "@mui/material/styles";
import type { ThemeOptions } from "@mui/material/styles";
import * as React from "react";

interface AppThemeProps {
  children: React.ReactNode;
  /**
   * This is for the docs site. You can ignore it or remove it.
   */
  disableCustomTheme?: boolean;
  themeComponents?: ThemeOptions["components"];
}

// Augment the palette to include a tertiary color
declare module "@mui/material/styles" {
  interface Palette {
    tertiary: Palette["primary"];
  }

  interface PaletteOptions {
    tertiary?: PaletteOptions["primary"];
  }
}

// Update the Button's color options to include a tertiary option
declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    tertiary: true;
  }
}

export const themeOptions: ThemeOptions = {
  palette: {
    mode: "light",
    primary: {
      main: "#05347e",
      contrastText: "rgba(255,255,255,0.87)",
      light: "#479ece",
    },
    secondary: {
      main: "#479ece",
    },
    tertiary: {
      main: "#feda5e",
    },
    background: {
      paper: "#ffffff",
    },
  },
};

const myTheme = createTheme(themeOptions);

export default function AppTheme(props: AppThemeProps) {
  const { children, disableCustomTheme, themeComponents } = props;
  const theme = React.useMemo(() => {
    return disableCustomTheme ? {} : myTheme;
    //  createTheme(myTheme, {
    //     // For more details about CSS variables configuration, see https://mui.com/material-ui/customization/css-theme-variables/configuration/
    //     cssVariables: {
    //       // colorSchemeSelector: "data-mui-color-scheme",
    //       cssVarPrefix: "template",
    //     },
    //     colorSchemes, // Recently added in v6 for building light & dark mode app, see https://mui.com/material-ui/customization/palette/#color-schemes
    //     typography,
    //     shadows,
    //     shape,
    //     components: {
    //       ...inputsCustomizations,
    //       ...dataDisplayCustomizations,
    //       ...feedbackCustomizations,
    //       ...navigationCustomizations,
    //       ...surfacesCustomizations,
    //       ...themeComponents,
    //     },
    //   })
  }, [disableCustomTheme, themeComponents]);
  if (disableCustomTheme) {
    return <React.Fragment>{children}</React.Fragment>;
  }
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
