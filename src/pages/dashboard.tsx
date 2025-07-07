// import { Outlet } from "react-router";
import { Box, Container, Paper } from "@mui/material";
import { useAuth } from "../components/auth/useAuth";
import { Logout } from "../components/logout/logout";
import { ENV } from "../utilities/env";

export default function Dashboard() {
  const { authUser } = useAuth();

  if (!authUser) {
    return (
      <div>
        Loading...
        <Logout />
      </div>
    );
  }
  console.log("env", import.meta.env);
  return (
    <Container>
      <Box sx={{ mt: 2 }}>
        <Paper
          elevation={3}
          sx={{
            padding: 2,
            margin: 0,
            background: "inherit",
            width: "100%",
          }}
        >
          <div className="flex flex-col items-center justify-center min-h-60 bg-gray-200">
            <div>
              <div>Display Name: {authUser.display_name}</div>
            </div>
            <div className="text-xl font-semibold mt-4">Dashboard</div>
            <Logout />
          </div>
        </Paper>
      </Box>
    </Container>
  );
}
