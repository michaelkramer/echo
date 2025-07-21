import "react-router";

declare module "react-router" {
  interface Register {
    params: Params;
  }
}

type Params = {
  "/": {};
  "/": {};
  "/dashboard": {};
  "/activities": {};
  "/activities/:activityId": {
    "activityId": string;
  };
  "/users": {};
  "/users/:userId": {
    "userId": string;
  };
  "/users/create": {};
  "/users/group/:userId": {
    "userId": string;
  };
  "/users/group/:userId/assign": {
    "userId": string;
  };
};