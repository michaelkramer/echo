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
import dayjs from "dayjs";
import { useSnackbar } from "notistack";
import { useSubmit } from "react-router";
import { useAuth } from "../../components/auth/useAuth";
import { getJournalEntiresByUserId } from "../../services/journalEntires.service";
import { getUser, setUserRole, User } from "../../services/users.service";

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
}

export async function clientLoader({
  params,
}: {
  params: { userId: string };
}): Promise<UserData> {
  return {
    user: await getUser(params.userId),
    journalEntires: await getJournalEntiresByUserId(params.userId),
  };
}

export async function clientAction() {
  return;
}

export default function component({ loaderData }: { loaderData: UserData }) {
  const { user, journalEntires } = loaderData;
  const { enqueueSnackbar } = useSnackbar();
  const { isSuperAdmin, isAdmin } = useAuth();
  const submit = useSubmit();

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

  return (
    <Container>
      <Grid
        container
        spacing={2}
        columns={12}
        sx={{ mb: (theme) => theme.spacing(2) }}
      >
        <Grid size={4} sx={{ mb: (theme) => theme.spacing(2) }}>
          <Paper
            elevation={3}
            sx={{
              padding: 2,
              marginTop: 2,
              background: "inherit",
              width: "100%",
            }}
          >
            <Typography variant="h5" component="div" sx={{ mb: 2 }}>
              {user.display_name}
            </Typography>
            <div>{user.email}</div>
            <div>
              {dayjs.unix(user.created_time.seconds).format("MM/DD/YYYY")}
            </div>
          </Paper>
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
      </Grid>
      {user.role !== "SuperAdmin" && (isSuperAdmin || isAdmin) && (
        <Box sx={{ mt: 2 }}>
          <Typography color="text.secondary" sx={{ mt: 2 }}>
            Set User Roles
          </Typography>
          <ButtonGroup variant="contained" aria-label="Basic button group">
            {isSuperAdmin && (
              <Button onClick={handleSetRole}>SuperAdmin</Button>
            )}
            <Button
              onClick={handleSetRole}
              variant={user.role === "Admin" ? "outlined" : "contained"}
            >
              Admin
            </Button>
            <Button
              onClick={handleSetRole}
              variant={user.role === "Clinician" ? "outlined" : "contained"}
            >
              Clinician
            </Button>
            <Button
              onClick={handleSetRole}
              variant={!user.role ? "outlined" : "contained"}
            >
              Client
            </Button>
          </ButtonGroup>
        </Box>
      )}
      {user.role === "SuperAdmin" && (
        <Typography color="text.secondary" sx={{ mt: 2 }}>
          Super Admin users cannot be changed
        </Typography>
      )}
    </Container>
  );
}
