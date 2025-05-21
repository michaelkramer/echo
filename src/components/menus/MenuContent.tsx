import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import { Link, useLocation } from "react-router";

const mainListItems = [
  { text: "Home", icon: <HomeRoundedIcon />, route: "/home" },
  { text: "Users", icon: <PeopleRoundedIcon />, route: "/users" },
  { text: "Activities", icon: <AssignmentRoundedIcon />, route: "/activities" },
];

// const secondaryListItems = [
//   { text: "Settings", icon: <SettingsRoundedIcon /> },
//   { text: "About", icon: <InfoRoundedIcon /> },
//   { text: "Feedback", icon: <HelpRoundedIcon /> },
// ];

export default function MenuContent() {
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string): boolean => {
    const regex = new RegExp(`^${path}`);
    return regex.test(currentPath);
  };

  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: "space-between" }}>
      <List dense>
        {mainListItems.map((item, index) => (
          <ListItem
            key={index}
            disablePadding
            sx={{ display: "block" }}
            component={Link}
            to={item.route}
          >
            <ListItemButton selected={isActive(item.route)}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      {/* <List dense>
        {secondaryListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: "block" }}>
            <ListItemButton>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List> */}
    </Stack>
  );
}
