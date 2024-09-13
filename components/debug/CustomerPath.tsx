import { CatmullRomCurve3, LineCurve3, Vector3 } from "three";
// import { useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei/native";
import { useMemo } from "react";

const CustomerPath = ({ debug }: { debug: boolean }) => {
  if (!debug) return null;
  // Define a straight line path from door to cashier

  const paths = useMemo(
    () => ({
      path1: new LineCurve3(new Vector3(0, 4, -18), new Vector3(0, 4, -6)),
      path2: new LineCurve3(new Vector3(0, 4, -6), new Vector3(6, 4, -6)),
      path3: new CatmullRomCurve3([
        new Vector3(6, 4, -6),
        new Vector3(5, 4, -12),
        new Vector3(3, 4, -12),
        new Vector3(0, 4, -18),
      ]),
    }),
    []
  );

  return (
    <>
      <Line
        points={paths.path1.getPoints(10)}
        color="red"
        lineWidth={3}
        // dashed={true}
      />
      <Line points={paths.path2.getPoints(10)} color="green" lineWidth={3} />
      <Line points={paths.path3.getPoints(10)} color="blue" lineWidth={3} />
    </>
  );
};

export default CustomerPath;
