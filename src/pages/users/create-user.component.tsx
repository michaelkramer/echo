import {
  Box,
  FormControl,
  FormLabel,
  TextField,
  Button,
  Paper,
  Container,
} from "@mui/material";
import { useSnackbar } from "notistack";
import React from "react";
import { useNavigate } from "react-router";
import { ROUTES } from "../../constant/routes";
import { createAuthUser } from "../../services/auth.service";

export default function CreateUser() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState("");
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState("");
  const [nameError, setNameError] = React.useState(false);
  const [nameErrorMessage, setNameErrorMessage] = React.useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (emailError || passwordError) {
      return;
    }
    const data = new FormData(event.currentTarget);

    const email = data.get("email");
    const password = data.get("password");
    const name = data.get("name");
    if (!email || !password || !name) {
      enqueueSnackbar("Please fill in all required fields.", {
        variant: "error",
      });
      return;
    }

    const newUser = {
      email: email.toString(),
      password: password.toString(),
      displayName: name.toString(),
    };

    const newUserResponse = await createAuthUser(newUser);
    if (newUserResponse === "success") {
      enqueueSnackbar(`New user created.`, {
        variant: "success",
      });
    } else {
      enqueueSnackbar(`Error creating user: ${newUserResponse}`, {
        variant: "error",
      });
      return;
    }
    navigate(ROUTES.USERS);
  };

  const validateInputs = () => {
    const email = document.getElementById("email") as HTMLInputElement;
    const password = document.getElementById("password") as HTMLInputElement;
    const displayName = document.getElementById("name") as HTMLInputElement;

    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage("Please enter a valid email address.");
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage("");
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage("Password must be at least 6 characters long.");
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
    }

    if (!displayName.value || displayName.value.trim() === "") {
      setNameError(true);
      setNameErrorMessage("Name is missing.");
      isValid = false;
    } else {
      setNameError(false);
      setNameErrorMessage("");
    }

    return isValid;
  };

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
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              gap: 2,
            }}
          >
            <FormControl>
              <FormLabel htmlFor="name">Name</FormLabel>
              <TextField
                error={nameError}
                helperText={nameErrorMessage}
                id="name"
                type="text"
                name="name"
                placeholder="Your Name"
                autoComplete="name"
                autoFocus
                required
                fullWidth
                variant="outlined"
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <TextField
                error={emailError}
                helperText={emailErrorMessage}
                id="email"
                type="email"
                name="email"
                placeholder="your@email.com"
                autoComplete="email"
                autoFocus
                required
                fullWidth
                variant="outlined"
                color={emailError ? "error" : "primary"}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>
              <TextField
                error={passwordError}
                helperText={passwordErrorMessage}
                name="password"
                placeholder="••••••"
                type="password"
                id="password"
                autoComplete="current-password"
                autoFocus
                required
                fullWidth
                variant="outlined"
                color={passwordError ? "error" : "primary"}
              />
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={validateInputs}
            >
              Create User
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}
