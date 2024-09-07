import React from "react";
import Chef from "./models/Chef";
import Menu from "./Menu";
import { useControls } from "leva";
import Button3D from "./Button3D";

type Props = {};

const MenuExperience = (props: Props) => {
  const { menuExpPos } = useControls({
    menuExpPos: { value: [0, 0, 0], step: 0.2 },
  });
  return (
    <group position={menuExpPos}>
      <Chef scale={2.5} />
      <Menu position={[-2.4, 1.75, 0]}>
        <Button3D color="#512da8" width={1.75} height={0.75}>
          Start Game
        </Button3D>
        <Button3D color="#512da8" width={1.75} height={0.75}>
          Learn How
        </Button3D>
      </Menu>
    </group>
  );
};

export default MenuExperience;
