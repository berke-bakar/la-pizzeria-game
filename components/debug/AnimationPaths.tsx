import { CatmullRomCurve3, LineCurve3, Vector3 } from "three";
import { Line } from "@react-three/drei/native";
import { useMemo } from "react";

const AnimationPath = ({ debug }: { debug: boolean }) => {
  if (!debug) return null;
  // Define a straight line path from door to cashier

  const paths = useMemo(
    () => ({
      customerPath1: new LineCurve3(
        new Vector3(0, 4, -18),
        new Vector3(0, 4, -6)
      ),
      customerPath2: new LineCurve3(
        new Vector3(0, 4, -6),
        new Vector3(6, 4, -6)
      ),
      customerPath3: new CatmullRomCurve3([
        new Vector3(6, 4, -6),
        new Vector3(5, 4, -12),
        new Vector3(3, 4, -12),
        new Vector3(0, 4, -18),
      ]),
      pizzaToOvenPath: new CatmullRomCurve3([
        new Vector3(2.5, 2.5, -3.2),
        new Vector3(2.5, 3, 1),
        new Vector3(3.3, 3.7, 3),
        new Vector3(4.1, 3.4, 5),
      ]),
      pizzaToBox: new CatmullRomCurve3([
        new Vector3(4.1, 3.4, 5),
        new Vector3(3.6, 3.7, 3),
        new Vector3(3.1, 3, 1),
        new Vector3(8, 2.5, -3.2),
      ]),
    }),
    []
  );

  return (
    <>
      <Line
        points={paths.customerPath1.getPoints(10)}
        color="red"
        lineWidth={3}
      />
      <Line
        points={paths.customerPath2.getPoints(10)}
        color="green"
        lineWidth={3}
      />
      <Line
        points={paths.customerPath3.getPoints(10)}
        color="blue"
        lineWidth={3}
      />
      <Line
        points={paths.pizzaToOvenPath.getPoints(10)}
        color="red"
        lineWidth={3}
      />
      <Line
        points={paths.pizzaToBox.getPoints(10)}
        color="green"
        lineWidth={3}
      />
    </>
  );
};

export default AnimationPath;
