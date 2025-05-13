import { Box, Container, Paper, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { Activity, getActivities } from "./activities.service";

export default function Activities() {
  const [rows, setRows] = useState<Activity[]>([]);
  const columns = [
    { field: "EXERCISE", headerName: "Exercise", flex: 1 },
    { field: "Howdoesitwork", headerName: "How Does It Work", flex: 1 },
    {
      field: "HowtoUseit",
      headerName: "How To Use It",
      flex: 1,
    },
    {
      field: "Whatsitfor",
      headerName: "Whats It For",
      flex: 1,
    },
    {
      field: "WhentoUseit",
      headerName: "When To Use It",
      flex: 1,
    },
    {
      field: "category",
      headerName: "Category",
      flex: 1,
    },
    { field: "description", headerName: "Description", flex: 1 },
    { field: "title", headerName: "Title", flex: 1 },
    { field: "weight", headerName: "Weight", flex: 1 },
  ];

  useEffect(() => {
    const fetchData = async () => {
      const data = await getActivities();
      setRows(data);
    };
    fetchData();
  });

  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
          Actvities
        </Typography>
      </Box>
      <Paper
        elevation={3}
        sx={{ padding: 2, margin: 0, background: "inherit", width: "100%" }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          getRowClassName={(params) =>
            params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
          }
          initialState={{
            pagination: { paginationModel: { pageSize: 20 } },
          }}
          pageSizeOptions={[10, 20, 50]}
          disableColumnResize
          density="compact"
        />
      </Paper>
    </Container>
  );
}
