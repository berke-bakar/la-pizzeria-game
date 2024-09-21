import * as THREE from "three";
import React, {
  useRef,
  useMemo,
  useContext,
  createContext,
  RefObject,
} from "react";
import { useGLTF, Merged } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { Asset } from "expo-asset";
import * as CANNON from "cannon-es";
import { useCannon } from "@/hooks/useCannon";
import { CollisionEvent } from "@/constants/types";

type GLTFResult = GLTF & {
  nodes: {
    Sausage: THREE.Mesh;
    Anchovies: THREE.Mesh;
    Bacon: THREE.Mesh;
    Chicken: THREE.Mesh;
    Ham: THREE.Mesh;
    Mushroom: THREE.Mesh;
    Olive_Slice_0: THREE.Mesh;
    Olive_Slice_1: THREE.Mesh;
    Onion: THREE.Mesh;
    Pepper_Slice_0: THREE.Mesh;
    Pepper_Slice_1: THREE.Mesh;
    Pepper_Slice_2: THREE.Mesh;
    Pickle: THREE.Mesh;
    Pineapple: THREE.Mesh;
    Salami: THREE.Mesh;
    Shrimp: THREE.Mesh;
    Tomato: THREE.Mesh;
  };
  materials: {
    Sausage: THREE.MeshBasicMaterial;
    Fish: THREE.MeshBasicMaterial;
    Bacon: THREE.MeshBasicMaterial;
    Chicken: THREE.MeshBasicMaterial;
    material_14: THREE.MeshBasicMaterial;
    Mushroom: THREE.MeshBasicMaterial;
    Oilives: THREE.MeshBasicMaterial;
    Onion: THREE.MeshBasicMaterial;
    Pepper: THREE.MeshBasicMaterial;
    Pickles: THREE.MeshBasicMaterial;
    Pineapple: THREE.MeshBasicMaterial;
    Salami: THREE.MeshBasicMaterial;
    Shrimp: THREE.MeshBasicMaterial;
    Tomato: THREE.MeshBasicMaterial;
  };
};

type ToppingModelTypes =
  | "Sausage"
  | "Anchovies"
  | "Bacon"
  | "Chicken"
  | "Ham"
  | "Mushroom"
  | "OliveSlice"
  | "OliveSlice1"
  | "Onion"
  | "PepperSlice"
  | "PepperSlice1"
  | "PepperSlice2"
  | "Pickle"
  | "Pineapple"
  | "Salami"
  | "Shrimp"
  | "Tomato";

type ToppingTypes =
  | Omit<
      ToppingModelTypes,
      | "OliveSlice"
      | "OliveSlice1"
      | "PepperSlice"
      | "PepperSlice1"
      | "PepperSlice2"
    >
  | "Peppers"
  | "Olives";

type ContextType = Record<
  ToppingModelTypes,
  React.ForwardRefExoticComponent<JSX.IntrinsicElements["mesh"]>
>;

const context = createContext({} as ContextType);

export function ToppingInstances({
  children,
  ...props
}: JSX.IntrinsicElements["group"]) {
  const { nodes } = useGLTF(
    Asset.fromModule(require("../../assets/models/toppings.glb")).uri
  ) as GLTFResult;
  const instances = useMemo(
    () => ({
      Sausage: nodes.Sausage,
      Anchovies: nodes.Anchovies,
      Bacon: nodes.Bacon,
      Chicken: nodes.Chicken,
      Ham: nodes.Ham,
      Mushroom: nodes.Mushroom,
      OliveSlice: nodes.Olive_Slice_0,
      OliveSlice1: nodes.Olive_Slice_1,
      Onion: nodes.Onion,
      PepperSlice: nodes.Pepper_Slice_0,
      PepperSlice1: nodes.Pepper_Slice_1,
      PepperSlice2: nodes.Pepper_Slice_2,
      Pickle: nodes.Pickle,
      Pineapple: nodes.Pineapple,
      Salami: nodes.Salami,
      Shrimp: nodes.Shrimp,
      Tomato: nodes.Tomato,
    }),
    [nodes]
  );

  return (
    <Merged meshes={instances} {...props}>
      {(instances: ContextType) => (
        <context.Provider value={instances} children={children} />
      )}
    </Merged>
  );
}

