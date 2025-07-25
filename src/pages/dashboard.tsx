// import { Outlet } from "react-router";
import { Box, Container, Paper } from "@mui/material";
import { LineChart } from "@mui/x-charts";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect } from "react";
import { useAuth } from "../components/auth/useAuth";
import { Logout } from "../components/logout/logout";

export async function clientLoader(): Promise<any> {
  //const data = await (await fetch("/api/userEngagement")).json();

  const report = await (await fetch("/api/aggregateReport")).json();

  return {
    // userEngagement: data.map((item: any, index: number) => ({
    //   id: index,
    //   screen: item.screen,
    //   durationSeconds: item.durationSeconds,
    // })),
    aggregateReport: report.reports.map((item: any, index: number) => ({
      id: index,
      label: item.label,
      data: item.data,
    })),
    churn: report.churn,
  };
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
            {loaderData.aggregateReport.map((report: any, index: number) => (
              <LineChart
                key={index}
                xAxis={[
                  {
                    dataKey: "x",
                  },
                ]}
                yAxis={[
                  {
                    dataKey: "y",
                  },
                ]}
                series={[
                  {
                    data: report.data.map((d) => d.y),
                    type: "line",
                    label: report.label,
                  },
                ]}
                dataset={report.data}
                height={300}
              />
            ))}

            {/* <div>
              <div className="text-sm text-gray-600">
                User Engagement: {loaderData.userEngagement.length} items
              </div>
              <DataGrid
                rows={loaderData.userEngagement}
                columns={columns}
                density="compact"
              ></DataGrid>
            </div> */}
            <Logout />
          </div>
        </Paper>
      </Box>
    </Container>
  );
}
