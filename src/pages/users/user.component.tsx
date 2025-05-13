import { Box, Container, Paper, Typography } from "@mui/material";
import { getUser, User } from "./users.service";

export function clientLoader({ params }: { params: any }): Promise<User> {
  return getUser(params.userId);
}

export default function component({
  params,
  loaderData,
}: {
  params: any;
  loaderData: User;
}) {
  return (
    <Container>
      <Box sx={{ mt: 2 }}>
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
            User
          </Typography>
          <div>{JSON.stringify(params)}</div>
          <div>{JSON.stringify(loaderData)}</div>
        </Paper>
      </Box>
    </Container>
  );
}
