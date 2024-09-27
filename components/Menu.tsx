import React from "react";
import { Float } from "@react-three/drei/native";

const Menu = (props: JSX.IntrinsicElements["group"]) => {
  const MENU_ITEM_SPACING = 0.2;
  return (
    <group {...props}>
      <Float floatIntensity={1.5}>
        {React.Children.toArray(props.children)
          .toReversed()
          .map((child, ind) => {
            if (React.isValidElement(child)) {
              return React.cloneElement(child, {
                key: ind,
                // @ts-ignore
                "position-y": ind * (MENU_ITEM_SPACING + 0.5) + 0.25,
              });
            }
          })}
      </Float>
    </group>
  );
};

export default Menu;
