import { FormControl, FormLabel, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
// import OutlinedInput from "@mui/material/OutlinedInput";
import { sendPasswordResetEmail } from "firebase/auth";
import * as React from "react";
import { fbAuth } from "../../firebase";

interface ForgotPasswordProps {
  open: boolean;
  handleClose: () => void;
}

const DELAY_EMAIL_SENT = 10000;

export default function ForgotPassword({
  open,
  handleClose,
}: ForgotPasswordProps) {
  const [errorCode, setErrorCode] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [showSendEmail, setShowSendEmail] = React.useState(false);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      slotProps={{
        paper: {
          component: "form",
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const data = new FormData(event.currentTarget);
            const email = data.get("email");
            sendPasswordResetEmail(fbAuth, email as string)
              .then(() => {
                setShowSendEmail(true);
                setTimeout(() => {
                  setShowSendEmail(false);
                  handleClose();
                }, DELAY_EMAIL_SENT);
              })
              .catch((error) => {
                setErrorCode(error.code);
                setErrorMessage(error.message);
              });
          },
          sx: { backgroundImage: "none" },
        },
      }}
    >
      <DialogTitle>Reset password</DialogTitle>
      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {showSendEmail && (
          <DialogContentText>
            We have sent you an email with a link to reset your password.
          </DialogContentText>
        )}
        {!showSendEmail && (
          <>
            <DialogContentText>
              Enter your account&apos;s email address, and we&apos;ll send you a
              link to reset your password.
            </DialogContentText>
            <FormControl>
              <FormLabel htmlFor="email">Email address</FormLabel>
              <TextField
                name="email"
                placeholder="Email address"
                type="email"
                id="email"
                autoFocus
                required
                fullWidth
                variant="outlined"
              />
            </FormControl>
          </>
        )}
      </DialogContent>
      {errorCode && (
        <DialogContent sx={{ color: "error.main" }}>
          <DialogContentText>{errorMessage}</DialogContentText>
        </DialogContent>
      )}
      {!showSendEmail && (
        <DialogActions sx={{ pb: 3, px: 3 }}>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" type="submit">
            Continue
          </Button>
        </DialogActions>
      )}
    </Dialog>
  );
}
