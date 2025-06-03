import SaveIcon from "@mui/icons-material/Save";
import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { Form } from "react-router";
import {
  Activity,
  getActivity,
  updateActivity,
} from "../../services/activities.service";
import { Route } from "../../types/root";

export async function clientLoader({
  params,
}: {
  params: { activityId: string };
}): Promise<Activity> {
  const data = await getActivity(params.activityId);
  return data;
}

export async function clientAction({
  request,
  params,
}: Route.ClientActionArgs) {
  const { activityId } = params;
  if (activityId) {
    const formData = await request.formData();
    const data = {};
    for (const [key, value] of formData.entries()) {
      data[key] = value;
    }
    console.log("data", data);
    const response = await updateActivity(activityId, data as Activity);
    console.log("data", response);
  }
}

export default function Component({
  loaderData,
  actionData,
}: {
  loaderData: Activity;
  actionData: string;
}) {
  const [data, setData] = React.useState<Activity>(loaderData);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

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
            Activity {actionData}
          </Typography>
          <Form method="post">
            <Grid
              container
              spacing={2}
              columns={12}
              sx={{ mb: (theme) => theme.spacing(2) }}
            >
              <Grid size={12} sx={{ mb: (theme) => theme.spacing(2) }}>
                <TextField
                  name="title"
                  label="Title"
                  value={data.title}
                  variant="standard"
                  fullWidth
                  onChange={handleChange}
                />
              </Grid>
              <Grid size={6} sx={{ mb: (theme) => theme.spacing(2) }}>
                <TextField
                  name="category"
                  label="Category"
                  value={data.category}
                  variant="standard"
                  fullWidth
                  onChange={handleChange}
                />
              </Grid>
              <Grid size={6} sx={{ mb: (theme) => theme.spacing(2) }}>
                <TextField
                  name="weight"
                  label="Weight"
                  value={data.weight}
                  variant="standard"
                  fullWidth
                  onChange={handleChange}
                />
              </Grid>
              <Grid size={12} sx={{ mb: (theme) => theme.spacing(2) }}>
                <TextField
                  name="description"
                  label="Description"
                  variant="standard"
                  value={data.description}
                  multiline
                  rows={4}
                  fullWidth
                  onChange={handleChange}
                />
              </Grid>
              <Grid size={12} sx={{ mb: (theme) => theme.spacing(2) }}>
                <TextField
                  name="EXERCISE"
                  label="Excersise"
                  variant="standard"
                  value={data.EXERCISE}
                  multiline
                  rows={6}
                  fullWidth
                  onChange={handleChange}
                />
              </Grid>
              <Grid size={12} sx={{ mb: (theme) => theme.spacing(2) }}>
                <TextField
                  name="HowtoUseit"
                  label="How to use it"
                  variant="standard"
                  value={data.HowtoUseit}
                  multiline
                  rows={4}
                  fullWidth
                  onChange={handleChange}
                />
              </Grid>
              <Grid size={12} sx={{ mb: (theme) => theme.spacing(2) }}>
                <TextField
                  name="Howdoesitwork"
                  label="How does it work"
                  variant="standard"
                  value={data.Howdoesitwork}
                  multiline
                  rows={4}
                  fullWidth
                  onChange={handleChange}
                />
              </Grid>
              <Grid size={12} sx={{ mb: (theme) => theme.spacing(2) }}>
                <TextField
                  name="Whatsitfor"
                  label="What is it for"
                  variant="standard"
                  value={data.Whatsitfor}
                  multiline
                  rows={4}
                  fullWidth
                  onChange={handleChange}
                />
              </Grid>
              <Grid size={12} sx={{ mb: (theme) => theme.spacing(2) }}>
                <TextField
                  name="WhentoUseit"
                  label="When to use it"
                  variant="standard"
                  value={data.WhentoUseit}
                  multiline
                  rows={4}
                  fullWidth
                  onChange={handleChange}
                />
              </Grid>
              <Grid
                size={12}
                sx={{ mb: (theme) => theme.spacing(2), textAlign: "right" }}
              >
                <Button
                  color="secondary"
                  variant="contained"
                  aria-label="Save"
                  type="submit"
                  sx={{
                    position: "fixed",
                    left: "85%",
                    bottom: "5%",
                  }}
                >
                  <SaveIcon sx={{ mr: 1 }} />
                  Save
                </Button>
              </Grid>
            </Grid>
          </Form>
        </Paper>
      </Box>
    </Container>
  );
}
