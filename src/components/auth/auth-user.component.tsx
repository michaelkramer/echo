import { Avatar, Box, Typography } from "@mui/material";
import OptionsMenu from "../menus/OptionsMenu";
import { useAuth } from "./useAuth";

export function AuthUser() {
  const { authUser } = useAuth();
  const { display_name, email, uid } = authUser || {};

  return (
    <>
      <Avatar
        sizes="small"
        alt={display_name || "User Name"}
        src="/static/images/avatar/7.jpg"
        sx={{ width: 36, height: 36 }}
      />
      <Box sx={{ mr: "auto", overflowX: "hidden" }}>
        <Typography
          variant="body2"
          sx={{ fontWeight: 500, lineHeight: "16px" }}
        >
          {display_name || "User Name"}
        </Typography>
        <Typography variant="caption" sx={{ color: "text.secondary" }}>
          {email || ""}
        </Typography>
      </Box>
      <OptionsMenu uid={uid || ""} />
    </>
  );
}
