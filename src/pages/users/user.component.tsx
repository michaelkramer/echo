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
import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import dayjs from "dayjs";
import { getJournalEntiresByUserId, getUser, User } from "./users.service";

interface UserData {
  user: User;
  journalEntires: any[];
}

export async function clientLoader({
  params,
}: {
  params: any;
}): Promise<UserData> {
  return {
    user: await getUser(params.userId),
    journalEntires: await getJournalEntiresByUserId(params.userId),
  };
}

export default function component({
  params,
  loaderData,
}: {
  params: any;
  loaderData: UserData;
}) {
  const { user, journalEntires } = loaderData;

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
      {/* <Box sx={{ mt: 2 }}>
        
      </Box> */}
    </Container>
  );
}
