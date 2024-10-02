import { useCannon } from "@/hooks/useCannon";
import * as CANNON from "cannon-es";

const Ground = (props: JSX.IntrinsicElements["mesh"]) => {
  const ref = useCannon(
    { mass: 0 },
    (body) => {
      const groundShape = new CANNON.Plane();
      body.addShape(groundShape);
      body.type = CANNON.BODY_TYPES.STATIC;
      if (props.position)
        body.position.set(...(props.position as [number, number, number]));
      body.quaternion.setFromEuler(-Math.PI / 2, 0, 0);
    },
    []
  );

  return null;
};

export default Ground;
