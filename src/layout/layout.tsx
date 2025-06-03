import { CssBaseline } from "@mui/material";
import { ThemeOptions } from "@mui/material/styles";
import AppTheme from "../shared-theme/AppTheme";
import { dataGridStyles } from "./theme";

const xThemeComponents = {
  ...(dataGridStyles as NonNullable<ThemeOptions["components"]>),
};

export default function Layout(props: {
  disableCustomTheme?: boolean;
  children: React.ReactNode;
}) {
  return (
    <AppTheme {...props} themeComponents={xThemeComponents}>
      <CssBaseline />
      {props.children}
    </AppTheme>
  );
}
