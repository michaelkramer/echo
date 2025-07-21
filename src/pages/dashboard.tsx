// import { Outlet } from "react-router";
import { Box, Container, Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect } from "react";
import { useAuth } from "../components/auth/useAuth";
import { Logout } from "../components/logout/logout";

export async function clientLoader(): Promise<any> {
  const data = await (await fetch("/api/userEngagement")).json();

  return data.map((item: any, index: number) => ({
    id: index,
    screen: item.screen,
    durationSeconds: item.durationSeconds,
  }));
}

export default function Dashboard({ loaderData }: { loaderData: any }) {
  const { authUser } = useAuth();
  // const [userEngagement, setUserEngagement] = useState<any>([]);

  const columns = [
    { field: "id", headerName: "Id", width: 90 },
    { field: "screen", headerName: "Screen", width: 200 },
    { field: "durationSeconds", headerName: "Duration", flex: 1 },
  ];

  useEffect(() => {
    document.title = "Dashboard";
    // fetch("/api/userEngagement").then((res) => {
    //   setUserEngagement(res.json());
    // });
  }, []);

  if (!authUser) {
    return (
      <div>
        Loading...
        <Logout />
      </div>
    );
  }
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
            <div>
              <div className="text-sm text-gray-600">
                User Engagement: {loaderData.length} items
              </div>
              <DataGrid
                rows={loaderData}
                columns={columns}
                density="compact"
              ></DataGrid>
            </div>
            <Logout />
          </div>
        </Paper>
      </Box>
    </Container>
  );
}
