export const ROUTES = {
  HOME: "/echo",
  LOGIN: "/echo",
  DASHBOARD: "/echo/dashboard",
  ACTIVITIES: "/echo/activities",
  ACTIVITY: (activityId: string) => `/echo/activities/${activityId}`,
  USERS: "/echo/users",
  USER: (userId: string) => `/echo/users/${userId}`,
};
export const CATCHALL = "/echo/*";
