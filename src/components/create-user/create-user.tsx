import {
  Box,
  FormControl,
  FormLabel,
  TextField,
  Button,
  DialogTitle,
  DialogContent,
  Dialog,
} from "@mui/material";
import React from "react";
import { createAuthUser } from "../../services/auth.service";

export function CreateUser() {
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState("");
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    console.log("handleSubmit");
    event.preventDefault();
    if (emailError || passwordError) {
      return;
    }
    const data = new FormData(event.currentTarget);
    console.log("data", data.get("email"));
    const newUser = {
      email: data.get("email")?.toString(),
      password: data.get("password")?.toString(),
    };
    const userCred = await createAuthUser(newUser);

    console.log("User created:", userCred);
  };

  const validateInputs = () => {
    const email = document.getElementById("email") as HTMLInputElement;
    const password = document.getElementById("password") as HTMLInputElement;

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

    return isValid;
  };

  return (
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
  );
}

export function CreateUserDialog(open: boolean, handleClose: () => void) {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Create New User</DialogTitle>
      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <CreateUser />
      </DialogContent>
    </Dialog>
  );
}
//       <Button
