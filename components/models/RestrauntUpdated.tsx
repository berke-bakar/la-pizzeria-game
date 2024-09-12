import * as THREE from "three";
import React from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { Asset } from "expo-asset";

type GLTFResult = GLTF & {
  nodes: {
    Plane: THREE.Mesh;
    group82117970: THREE.Mesh;
    group89637921: THREE.Mesh;
    group111804077: THREE.Mesh;
    group151101300: THREE.Mesh;
    group155036193: THREE.Mesh;
    group203751680: THREE.Mesh;
    mesh208636820: THREE.Mesh;
    mesh208636820_1: THREE.Mesh;
    group230377105: THREE.Mesh;
    group258196573: THREE.Mesh;
    mesh262347198: THREE.Mesh;
    mesh262347198_1: THREE.Mesh;
    mesh262347198_2: THREE.Mesh;
    group289584945: THREE.Mesh;
    group374344625: THREE.Mesh;
    group413354371: THREE.Mesh;
    group457263712: THREE.Mesh;
    group582095594: THREE.Mesh;
    group588249960: THREE.Mesh;
    group782781842: THREE.Mesh;
    group804660210: THREE.Mesh;
    group837453337: THREE.Mesh;
    group868746569: THREE.Mesh;
    group871399932: THREE.Mesh;
    mesh897139678: THREE.Mesh;
    mesh897139678_1: THREE.Mesh;
    group899477785: THREE.Mesh;
    group942987327: THREE.Mesh;
    group947786005: THREE.Mesh;
    group1013365616: THREE.Mesh;
    group1155477327: THREE.Mesh;
    group1160868208: THREE.Mesh;
    group1169870396: THREE.Mesh;
    group1239501184: THREE.Mesh;
    group1352653514: THREE.Mesh;
    mesh1358954356: THREE.Mesh;
    mesh1358954356_1: THREE.Mesh;
    group1400917886: THREE.Mesh;
    group1514811710: THREE.Mesh;
    group1519458107: THREE.Mesh;
    mesh1588648866: THREE.Mesh;
    mesh1588648866_1: THREE.Mesh;
    group1593933401: THREE.Mesh;
    group1598448926: THREE.Mesh;
    group1621815010: THREE.Mesh;
    group1649154586: THREE.Mesh;
    group1665736462: THREE.Mesh;
    group1690989685: THREE.Mesh;
    group1706430347: THREE.Mesh;
    group1723768818: THREE.Mesh;
    group1729645765: THREE.Mesh;
    group1751452465: THREE.Mesh;
    group1771706762: THREE.Mesh;
    group1791783657: THREE.Mesh;
    group1830093567: THREE.Mesh;
    group1832824718: THREE.Mesh;
    group1873420653: THREE.Mesh;
    group1887801654: THREE.Mesh;
    group1940092288: THREE.Mesh;
    group1987141327: THREE.Mesh;
    group2018543394: THREE.Mesh;
    group2069866459: THREE.Mesh;
    group2081224890: THREE.Mesh;
    group2086790902: THREE.Mesh;
    group2118802549: THREE.Mesh;
    group2131526348: THREE.Mesh;
    group2134067596: THREE.Mesh;
    group2136125216: THREE.Mesh;
    mesh1358954356001: THREE.Mesh;
    mesh1358954356001_1: THREE.Mesh;
    board_cutting_board001_Cube117: THREE.Mesh;
    ["wall-window-wide-square001"]: THREE.Mesh;
    ["(%ignore)001"]: THREE.Mesh;
    ["(%ignore)002"]: THREE.Mesh;
    ["wall-window-wide-square003"]: THREE.Mesh;
    ["wall-window-wide-square002"]: THREE.Mesh;
    ["wall-window-wide-square004"]: THREE.Mesh;
    Cube: THREE.Mesh;
    Cube001: THREE.Mesh;
    Cube002: THREE.Mesh;
    Cube003: THREE.Mesh;
    Cube004: THREE.Mesh;
    Cube005: THREE.Mesh;
    Cube006: THREE.Mesh;
    Cube007: THREE.Mesh;
    Cube008: THREE.Mesh;
    Cube009: THREE.Mesh;
    Cube010: THREE.Mesh;
    Cube011: THREE.Mesh;
    Cube012: THREE.Mesh;
    Cube013: THREE.Mesh;
    ["Node-Mesh"]: THREE.Mesh;
    ["Node-Mesh_1"]: THREE.Mesh;
    ["Node-Mesh_2"]: THREE.Mesh;
    ["Node-Mesh001"]: THREE.Mesh;
    ["Node-Mesh001_1"]: THREE.Mesh;
    Node002: THREE.Mesh;
    Node003: THREE.Mesh;
    Node004: THREE.Mesh;
    Node006: THREE.Mesh;
    lid: THREE.Mesh;
    pizzaBox: THREE.Mesh;
  };
  materials: {
    yellow: THREE.MeshStandardMaterial;
    mat15: THREE.MeshStandardMaterial;
    mat22: THREE.MeshStandardMaterial;
    mat19: THREE.MeshStandardMaterial;
    mat20: THREE.MeshStandardMaterial;
    mat23: THREE.MeshStandardMaterial;
    mat18: THREE.MeshStandardMaterial;
    ["mat21.001"]: THREE.MeshStandardMaterial;
    mat5: THREE.MeshStandardMaterial;
    mat3: THREE.MeshStandardMaterial;
    mat12: THREE.MeshStandardMaterial;
    mat21: THREE.MeshStandardMaterial;
    mat16: THREE.MeshStandardMaterial;
    mat24: THREE.MeshStandardMaterial;
    mat7: THREE.MeshStandardMaterial;
    ["Solid.092"]: THREE.MeshStandardMaterial;
    colormap: THREE.MeshStandardMaterial;
    glass: THREE.MeshStandardMaterial;
    ["colormap.001"]: THREE.MeshStandardMaterial;
    Material: THREE.MeshStandardMaterial;
    ["mat17.001"]: THREE.MeshStandardMaterial;
    ["mat16.001"]: THREE.MeshStandardMaterial;
    ["mat15.001"]: THREE.MeshStandardMaterial;
    ["mat24.001"]: THREE.MeshStandardMaterial;
    ["lambert5SG.001"]: THREE.MeshStandardMaterial;
    _defaultMat: THREE.MeshStandardMaterial;
  };
};

