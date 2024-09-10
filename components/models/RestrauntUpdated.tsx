import * as THREE from "three";
import React from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { Asset } from "expo-asset";

type GLTFResult = GLTF & {
  nodes: {
    Node005: THREE.Mesh;
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
    ["lambert5SG.001"]: THREE.MeshStandardMaterial;
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
        geometry={nodes.Node005.geometry}
        material={materials["lambert5SG.001"]}
        position={[1.676, 2.529, 7.972]}
        rotation={[0, 1.571, 0]}
        scale={[0.356, 1, 0.356]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane.geometry}
        material={materials.yellow}
        position={[-0.903, -0.025, -3.049]}
        scale={[1, 1, 1.031]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.group82117970.geometry}
        material={materials.mat15}
        position={[8.312, 2.773, 9.063]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.group89637921.geometry}
        material={materials.mat22}
        position={[-4.805, 1.889, 3.379]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.group111804077.geometry}
        material={materials.mat22}
        position={[-4.174, 0.95, 3.838]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.group151101300.geometry}
        material={materials.mat19}
        position={[-1.962, 1.19, 2.425]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.group155036193.geometry}
        material={materials.mat22}
        position={[5.186, 2.585, 8.933]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.group203751680.geometry}
        material={materials.mat20}
        position={[6.164, 0.877, 3.237]}
      />
      <group position={[8.582, 5.622, 8.312]}>
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
        position={[7.001, 1.509, 3.129]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.group258196573.geometry}
        material={materials.mat22}
        position={[-7.697, 1.801, 3.96]}
      />
      <group
        position={[-4.043, 3.766, 1.503]}
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
        position={[-4.782, 1.679, 3.352]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.group374344625.geometry}
        material={materials.mat23}
        position={[3.62, 1.318, 7.739]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.group413354371.geometry}
        material={materials.mat22}
        position={[9.071, 6.825, 8.755]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.group457263712.geometry}
        material={materials.mat12}
        position={[4.512, 4.387, 9.054]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.group582095594.geometry}
        material={materials.mat21}
        position={[4.214, 4.325, 9.075]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.group588249960.geometry}
        material={materials.mat22}
        position={[4.579, 0.887, 7.879]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.group782781842.geometry}
        material={materials.mat23}
        position={[8.798, 2.287, 7.605]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.group804660210.geometry}
        material={materials.mat21}
        position={[-1.981, 2.362, 2.866]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.group837453337.geometry}
        material={materials.mat15}
        position={[6.368, 2.53, 8.334]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.group868746569.geometry}
        material={materials.mat15}
        position={[8.442, 2.271, 7.725]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.group871399932.geometry}
        material={materials.mat22}
        position={[8.249, 6.789, 8.795]}
      />
      <group position={[2.779, 1.335, -5.708]}>
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
        position={[-4.785, 2.961, 2.997]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.group942987327.geometry}
        material={materials.mat23}
        position={[10.013, 2.287, 7.605]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.group947786005.geometry}
        material={materials.mat20}
        position={[5.329, 0.715, 3.256]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.group1013365616.geometry}
        material={materials.mat18}
        position={[6.882, 0.829, 3.109]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.group1155477327.geometry}
        material={materials.mat20}
        position={[-7.637, 1.436, 3.292]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.group1160868208.geometry}
        material={materials.mat16}
        position={[-6.908, 2.469, 2.563]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.group1169870396.geometry}
        material={materials.mat18}
        position={[4.793, 4.07, 9.192]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.group1239501184.geometry}
        material={materials.mat18}
        position={[-7.333, 1.861, 3.413]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.group1352653514.geometry}
        material={materials.mat24}
        position={[9.47, 1.479, 8.146]}
      />
      <group position={[-0.894, 3.955, 9.427]}>
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
        position={[-4.113, 2.778, 1.408]}
        rotation={[Math.PI, -0.436, Math.PI]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.group1514811710.geometry}
        material={materials.mat21}
        position={[5.535, 4.45, 9.017]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.group1519458107.geometry}
        material={materials.mat19}
        position={[-9.884, 4.595, 8.151]}
      />
      <group position={[3.654, 1.373, 8.742]}>
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
        position={[-9.58, 1.376, 7.848]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.group1598448926.geometry}
        material={materials.mat23}
        position={[7.461, 2.287, 7.605]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.group1621815010.geometry}
        material={materials.mat22}
        position={[-9.763, 4.231, 7.119]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.group1649154586.geometry}
        material={materials.mat22}
        position={[-8.669, 1.801, 3.96]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.group1665736462.geometry}
        material={materials.mat23}
        position={[8.433, 2.287, 7.605]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.group1690989685.geometry}
        material={materials.mat7}
        position={[4.63, 4.535, 9.059]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.group1706430347.geometry}
        material={materials.mat19}
        position={[-9.945, 5.688, 8.091]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.group1723768818.geometry}
        material={materials.mat23}
        position={[8.251, 2.287, 8.637]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.group1729645765.geometry}
        material={materials.mat12}
        position={[5.464, 4.158, 8.956]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.group1751452465.geometry}
        material={materials.mat24}
        position={[9.41, 0.534, 8.27]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.group1771706762.geometry}
        material={materials.mat19}
        position={[-9.823, 3.502, 8.151]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.group1791783657.geometry}
        material={materials.mat22}
        position={[5.253, 1.887, 8.369]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.group1830093567.geometry}
        material={materials.mat22}
        position={[-5.996, 1.801, 3.96]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.group1832824718.geometry}
        material={materials.mat19}
        position={[-10.249, 1.376, 6.329]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.group1873420653.geometry}
        material={materials.mat22}
        position={[6.005, 0.887, 7.879]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.group1887801654.geometry}
        material={materials.mat23}
        position={[9.648, 2.287, 7.605]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.group1940092288.geometry}
        material={materials.mat22}
        position={[-5.511, 0.95, 3.838]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.group1987141327.geometry}
        material={materials.mat23}
        position={[-0.473, 1.664, 8.397]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.group2018543394.geometry}
        material={materials.mat22}
        position={[5.231, 3.031, 8.777]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.group2069866459.geometry}
        material={materials.mat21}
        position={[-4.115, 3.318, 1.46]}
        rotation={[Math.PI, -0.436, Math.PI]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.group2081224890.geometry}
        material={materials.mat15}
        position={[9.466, 1.254, 8.492]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.group2086790902.geometry}
        material={materials.mat22}
        position={[-4.743, 2.543, 2.85]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.group2118802549.geometry}
        material={materials.mat23}
        position={[7.097, 2.287, 7.605]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.group2131526348.geometry}
        material={materials.mat15}
        position={[7.452, 1.232, 8.522]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.group2134067596.geometry}
        material={materials.mat15}
        position={[10.377, 2.53, 8.394]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.group2136125216.geometry}
        material={materials.mat24}
        position={[7.457, 1.45, 8.172]}
      />
      <group position={[-12.627, 3.955, -1.849]} rotation={[0, -1.57, 0]}>
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
        position={[-2.259, 2.569, 1.848]}
        scale={0.214}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["wall-window-wide-square001"].geometry}
        material={materials.colormap}
        position={[-0.806, -0.023, -13.295]}
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
        position={[-0.806, -0.023, -13.295]}
        rotation={[0, -1.571, 0]}
        scale={[1.782, 3.287, 2.317]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["wall-window-wide-square002"].geometry}
        material={materials.colormap}
        position={[-0.806, -0.023, -13.295]}
        rotation={[0, -1.571, 0]}
        scale={[1.782, 3.287, 2.317]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["wall-window-wide-square004"].geometry}
        material={materials["colormap.001"]}
        position={[-0.806, -0.023, -13.295]}
        rotation={[0, -1.571, 0]}
        scale={[1.782, 3.287, 2.317]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube.geometry}
        material={materials.Material}
        position={[-0.844, 2.711, 0.411]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube001.geometry}
        material={materials.Material}
        position={[-0.844, 3.016, 0.005]}
        rotation={[Math.PI / 6, 0, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube002.geometry}
        material={materials.Material}
        position={[-0.519, 2.711, 0.411]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube003.geometry}
        material={materials.Material}
        position={[-0.194, 2.711, 0.411]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube004.geometry}
        material={materials.Material}
        position={[0.131, 2.711, 0.411]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube005.geometry}
        material={materials.Material}
        position={[0.456, 2.711, 0.411]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube006.geometry}
        material={materials.Material}
        position={[0.781, 2.711, 0.411]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube007.geometry}
        material={materials.Material}
        position={[1.106, 2.711, 0.411]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube008.geometry}
        material={materials.Material}
        position={[-0.519, 3.016, 0.005]}
        rotation={[Math.PI / 6, 0, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube009.geometry}
        material={materials.Material}
        position={[-0.194, 3.016, 0.005]}
        rotation={[Math.PI / 6, 0, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube010.geometry}
        material={materials.Material}
        position={[0.131, 3.016, 0.005]}
        rotation={[Math.PI / 6, 0, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube011.geometry}
        material={materials.Material}
        position={[0.456, 3.016, 0.005]}
        rotation={[Math.PI / 6, 0, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube012.geometry}
        material={materials.Material}
        position={[0.781, 3.016, 0.005]}
        rotation={[Math.PI / 6, 0, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube013.geometry}
        material={materials.Material}
        position={[1.106, 3.016, 0.005]}
        rotation={[Math.PI / 6, 0, 0]}
      />
      <group position={[1.688, 2.868, 8.091]} scale={[3.235, 3.924, 3.219]}>
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
        position={[2.726, 3.466, 6.949]}
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
        position={[1.736, 3.106, 8.091]}
        scale={[3.262, 3.235, 3.219]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Node003.geometry}
        material={materials["mat16.001"]}
        position={[1.736, 2.132, 8.091]}
        scale={[3.262, 3.235, 3.219]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Node004.geometry}
        material={materials["mat16.001"]}
        position={[1.736, 1.261, 8.091]}
        scale={[3.262, 3.235, 3.219]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Node006.geometry}
        material={materials["lambert5SG.001"]}
        position={[3.647, 2.601, 1.527]}
        rotation={[0, -1.571, 0]}
        scale={[0.356, 1, 0.356]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.lid.geometry}
        material={materials._defaultMat}
        position={[3.692, 2.657, 0.41]}
        rotation={[-0.262, -Math.PI / 2, 0]}
        scale={2.457}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.pizzaBox.geometry}
        material={materials._defaultMat}
        position={[3.647, 2.481, 1.499]}
        rotation={[0, -1.571, 0]}
        scale={2.457}
      />
    </group>
  );
}

useGLTF.preload(
  Asset.fromModule(require("../../assets/models/restrauntUpdated.glb")).uri
);
