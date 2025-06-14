// import { Outlet } from "react-router";
import { useAuth } from "../components/auth/useAuth";
import { Logout } from "../components/logout/logout";

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
    <div className="flex flex-col items-center justify-center min-h-60 bg-gray-200">
      <div>
        <div>Display Name: {authUser.display_name}</div>
      </div>
      <div className="text-xl font-semibold mt-4">Dashboard</div>
      <Logout />
    </div>
  );
}