export function RestrauntUpdated(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF(
    Asset.fromModule("../../assets/models/restrauntUpdated.glb").uri
  ) as GLTFResult;
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane.geometry}
        material={materials.yellow}
        position={[1.497, -0.025, -8.049]}
        scale={[1, 1, 1.031]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.group82117970.geometry}
        material={materials.mat15}
        position={[10.712, 2.773, 4.063]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.group89637921.geometry}
        material={materials.mat22}
        position={[-2.405, 1.598, -1.335]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.group111804077.geometry}
        material={materials.mat22}
        position={[-1.774, 0.659, -0.876]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.group151101300.geometry}
        material={materials.mat19}
        position={[0.438, 1.19, -2.575]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.group155036193.geometry}
        material={materials.mat22}
        position={[7.586, 2.585, 3.933]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.group203751680.geometry}
        material={materials.mat20}
        position={[8.564, 0.877, -1.763]}
      />
      <group position={[10.982, 5.622, 3.312]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.mesh208636820.geometry}
          material={materials.mat23}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.mesh208636820_1.geometry}
          material={materials.mat22}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.group230377105.geometry}
        material={materials.mat18}
        position={[9.401, 1.509, -1.871]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.group258196573.geometry}
        material={materials.mat22}
        position={[-5.297, 1.51, -0.754]}
      />
      <group
        position={[-1.643, 3.766, -3.497]}
        rotation={[Math.PI, -0.436, Math.PI]}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.mesh262347198.geometry}
          material={materials["mat21.001"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.mesh262347198_1.geometry}
          material={materials.mat5}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.mesh262347198_2.geometry}
          material={materials.mat3}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.group289584945.geometry}
        material={materials.mat23}
        position={[-2.382, 1.388, -1.362]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.group374344625.geometry}
        material={materials.mat23}
        position={[6.02, 1.318, 2.739]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.group413354371.geometry}
        material={materials.mat22}
        position={[11.471, 6.825, 3.755]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.group457263712.geometry}
        material={materials.mat12}
        position={[6.912, 4.387, 4.054]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.group582095594.geometry}
        material={materials.mat21}
        position={[6.614, 4.325, 4.075]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.group588249960.geometry}
        material={materials.mat22}
        position={[6.979, 0.887, 2.879]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.group782781842.geometry}
        material={materials.mat23}
        position={[11.198, 2.287, 2.605]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.group804660210.geometry}
        material={materials.mat21}
        position={[0.419, 2.362, -2.134]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.group837453337.geometry}
        material={materials.mat15}
        position={[8.768, 2.53, 3.334]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.group868746569.geometry}
        material={materials.mat15}
        position={[10.842, 2.271, 2.725]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.group871399932.geometry}
        material={materials.mat22}
        position={[10.649, 6.789, 3.795]}
      />
      <group position={[5.179, 1.335, -10.708]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.mesh897139678.geometry}
          material={materials.mat5}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.mesh897139678_1.geometry}
          material={materials.mat23}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.group899477785.geometry}
        material={materials.mat22}
        position={[-2.385, 2.67, -1.718]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.group942987327.geometry}
        material={materials.mat23}
        position={[12.413, 2.287, 2.605]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.group947786005.geometry}
        material={materials.mat20}
        position={[7.729, 0.715, -1.744]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.group1013365616.geometry}
        material={materials.mat18}
        position={[9.282, 0.829, -1.891]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.group1155477327.geometry}
        material={materials.mat20}
        position={[-5.237, 1.145, -1.423]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.group1160868208.geometry}
        material={materials.mat16}
        position={[-4.508, 2.178, -2.152]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.group1169870396.geometry}
        material={materials.mat18}
        position={[7.193, 4.07, 4.192]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.group1239501184.geometry}
        material={materials.mat18}
        position={[-4.933, 1.571, -1.301]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.group1352653514.geometry}
        material={materials.mat24}
        position={[11.87, 1.479, 3.146]}
      />
      <group position={[1.506, 3.955, 4.427]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.mesh1358954356.geometry}
          material={materials.mat20}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.mesh1358954356_1.geometry}
          material={materials.mat12}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.group1400917886.geometry}
        material={materials["mat21.001"]}
        position={[-1.713, 2.778, -3.592]}
        rotation={[Math.PI, -0.436, Math.PI]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.group1514811710.geometry}
        material={materials.mat21}
        position={[7.935, 4.45, 4.017]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.group1519458107.geometry}
        material={materials.mat19}
        position={[-7.484, 4.595, 3.151]}
      />
      <group position={[6.054, 1.373, 3.742]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.mesh1588648866.geometry}
          material={materials.mat5}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.mesh1588648866_1.geometry}
          material={materials.mat23}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.group1593933401.geometry}
        material={materials.mat22}
        position={[-7.18, 1.376, 2.848]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.group1598448926.geometry}
        material={materials.mat23}
        position={[9.861, 2.287, 2.605]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.group1621815010.geometry}
        material={materials.mat22}
        position={[-7.363, 4.231, 2.119]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.group1649154586.geometry}
        material={materials.mat22}
        position={[-6.269, 1.51, -0.754]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.group1665736462.geometry}
        material={materials.mat23}
        position={[10.833, 2.287, 2.605]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.group1690989685.geometry}
        material={materials.mat7}
        position={[7.03, 4.535, 4.059]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.group1706430347.geometry}
        material={materials.mat19}
        position={[-7.545, 5.688, 3.091]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.group1723768818.geometry}
        material={materials.mat23}
        position={[10.651, 2.287, 3.637]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.group1729645765.geometry}
        material={materials.mat12}
        position={[7.864, 4.158, 3.956]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.group1751452465.geometry}
        material={materials.mat24}
        position={[11.81, 0.534, 3.27]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.group1771706762.geometry}
        material={materials.mat19}
        position={[-7.423, 3.502, 3.151]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.group1791783657.geometry}
        material={materials.mat22}
        position={[7.653, 1.887, 3.369]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.group1830093567.geometry}
        material={materials.mat22}
        position={[-3.596, 1.51, -0.754]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.group1832824718.geometry}
        material={materials.mat19}
        position={[-7.849, 1.376, 1.329]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.group1873420653.geometry}
        material={materials.mat22}
        position={[8.405, 0.887, 2.879]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.group1887801654.geometry}
        material={materials.mat23}
        position={[12.048, 2.287, 2.605]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.group1940092288.geometry}
        material={materials.mat22}
        position={[-3.111, 0.659, -0.876]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.group1987141327.geometry}
        material={materials.mat23}
        position={[1.927, 1.664, 3.397]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.group2018543394.geometry}
        material={materials.mat22}
        position={[7.631, 3.031, 3.777]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.group2069866459.geometry}
        material={materials.mat21}
        position={[-1.715, 3.318, -3.54]}
        rotation={[Math.PI, -0.436, Math.PI]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.group2081224890.geometry}
        material={materials.mat15}
        position={[11.866, 1.254, 3.492]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.group2086790902.geometry}
        material={materials.mat22}
        position={[-2.343, 2.252, -1.864]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.group2118802549.geometry}
        material={materials.mat23}
        position={[9.497, 2.287, 2.605]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.group2131526348.geometry}
        material={materials.mat15}
        position={[9.852, 1.232, 3.522]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.group2134067596.geometry}
        material={materials.mat15}
        position={[12.777, 2.53, 3.394]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.group2136125216.geometry}
        material={materials.mat24}
        position={[9.857, 1.45, 3.172]}
      />
      <group position={[-10.227, 3.955, -6.849]} rotation={[0, -1.57, 0]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.mesh1358954356001.geometry}
          material={materials.mat20}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.mesh1358954356001_1.geometry}
          material={materials.mat12}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.board_cutting_board001_Cube117.geometry}
        material={materials["Solid.092"]}
        position={[0.141, 2.569, -3.152]}
        scale={0.214}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["wall-window-wide-square001"].geometry}
        material={materials.colormap}
        position={[1.594, -0.023, -18.295]}
        rotation={[0, -1.571, 0]}
        scale={[1.782, 3.287, 2.317]}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["(%ignore)001"].geometry}
          material={materials.glass}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["(%ignore)002"].geometry}
          material={materials.glass}
        />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["wall-window-wide-square003"].geometry}
        material={materials["colormap.001"]}
        position={[1.594, -0.023, -18.295]}
        rotation={[0, -1.571, 0]}
        scale={[1.782, 3.287, 2.317]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["wall-window-wide-square002"].geometry}
        material={materials.colormap}
        position={[1.594, -0.023, -18.295]}
        rotation={[0, -1.571, 0]}
        scale={[1.782, 3.287, 2.317]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["wall-window-wide-square004"].geometry}
        material={materials["colormap.001"]}
        position={[1.594, -0.023, -18.295]}
        rotation={[0, -1.571, 0]}
        scale={[1.782, 3.287, 2.317]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube.geometry}
        material={materials.Material}
        position={[1.556, 2.711, -4.589]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube001.geometry}
        material={materials.Material}
        position={[1.556, 3.016, -4.995]}
        rotation={[Math.PI / 6, 0, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube002.geometry}
        material={materials.Material}
        position={[1.881, 2.711, -4.589]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube003.geometry}
        material={materials.Material}
        position={[2.206, 2.711, -4.589]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube004.geometry}
        material={materials.Material}
        position={[2.531, 2.711, -4.589]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube005.geometry}
        material={materials.Material}
        position={[2.856, 2.711, -4.589]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube006.geometry}
        material={materials.Material}
        position={[3.181, 2.711, -4.589]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube007.geometry}
        material={materials.Material}
        position={[3.506, 2.711, -4.589]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube008.geometry}
        material={materials.Material}
        position={[1.881, 3.016, -4.995]}
        rotation={[Math.PI / 6, 0, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube009.geometry}
        material={materials.Material}
        position={[2.206, 3.016, -4.995]}
        rotation={[Math.PI / 6, 0, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube010.geometry}
        material={materials.Material}
        position={[2.531, 3.016, -4.995]}
        rotation={[Math.PI / 6, 0, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube011.geometry}
        material={materials.Material}
        position={[2.856, 3.016, -4.995]}
        rotation={[Math.PI / 6, 0, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube012.geometry}
        material={materials.Material}
        position={[3.181, 3.016, -4.995]}
        rotation={[Math.PI / 6, 0, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube013.geometry}
        material={materials.Material}
        position={[3.506, 3.016, -4.995]}
        rotation={[Math.PI / 6, 0, 0]}
      />
      <group position={[4.088, 2.868, 3.091]} scale={[3.235, 3.924, 3.219]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Node-Mesh"].geometry}
          material={materials["mat17.001"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Node-Mesh_1"].geometry}
          material={materials["mat16.001"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Node-Mesh_2"].geometry}
          material={materials["mat15.001"]}
        />
      </group>
      <group
        position={[5.126, 3.466, 1.949]}
        rotation={[-Math.PI, -1.015, Math.PI / 2]}
        scale={[3.924, 3.235, 2.232]}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Node-Mesh001"].geometry}
          material={materials["mat15.001"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Node-Mesh001_1"].geometry}
          material={materials["mat24.001"]}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Node002.geometry}
        material={materials["mat16.001"]}
        position={[4.136, 3.106, 3.091]}
        scale={[3.262, 3.235, 3.219]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Node003.geometry}
        material={materials["mat16.001"]}
        position={[4.136, 2.132, 3.091]}
        scale={[3.262, 3.235, 3.219]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Node004.geometry}
        material={materials["mat16.001"]}
        position={[4.136, 1.261, 3.091]}
        scale={[3.262, 3.235, 3.219]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Node006.geometry}
        material={materials["lambert5SG.001"]}
        position={[6.047, 2.601, -3.473]}
        rotation={[0, -1.571, 0]}
        scale={[0.356, 1, 0.356]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.lid.geometry}
        material={materials._defaultMat}
        position={[6.092, 2.657, -4.59]}
        rotation={[-0.262, -Math.PI / 2, 0]}
        scale={2.457}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.pizzaBox.geometry}
        material={materials._defaultMat}
        position={[6.047, 2.481, -3.501]}
        rotation={[0, -1.571, 0]}
        scale={2.457}
      />
    </group>
  );
}

useGLTF.preload(
  Asset.fromModule(require("../../assets/models/restrauntUpdated.glb")).uri
);
