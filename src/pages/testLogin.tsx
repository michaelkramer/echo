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

  return (
    <div className="flex flex-col items-center justify-center min-h-60 bg-gray-200">
      <div>
        <div>Display Name: {authUser.displayName}</div>
      </div>
      <div className="text-xl font-semibold mt-4">Dashboard</div>
      <Logout />
    </div>
  );
}
