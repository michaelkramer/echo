import { Container, Box, Paper, Typography, Button, Grid } from "@mui/material";
import { DataGrid, GridRowSelectionModel } from "@mui/x-data-grid";
import { useState } from "react";
import { useSubmit } from "react-router";
import { setUserGroup, getUserGroup } from "../../services/userGroups.service";
import { getUser, getUsers, User } from "../../services/users.service";
import { Route } from "../../types/root";

interface GroupData {
  clinician: User;
  users: User[];
  clients?: string[];
}

export async function clientAction({ request }: Route.ClientActionArgs) {
  const formData = await request.formData();
  const userId = formData.get("userId");
  const clientUserIds = formData.get("clientUserIds");
  if (!userId) {
    console.error("userId is missing");
    return;
  }
  await setUserGroup(
    userId.toString(),
    clientUserIds ? clientUserIds.toString().split(",") : [],
  );
  console.log("userId", userId, "clientUserIds", clientUserIds);
  return;
}

export async function clientLoader({
  params,
}: {
  params: { userId: string };
}): Promise<GroupData> {
  const data = await getUsers();
  return {
    clinician: await getUser(params.userId),
    users: data.filter((user) => user.role === null || user.role === undefined),
    clients: await getUserGroup(params.userId),
  };
}

export default function Group({ loaderData }: { loaderData: GroupData }) {
  const { clinician, users, clients } = loaderData;
  const submit = useSubmit();
  const [selection, setSelection] = useState<string[]>(clients || []);
  const [rowSelectionModel, setRowSelectionModel] =
    useState<GridRowSelectionModel>({ type: "include", ids: new Set(clients) });

  const handleAssign = async () => {
    // Handle the assign action here
    console.log("handleAssign", JSON.stringify(selection));
    await submit(
      {
        userId: clinician.uid,
        clientUserIds: selection,
      },
      {
        method: "post",
      },
    );
  };

  const columns = [
    { field: "display_name", headerName: "Name", flex: 1, onclickable: true },
    { field: "email", headerName: "Email", flex: 1 },
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
          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid size="grow">
              <Typography variant="h5" component="div" sx={{ mb: 2 }}>
                Assign Clients to {clinician.display_name}
              </Typography>
            </Grid>
            <Grid size={2} sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button variant="contained" size="small" onClick={handleAssign}>
                Assign
              </Button>
            </Grid>
          </Grid>

          <DataGrid
            rows={users}
            columns={columns}
            checkboxSelection
            initialState={{
              pagination: { paginationModel: { pageSize: 20 } },
            }}
            pageSizeOptions={[10, 20, 50]}
            disableColumnResize
            density="compact"
            rowSelectionModel={rowSelectionModel}
            onRowSelectionModelChange={(
              selectedRows: GridRowSelectionModel,
            ) => {
              setRowSelectionModel(selectedRows);
              setSelection([...selectedRows.ids.values()].map(String));
            }}
          />
        </Paper>
      </Box>
    </Container>
  );
}
