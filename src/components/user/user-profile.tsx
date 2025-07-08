import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import {
  Grid,
  Paper,
  Typography,
  IconButton,
  TextField as MuiTextField,
} from "@mui/material";
import dayjs from "dayjs";
import React from "react";
import { User } from "../../services/users.service";
import { titleCase } from "../../utilities/string";

export interface UserProfileProps {
  user: User;
  onEdit?: (...args: any[]) => void;
}

function TextField({
  id,
  type,
  value,
  label,
}: {
  id: string;
  type?: string;
  value: string;
  label?: string;
}) {
  return (
    <MuiTextField
      id={id}
      name={id}
      defaultValue={value}
      size="small"
      variant="standard"
      label={label ?? titleCase(id)}
      type={type}
      fullWidth
    />
  );
}

export function UserProfile({ user, onEdit }: UserProfileProps) {
  const [editProfile, setEditProfile] = React.useState(false);

  const handleEditProfile = (event) => {
    setEditProfile(!editProfile);
    if (onEdit) {
      event.preventDefault();
      onEdit(new FormData(event.currentTarget));
    }
  };

  const editFields = ["email", "phone_number"];

  return (
    <Paper
      component="form"
      onSubmit={handleEditProfile}
      elevation={3}
      sx={{
        padding: 2,
        marginTop: 2,
        background: "inherit",
        width: "100%",
      }}
    >
      <Grid container>
        <Grid size="grow">
          {editProfile ? (
            <TextField
              id="display_name"
              type="text"
              value={user.display_name}
              label="Name"
            />
          ) : (
            <Typography variant="h5" component="div">
              {user.display_name}
            </Typography>
          )}
        </Grid>
        {onEdit && (
          <Grid size={2} sx={{ display: "flex", justifyContent: "flex-end" }}>
            {editProfile && (
              <IconButton size="small" type="submit">
                <SaveIcon />
              </IconButton>
            )}
            {!editProfile && (
              <IconButton
                size="small"
                onClick={() => setEditProfile(!editProfile)}
              >
                <EditIcon />
              </IconButton>
            )}
          </Grid>
        )}
      </Grid>
      {editFields.map((field) => (
        <React.Fragment key={field}>
          {editProfile ? (
            <Grid size={12}>
              <TextField id={field} type="text" value={user[field]} />
            </Grid>
          ) : (
            <Grid size={12}>{user[field]}</Grid>
          )}
        </React.Fragment>
      ))}
      {editProfile ? (
        <Grid container>
          <Grid size={12}>
            <TextField
              id="address_street"
              type="text"
              value={(user.address && user.address.street) ?? ""}
            />
          </Grid>
          <Grid size={8}>
            <TextField
              id="address_city"
              type="text"
              value={user.address?.city ?? ""}
            />
          </Grid>
          <Grid size={4}>
            <TextField
              id="address_state"
              type="text"
              value={user.address?.state ?? ""}
            />
          </Grid>
          <Grid size={12}>
            <TextField
              id="address_zip"
              type="text"
              value={user.address?.zip ?? ""}
            />
          </Grid>
        </Grid>
      ) : (
        user.address &&
        user.address.street && (
          <Grid container>
            <Grid size={12}>{user.address?.street}</Grid>
            <Grid size={12}>
              {user.address?.city}, {user.address?.state} {user.address?.zip}
            </Grid>
          </Grid>
        )
      )}
      {!editProfile && (
        <>
          <Grid size={12}>
            <Typography variant="body2">
              Created:{" "}
              {dayjs.unix(user.created_time.seconds).format("MM/DD/YYYY")}
            </Typography>
          </Grid>
          {user.updated_time && (
            <Grid size={12}>
              <Typography variant="body2">
                Last Updated:{" "}
                {dayjs.unix(user.updated_time.seconds).format("MM/DD/YYYY")}
              </Typography>
            </Grid>
          )}
        </>
      )}
    </Paper>
  );
}