export function ToppingModel({
  toppingType,
  bodyId,
  ...props
}: JSX.IntrinsicElements["group"] & {
  toppingType: ToppingTypes;
  bodyId: number[];
}) {
  const instances = useContext<ContextType>(context);
  const bodyRefs = useRef<
    RefObject<
      | THREE.Mesh<
          THREE.BufferGeometry<THREE.NormalBufferAttributes>,
          THREE.Material | THREE.Material[],
          THREE.Object3DEventMap
        >
      | THREE.Group<THREE.Object3DEventMap>
    >[]
  >([]);

  bodyId.forEach((bodyIdVal, ind) => {
    // TODO: useMemo, it renders this multiple times

    bodyRefs.current[ind] = useCannon(
      { mass: 100 },
      (body, setBodyAvailable) => {
        body.addShape(new CANNON.Box(new CANNON.Vec3(0.02, 0.02, 0.02)));
        body.sleepSpeedLimit = 5;
        body.type = CANNON.BODY_TYPES.DYNAMIC;
        body.position.set(
          (props.position as THREE.Vector3).x,
          (props.position as THREE.Vector3).y,
          (props.position as THREE.Vector3).z
        );
        body.angularDamping = 0.1;
        body.applyTorque(
          new CANNON.Vec3(
            Math.random() * 50,
            Math.random() * 50,
            Math.random() * 50
          )
        );
        body.id = bodyIdVal;
        const timeoutId = setTimeout(() => {
          body.sleep();
          body.type = CANNON.BODY_TYPES.STATIC;
          setBodyAvailable(false);
        }, 5000);
        const handleCollide = (event: CollisionEvent) => {
          if (
            event.body.type === CANNON.BODY_TYPES.STATIC &&
            event.body.shapes[0].type === CANNON.SHAPE_TYPES.CYLINDER
          ) {
            event.target.collisionResponse = false;
            body.removeEventListener("collide", handleCollide);
            clearTimeout(timeoutId);
            event.target.sleep();
            event.target.type = CANNON.BODY_TYPES.STATIC;
            setBodyAvailable(false);
          } else if (
            event.body.type === CANNON.BODY_TYPES.STATIC &&
            event.body.shapes[0].type === CANNON.SHAPE_TYPES.PLANE
          ) {
            //TODO: Remove the toppings outside of the base
          }
        };
        body.addEventListener("collide", handleCollide);

        return () => {
          body.removeEventListener("collide", handleCollide);
        };
      },
      []
    );
  });

  if (toppingType === "Peppers") {
    return (
      <>
        <group
          ref={
            bodyRefs.current[0] as React.Ref<
              THREE.Group<THREE.Object3DEventMap>
            >
          }
          {...props}
          dispose={null}
          scale={0.01}
        >
          <instances.PepperSlice position={[0.03877, 0.00415, -0.09876]} />
        </group>
        <group
          ref={
            bodyRefs.current[1] as React.Ref<
              THREE.Group<THREE.Object3DEventMap>
            >
          }
          {...props}
          dispose={null}
          scale={0.01}
        >
          <instances.PepperSlice1 position={[-0.08624, 0.0043, 0.01997]} />
        </group>
        <group
          ref={
            bodyRefs.current[2] as React.Ref<
              THREE.Group<THREE.Object3DEventMap>
            >
          }
          {...props}
          dispose={null}
          scale={0.01}
        >
          <instances.PepperSlice2 position={[0.06813, 0.00428, 0.06279]} />
        </group>
      </>
    );
  } else if (toppingType === "Olives") {
    return (
      <>
        <group
          ref={
            bodyRefs.current[0] as React.Ref<
              THREE.Group<THREE.Object3DEventMap>
            >
          }
          dispose={null}
        >
          <instances.OliveSlice scale={0.01} />
        </group>
        <group
          ref={
            bodyRefs.current[1] as React.Ref<
              THREE.Group<THREE.Object3DEventMap>
            >
          }
          dispose={null}
        >
          <instances.OliveSlice1 scale={0.01} />
        </group>
      </>
    );
  } else {
    const InstanceModel = instances[toppingType as ToppingModelTypes];
    return (
      <group
        ref={
          bodyRefs.current[0] as React.Ref<THREE.Group<THREE.Object3DEventMap>>
        }
        {...props}
        dispose={null}
      >
        <InstanceModel scale={0.01} />
      </group>
    );
  }
}
useGLTF.preload(
  Asset.fromModule(require("../../assets/models/toppings.glb")).uri
);
