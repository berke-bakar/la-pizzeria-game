import * as CANNON from "cannon-es";
import { Vector3, Vector3Like } from "three";

export type CollisionEvent = {
  body: CANNON.Body;
  contact: CANNON.ContactEquation;
  target: CANNON.Body;
  type: "collide";
};

export type State = {
  position: [number, number, number];
  rotation: Vector3Like;
};

export type GamePhase = {
  phase: string;
  subphase: string;
  specialButtonText?: string;
  nextButtonText?: string;
};

export type ToppingType = { id: number | number[]; initialPos: Vector3 };
