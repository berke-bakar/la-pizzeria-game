import * as CANNON from "cannon-es";

export type CollisionEvent = {
  body: CANNON.Body;
  contact: CANNON.ContactEquation;
  target: CANNON.Body;
  type: "collide";
};
