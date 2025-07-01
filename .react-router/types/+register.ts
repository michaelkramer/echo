import "react-router";

declare module "react-router" {
  interface Register {
    params: Params;
  }
}

type Params = {
  "/": {};
  "/echo": {};
  "/echo/dashboard": {};
  "/echo/activities": {};
  "/echo/activities/:activityId": {
    "activityId": string;
  };
  "/echo/users": {};
  "/echo/users/:userId": {
    "userId": string;
  };
  "/echo/users/create": {};
  "/echo/users/group/:userId": {
    "userId": string;
  };
  "/echo/users/group/:userId/assign": {
    "userId": string;
  };
  "/echo/*?": {};
};