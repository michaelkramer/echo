import { Button } from "@mui/material";
import { useNavigate } from "react-router";
import { fbAuth } from "../../firebase";
import { useAuth } from "../auth/useAuth";

export function Logout() {
  const navigate = useNavigate();
  const { authUser, setAuthUser } = useAuth();

  const handleLogout = async () => {
    try {
      await fbAuth.signOut();
      setAuthUser(null);
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  if (!authUser) {
    return <></>;
  }

  return (
    <Button variant="contained" onClick={handleLogout}>
      Logout
    </Button>
  );
}
