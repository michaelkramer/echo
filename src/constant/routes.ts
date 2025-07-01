const PREFIX = "/echo";

export const ROUTES = {
  HOME: `${PREFIX}/`,
  LOGIN: `${PREFIX}/`,
  DASHBOARD: `${PREFIX}/dashboard`,
  ACTIVITIES: `${PREFIX}/activities`,
  ACTIVITY: (activityId: string) => `${PREFIX}/activities/${activityId}`,
  USERS: `${PREFIX}/users`,
  USER: (userId: string) => `${PREFIX}/users/${userId}`,
  CREATE_USER: `${PREFIX}/users/create`,
  GROUP: `${PREFIX}/users/group`,
};
export const CATCHALL = `${PREFIX}/*`;
