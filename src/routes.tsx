import {
  type RouteConfig,
  route,
  index,
  layout,
  prefix,
} from "@react-router/dev/routes";

export default [
  ...prefix("/", [
    // route("home", "./pages/home.tsx"),
    layout("./layout/global-layout.tsx", [index("./pages/home.tsx")]),
    layout("./layout/main-layout.tsx", [
      route("dashboard", "./pages/dashboard.tsx"),
      route("activities", "./pages/activities/activities.component.tsx"),
      route(
        "activities/:activityId",
        "./pages/activities/activity.component.tsx",
      ),
      route("users", "./pages/users/users.component.tsx"),
      route("users/:userId", "./pages/users/user.component.tsx"),
      route("users/create", "./pages/users/create-user.component.tsx"),
      route("users/group/:userId", "./pages/users/group.component.tsx"),
      route(
        "users/group/:userId/assign",
        "./pages/users/group-assign.component.tsx",
      ),
    ]),

    // * matches all URLs, the ? makes it optional so it will match / as well
    route("*?", "catchall.tsx"),
  ]),
] satisfies RouteConfig;
