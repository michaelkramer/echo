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
  "/echo/*?": {};
};