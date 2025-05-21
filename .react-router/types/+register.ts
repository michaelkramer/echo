import "react-router";

declare module "react-router" {
  interface Register {
    params: Params;
  }
}

type Params = {
  "/": {};
  "/home": {};
  "/activities": {};
  "/activities/:activityId": {
    "activityId": string;
  };
  "/users": {};
  "/users/:userId": {
    "userId": string;
  };
  "/*?": {};
};