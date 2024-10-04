import { currentCameraStateAtom } from "@/constants/constants";
import { useFrame } from "@react-three/fiber";
import { useAtomValue } from "jotai";
import { damp3, dampQ } from "maath/easing";
import { useEffect, useMemo } from "react";
import { Euler, Quaternion, Vector3 } from "three";

type CameraControllerProps = {
  debug: boolean;
};

const CameraController = ({ debug }: CameraControllerProps) => {
  if (debug) return null;

  const cameraState = useAtomValue(currentCameraStateAtom);
  const statePosVector = useMemo(() => new Vector3(), []);
  const stateRotEuler = useMemo(() => new Euler(), []);
  const stateRotQuat = useMemo(() => new Quaternion(), []);

  useEffect(() => {
    statePosVector.fromArray(cameraState.position);
    // Apply rotations around global axes with quaternions
    stateRotEuler.setFromVector3(cameraState.rotation as Vector3, "YXZ");
    stateRotQuat.setFromEuler(stateRotEuler);
  }, [cameraState]);

  useFrame((state, delta) => {
    damp3(state.camera.position, cameraState.position, 0.3, delta);
    dampQ(state.camera.quaternion, stateRotQuat, 0.3, delta);
  });

  return null;
};

export default CameraController;
