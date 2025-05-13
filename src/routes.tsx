import {
  type RouteConfig,
  route,
  index,
  layout,
} from "@react-router/dev/routes";

export default [
  layout("./layout/global-layout.tsx", [index("./pages/home.tsx")]),
  layout("./layout/main-layout.tsx", [
    route("home", "./pages/testLogin.tsx"),
    route("activities", "./pages/activities/index.tsx"),
    route("users", "./pages/users/users.component.tsx"),
    route("users/:userId", "./pages/users/user.component.tsx"),
  ]),

  // layout("./layout/main-layout.tsx", [
  //   index("./pages/home.tsx"),

  // ]),

  // * matches all URLs, the ? makes it optional so it will match / as well
  route("*?", "catchall.tsx"),
] satisfies RouteConfig;
