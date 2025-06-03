import { CssBaseline } from "@mui/material";
import AppTheme from "../shared-theme/AppTheme";
import { dataGridStyles } from "./theme";

const xThemeComponents = {
  ...dataGridStyles,
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
