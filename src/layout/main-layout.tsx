import { Stack, Box, Typography } from "@mui/material";
import Link from "@mui/material/Link";
import { alpha } from "@mui/material/styles";
import { SnackbarProvider } from "notistack";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import { AuthProvider } from "../components/auth/auth-provider";
import AppBreadcrumbs from "../components/breadcrumbs/breadcrumbs";
import SideMenu from "../components/menus/SideMenu";
import { ROUTES } from "../constant/routes";
import { fbAuth } from "../firebase";
import Layout from "./layout";
function Copyright() {
  return (
    <Typography
      variant="body2"
      align="center"
      sx={{
        color: "text.secondary",
      }}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Echo - Enhancing Care and Health Outcomes
      </Link>{" "}
      {new Date().getFullYear()}.
    </Typography>
  );
}

export default function MainLayout() {
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = fbAuth.onAuthStateChanged((user) => {
      if (!user) {
        console.warn("User is not logged in");
        navigate(ROUTES.LOGIN);
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  return (
    <Layout disableCustomTheme={false}>
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <AuthProvider>
          <div>Main Layout</div>
          <Box sx={{ display: "flex" }}>
            <SideMenu />

            {/*Main content */}
            <Box
              component="main"
              sx={(theme) => ({
                flexGrow: 1,
                backgroundColor: theme.vars
                  ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
                  : alpha(theme.palette.background.default, 1),
                overflow: "auto",
              })}
            >
              <Stack
                spacing={2}
                sx={{
                  alignItems: "center",
                  mx: 2,
                  pb: 5,
                  mt: { xs: 8, md: 0 },
                }}
              >
                {/* <Header /> */}
                <AppBreadcrumbs />
                <Outlet />
              </Stack>
              <Copyright />
            </Box>
          </Box>
        </AuthProvider>
      </SnackbarProvider>
    </Layout>
  );
}
