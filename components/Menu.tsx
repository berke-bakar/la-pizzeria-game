import React from "react";
import { Billboard, Float } from "@react-three/drei/native";

const Menu = (props: JSX.IntrinsicElements["group"]) => {
  const MENU_ITEM_SPACING = 0.2;
  return (
    <group {...props} onClick={() => console.log("onClick")}>
      <Float>
        <Billboard>
          {React.Children.map(props.children, (child, ind) => {
            if (React.isValidElement(child)) {
              return React.cloneElement(child, {
                key: ind,
                // @ts-ignore
                position: [0, -ind * (MENU_ITEM_SPACING + 0.75), 0],
              });
            }
          })}
        </Billboard>
      </Float>
    </group>
  );
};

export default Menu;
