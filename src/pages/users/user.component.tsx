import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineOppositeContent,
  timelineOppositeContentClasses,
  TimelineSeparator,
} from "@mui/lab";
import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import dayjs from "dayjs";
import { useSnackbar } from "notistack";
import { useEffect } from "react";
import { Link, useSubmit, useActionData } from "react-router";
import { useAuth } from "../../components/auth/useAuth";
import { UserProfile } from "../../components/user/user-profile";
import { ROLES } from "../../constant/roles";
import { ROUTES } from "../../constant/routes";
import { getJournalEntiresByUserId } from "../../services/journalEntires.service";
// import { getSliderEntiresByUserId } from "../../services/sliderEntires.service";
import { getSliderEntiresByUserId } from "../../services/sliderEntires.service";
import { getUserGroup } from "../../services/userGroups.service";
import {
  getUser,
  setUserRole,
  User,
  getUsersById,
  updateUser,
} from "../../services/users.service";
import { SliderEntry } from "../../types/SliderEntry";
import { Route } from "../../types/root";

interface JournalEntry {
  id: string;
  updatedAt: { seconds: number };
  activityName: string;
  journalValue: string;
  // Add other fields as needed
}

interface UserData {
  user: User;
  journalEntires: JournalEntry[];
  sliderEntires?: SliderEntry[];
  userGroup?: User[];
}

export async function clientLoader({
  params,
}: {
  params: { userId: string };
}): Promise<UserData> {
  return {
    user: await getUser(params.userId),
    journalEntires: await getJournalEntiresByUserId(params.userId),
    sliderEntires: await getSliderEntiresByUserId(params.userId),
    userGroup: await getUsersById(await getUserGroup(params.userId)),
  };
}

export async function clientAction({
  params,
  request,
}: Route.ClientActionArgs) {
  const formData = await request.formData();
  try {
    const formEntries = Object.fromEntries(formData.entries() as any);
    formEntries.uid = params.userId ?? "";
    formEntries.id = params.userId ?? "";
    formEntries.address = {
      street: formEntries.address_street ?? "",
      city: formEntries.address_city ?? "",
      state: formEntries.address_state ?? "",
      zip: formEntries.address_zip ?? "",
    };
    return await updateUser(formEntries as User);
  } catch (error) {
    console.error("Error updating user:", error);
    return { success: false, message: "Error updating user" };
  }
}

export default function component({ loaderData }: { loaderData: UserData }) {
  const { user, journalEntires, sliderEntires, userGroup } = loaderData;
  const actionData = useActionData();
  const { enqueueSnackbar } = useSnackbar();
  const { isSuperAdmin, isAdmin, isClinician } = useAuth();
  const submit = useSubmit();
  console.log("sliderEntires", sliderEntires);

  const handleSetRole = async (event) => {
    const role = event.currentTarget.textContent;
    const result = await setUserRole(user.uid, role);
    if (result === "success") {
      enqueueSnackbar(`User role updated to ${role}`, {
        variant: "success",
      });
    } else {
      enqueueSnackbar("Error updating user role", {
        variant: "error",
      });
    }
    submit(null);
  };

  const handleEditProfile = (data) => {
    submit(data, {
      method: "post",
    });
  };

  useEffect(() => {
    if (actionData) {
      if (actionData.success) {
        enqueueSnackbar(actionData.message, { variant: "success" });
      } else {
        enqueueSnackbar(actionData.message, { variant: "error" });
      }
    }
  }, [actionData, enqueueSnackbar]);

  const myUserGroupColumns = [
    { field: "display_name", headerName: "Name", flex: 1, onclickable: true },
    { field: "email", headerName: "Email", flex: 1 },
  ];

  return (
    <Container>
      <Grid
        container
        spacing={2}
        columns={12}
        sx={{ mb: (theme) => theme.spacing(2) }}
      >
        <Grid size={4} sx={{ mb: (theme) => theme.spacing(2) }}>
          <UserProfile user={user} onEdit={handleEditProfile} />
        </Grid>
        <Grid size={8} sx={{ mb: (theme) => theme.spacing(2) }}>
          <Paper
            elevation={3}
            sx={{
              padding: 2,
              marginTop: 2,
              background: "inherit",
              width: "100%",
              overflowY: "scroll",
              maxHeight: "50vh",
            }}
          >
            <Timeline
              sx={{
                [`& .${timelineOppositeContentClasses.root}`]: {
                  flex: 0.2,
                },
              }}
            >
              {journalEntires.map((entry) => (
                <TimelineItem key={entry.id}>
                  <TimelineOppositeContent
                    color="text.secondary"
                    sx={{ fontSize: "0.8rem" }}
                  >
                    {dayjs
                      .unix(entry.updatedAt.seconds)
                      .format("MM/DD/YYYY  h:mm A")}
                  </TimelineOppositeContent>
                  <TimelineSeparator>
                    <TimelineDot />
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent>
                    <Box>
                      <Typography
                        variant="body1"
                        component="div"
                        sx={{ weight: 800 }}
                      >
                        {entry.activityName}
                      </Typography>
                      <Typography variant="body2" component="div">
                        {entry.journalValue}
                      </Typography>
                    </Box>
                  </TimelineContent>
                </TimelineItem>
              ))}
            </Timeline>
          </Paper>
        </Grid>
        {user.role != undefined &&
          user.role != null &&
          (isSuperAdmin || isAdmin || isClinician) && (
            <Grid size={12} sx={{ mb: (theme) => theme.spacing(2) }}>
              <Paper
                elevation={3}
                sx={{
                  padding: 2,
                  marginTop: 2,
                  background: "inherit",
                  width: "100%",
                }}
              >
                <Grid container spacing={2} sx={{ mb: 2 }}>
                  <Grid size="grow">
                    <Typography variant="h5" component="div" sx={{ mb: 2 }}>
                      Clients
                    </Typography>
                  </Grid>
                  <Grid sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <Button
                      size="small"
                      variant="text"
                      component={Link}
                      to={`${ROUTES.GROUP}/${user.uid}`}
                    >
                      Add Clients
                    </Button>
                  </Grid>
                </Grid>
                <DataGrid
                  rows={userGroup}
                  columns={myUserGroupColumns}
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
            </Grid>
          )}
      </Grid>
      {user.role !== ROLES.SUPER_ADMIN && (isSuperAdmin || isAdmin) && (
        <Box sx={{ mt: 2 }}>
          <Typography color="text.secondary" sx={{ mt: 2 }}>
            Set User Roles
          </Typography>
          <ButtonGroup variant="contained" aria-label="Basic button group">
            {isSuperAdmin && (
              <Button onClick={handleSetRole}>{ROLES.SUPER_ADMIN}</Button>
            )}
            <Button
              onClick={handleSetRole}
              variant={user.role === ROLES.ADMIN ? "outlined" : "contained"}
            >
              {ROLES.ADMIN}
            </Button>
            <Button
              onClick={handleSetRole}
              variant={user.role === ROLES.CLINICIAN ? "outlined" : "contained"}
            >
              {ROLES.CLINICIAN}
            </Button>
            <Button
              onClick={handleSetRole}
              variant={!user.role ? "outlined" : "contained"}
            >
              {ROLES.CLIENT}
            </Button>
          </ButtonGroup>
        </Box>
      )}
      {user.role === ROLES.SUPER_ADMIN && (
        <Typography color="text.secondary" sx={{ mt: 2 }}>
          Super Admin users cannot be changed
        </Typography>
      )}
    </Container>
  );
}
