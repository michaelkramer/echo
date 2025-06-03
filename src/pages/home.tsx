import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { redirect } from "react-router";
import { Login } from "../components/login/login";
import { ROUTES } from "../constant/routes";
import { isAuth } from "../services/isAuth";

export async function clientLoader() {
  // mock slow response from firebase
  await new Promise((resolve) =>
    setTimeout(() => {
      resolve(undefined);
    }, 2000),
  );
  const isLogged = await isAuth();
  if (isLogged) {
    return redirect(ROUTES.DASHBOARD);
  }
}

export default function Home() {
  return (
    <Container>
      <Box>
        <Login />
      </Box>
    </Container>
  );
}
