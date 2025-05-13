import { Avatar, Box, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { getUser, User } from "../../pages/users/users.service";
import OptionsMenu from "../menus/OptionsMenu";
import { useAuth } from "./useAuth";

export function AuthUser() {
  const [user, setUser] = useState<User>({} as User);
  const { email, uid } = useAuth().user || {};

  useEffect(() => {
    const fetchUser = async () => {
      if (uid) {
        const userData = await getUser(uid);
        console.log("AuthUser", userData);
        setUser(userData);
      }
    };
    fetchUser();
  }, [uid]);

  return (
    <>
      <Avatar
        sizes="small"
        alt={user.display_name || "User Name"}
        src="/static/images/avatar/7.jpg"
        sx={{ width: 36, height: 36 }}
      />
      <Box sx={{ mr: "auto", overflowX: "hidden" }}>
        <Typography
          variant="body2"
          sx={{ fontWeight: 500, lineHeight: "16px" }}
        >
          {user.display_name || "User Name"}
        </Typography>
        <Typography variant="caption" sx={{ color: "text.secondary" }}>
          {email || ""}
        </Typography>
      </Box>
      <OptionsMenu uid={uid || ""} />
    </>
  );
}
