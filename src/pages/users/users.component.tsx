import { Box, Container, Paper, Typography } from "@mui/material";
import { DataGrid, GridEventListener } from "@mui/x-data-grid";
import dayjs from "dayjs";
import { Timestamp } from "firebase/firestore";
import { useNavigate } from "react-router";
import { ROUTES } from "../../constant/routes";
import { getUsers, User } from "../../services/users.service";

export function clientLoader() {
  return getUsers();
}

export default function Users({ loaderData }: { loaderData: User[] }) {
  const navigate = useNavigate();
  const rows = loaderData as User[];

  const handleRowClick: GridEventListener<"rowClick"> = (params) => {
    navigate(ROUTES.USER(params.row.id));
  };

  const columns = [
    { field: "display_name", headerName: "Name", flex: 1, onclickable: true },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "role", headerName: "Role", flex: 1 },
    {
      field: "created_time",
      headerName: "Start Date",
      flex: 1,
      valueFormatter: (value?: Timestamp) => {
        if (value == null) {
          return "";
        }
        return `${dayjs.unix(value.seconds).format("MM/DD/YYYY")}`;
      },
    },
  ];

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
          <Typography variant="h5" component="div" sx={{ mb: 2 }}>
            Users
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
            sx={{
              "&.MuiDataGrid-root .MuiDataGrid-row:hover": {
                cursor: "pointer",
              },
            }}
          />
        </Paper>
      </Box>
    </Container>
  );
}
