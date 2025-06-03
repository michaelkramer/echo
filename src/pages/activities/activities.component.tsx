import { Box, Container, Paper, Typography } from "@mui/material";
import { DataGrid, GridEventListener } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { ROUTES } from "../../constant/routes";
import { Activity, getActivities } from "../../services/activities.service";

export default function Component() {
  const navigate = useNavigate();
  const [rows, setRows] = useState<Activity[]>([]);
  const columns = [
    { field: "title", headerName: "Title", flex: 1 },
    {
      field: "category",
      headerName: "Category",
      flex: 1,
    },
  ];

  const handleRowClick: GridEventListener<"rowClick"> = (params) => {
    navigate(ROUTES.ACTIVITY(params.row.id));
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getActivities();
      setRows(data);
    };
    fetchData();
  });

  return (
    <Container>
      <Box sx={{ mt: 2 }}>
        <Paper
          elevation={3}
          sx={{ padding: 2, margin: 0, background: "inherit", width: "100%" }}
        >
          <Typography variant="h5" component="div" sx={{ mb: 2 }}>
            Actvities
          </Typography>
          <DataGrid
            rows={rows}
            columns={columns}
            onRowClick={handleRowClick}
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
      </Box>
    </Container>
  );
}
