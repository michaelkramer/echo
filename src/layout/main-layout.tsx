import { Stack, Box, Typography } from "@mui/material";
import Link from "@mui/material/Link";
import { alpha } from "@mui/material/styles";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import { AuthProvider } from "../components/auth/auth-provider";
import AppBreadcrumbs from "../components/breadcrumbs/breadcrumbs";
import SideMenu from "../components/menus/SideMenu";

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
        Your Website
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
        console.log("User is not logged in");
        // navigate("/");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  return (
    <Layout disableCustomTheme={false}>
      <AuthProvider>
        <div>Main Layout</div>
        <Box sx={{ display: "flex" }}>
          <SideMenu />

          {/*Main content */}
          <Box
            component="main"
            sx={(theme: any) => ({
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
    </Layout>
  );
}
