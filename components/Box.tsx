import { useCannon } from "@/hooks/useCannon";
import * as CANNON from "cannon-es";

type BoxProps = {
  position: [number, number, number];
  width: number;
  height: number;
  depth: number;
};

const Box = ({ position, width, height, depth }: BoxProps) => {
  const ref = useCannon({ mass: 10 }, (body) => {
    body.addShape(
      new CANNON.Box(new CANNON.Vec3(width * 0.5, height * 0.5, depth * 0.5))
    );
    body.position.set(...position);
  });
  return (
    <mesh ref={ref}>
      <boxGeometry attach="geometry" args={[width, height, depth]} />
      <meshBasicMaterial attach="material" />
    </mesh>
  );
};

export default Box;
