// https://github.com/schteppe/cannon.js/blob/master/tools/threejs/CannonDebugRenderer.js
// https://github.com/schteppe/cannon.js/tree/master/tools/threejs

import React, { useContext } from "react";
import { useThree, useFrame } from "@react-three/fiber/native";
import {
  MeshBasicMaterial,
  SphereGeometry,
  BoxGeometry,
  PlaneGeometry,
  CylinderGeometry,
  Mesh,
  BufferGeometry,
  Vector3,
  Quaternion,
  Scene,
  Float32BufferAttribute,
} from "three";
import * as CANNON from "cannon-es";
import { WorldContext } from "@/context/PhysicsProvider";

const cannonWireframeRenderer = (scene: Scene, world: CANNON.World) => {
  const _meshes: Mesh[] = [];
  const _material = new MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
  const _tempVec0 = new CANNON.Vec3();
  const _tempVec1 = new CANNON.Vec3();
  const _tempVec2 = new CANNON.Vec3();
  const _tempQuat0 = new CANNON.Quaternion();
  const _sphereGeometry = new SphereGeometry(1);
  const _boxGeometry = new BoxGeometry(1, 1, 1);
  const _planeGeometry = new PlaneGeometry(10, 10, 10, 10);
  // const _cylinderGeometry = new CylinderGeometry(0.5, 0.5, 1, 32);

  const _typeMatch = (mesh: Mesh, shape: CANNON.Shape) => {
    if (!mesh) {
      return false;
    }

    const { geometry } = mesh;

    return (
      (geometry instanceof SphereGeometry && shape instanceof CANNON.Sphere) ||
      (geometry instanceof BoxGeometry && shape instanceof CANNON.Box) ||
      (geometry instanceof PlaneGeometry && shape instanceof CANNON.Plane) ||
      (geometry.id === shape.id && shape instanceof CANNON.ConvexPolyhedron) ||
      (geometry.id === shape.id && shape instanceof CANNON.Trimesh) ||
      (geometry.id === shape.id && shape instanceof CANNON.Heightfield)
    );
  };

  const _createMesh = (shape: CANNON.Shape) => {
    let mesh: Mesh = new Mesh();
    const {
      SPHERE,
      BOX,
      PLANE,
      CYLINDER,
      CONVEXPOLYHEDRON,
      TRIMESH,
      HEIGHTFIELD,
    } = CANNON.Shape.types;

    switch (shape.type) {
      case SPHERE: {
        mesh = new Mesh(_sphereGeometry, _material);
        break;
      }

      case BOX: {
        mesh = new Mesh(_boxGeometry, _material);
        break;
      }

      case PLANE: {
        mesh = new Mesh(_planeGeometry, _material);
        break;
      }

      case CYLINDER: {
        const radiusTop = (shape as CANNON.Cylinder).radiusTop;
        const radiusBottom = (shape as CANNON.Cylinder).radiusBottom;
        const height = (shape as CANNON.Cylinder).height;
        const _cylinderGeometry = new CylinderGeometry(
          radiusTop,
          radiusBottom,
          height,
          32
        );
        mesh = new Mesh(_cylinderGeometry, _material);
        break;
      }

      case CONVEXPOLYHEDRON: {
        const geometry = new BufferGeometry();
        const vertices = new Float32Array(
          (shape as CANNON.ConvexPolyhedron).vertices.length * 3
        );
        const indices: number[] = [];
        for (
          let i = 0;
          i < (shape as CANNON.ConvexPolyhedron).vertices.length;
          i++
        ) {
          const { x, y, z } = (shape as CANNON.ConvexPolyhedron).vertices[i];
          const i3 = i * 3;
          vertices[i3] = x;
          vertices[i3 + 1] = y;
          vertices[i3 + 2] = z;
        }

        for (
          let i = 0;
          i < (shape as CANNON.ConvexPolyhedron).faces.length;
          i++
        ) {
          const face = (shape as CANNON.ConvexPolyhedron).faces[i];
          const a = face[0];

          for (let j = 1; j < face.length - 1; j++) {
            const b = face[j];
            const c = face[j + 1];
            indices.push(a, b, c);
          }
        }

        geometry.setAttribute(
          "position",
          new Float32BufferAttribute(vertices, 3)
        );
        geometry.setIndex(indices);
        geometry.computeVertexNormals(); // Calculate normals automatically

        mesh = new Mesh(geometry, _material);
        shape.id = geometry.id;
        break;
      }

      case TRIMESH: {
        const geometry = new BufferGeometry();
        const vertices: number[] = [];
        const indices: number[] = [];
        const v0 = _tempVec0,
          v1 = _tempVec1,
          v2 = _tempVec2;

        for (
          let i = 0;
          i < (shape as unknown as CANNON.Trimesh).indices.length / 3;
          i++
        ) {
          (shape as unknown as CANNON.Trimesh).getTriangleVertices(
            i,
            v0,
            v1,
            v2
          );

          vertices.push(v0.x, v0.y, v0.z, v1.x, v1.y, v1.z, v2.x, v2.y, v2.z);
          const idx = vertices.length / 3 - 3;
          indices.push(idx, idx + 1, idx + 2);
        }

        geometry.setAttribute(
          "position",
          new Float32BufferAttribute(vertices, 3)
        );
        geometry.setIndex(indices);
        geometry.computeVertexNormals(); // Calculate normals automatically

        mesh = new Mesh(geometry, _material);
        shape.id = geometry.id;
        break;
      }
      case HEIGHTFIELD: {
        const geometry = new BufferGeometry();
        const vertices: number[] = [];
        const indices: number[] = [];
        const v0 = _tempVec0,
          v1 = _tempVec1,
          v2 = _tempVec2;

        for (
          let i = 0;
          i < (shape as CANNON.Heightfield).data.length - 1;
          i++
        ) {
          for (
            let j = 0;
            j < (shape as CANNON.Heightfield).data[i].length - 1;
            j++
          ) {
            for (let k = 0; k < 2; k++) {
              (shape as CANNON.Heightfield).getConvexTrianglePillar(
                i,
                j,
                k === 0
              );
              v0.copy((shape as CANNON.Heightfield).pillarConvex.vertices[0]);
              v1.copy((shape as CANNON.Heightfield).pillarConvex.vertices[1]);
              v2.copy((shape as CANNON.Heightfield).pillarConvex.vertices[2]);
              v0.vadd((shape as CANNON.Heightfield).pillarOffset, v0);
              v1.vadd((shape as CANNON.Heightfield).pillarOffset, v1);
              v2.vadd((shape as CANNON.Heightfield).pillarOffset, v2);

              vertices.push(
                v0.x,
                v0.y,
                v0.z,
                v1.x,
                v1.y,
                v1.z,
                v2.x,
                v2.y,
                v2.z
              );
              const l = vertices.length / 3 - 3;
              indices.push(l, l + 1, l + 2);
            }
          }
        }

        geometry.setAttribute(
          "position",
          new Float32BufferAttribute(vertices, 3)
        );
        geometry.setIndex(indices);
        geometry.computeVertexNormals(); // Calculate normals automatically

        mesh = new Mesh(geometry, _material);
        shape.id = geometry.id;
        break;
      }
      default: {
        break;
      }
    }

    scene.add(mesh);
    return mesh;
  };

  const _scaleMesh = (mesh: Mesh, shape: CANNON.Shape) => {
    const { SPHERE, BOX, CYLINDER, CONVEXPOLYHEDRON, TRIMESH, HEIGHTFIELD } =
      CANNON.Shape.types;

    switch (shape.type) {
      case SPHERE: {
        const { radius } = shape as CANNON.Sphere;
        mesh.scale.set(radius, radius, radius);
        break;
      }

      case BOX: {
        mesh.scale.copy(
          (shape as CANNON.Box).halfExtents as unknown as Vector3
        );
        mesh.scale.multiplyScalar(2);
        break;
      }

      case CYLINDER: {
        mesh.scale.set(1, 1, 1);
        break;
      }

      case CONVEXPOLYHEDRON: {
        mesh.scale.set(1, 1, 1);
        break;
      }

      case TRIMESH: {
        mesh.scale.copy(
          (shape as unknown as CANNON.Trimesh).scale as unknown as Vector3
        );
        break;
      }

      case HEIGHTFIELD: {
        mesh.scale.set(1, 1, 1);
        break;
      }

      default: {
        break;
      }
    }
  };

  const _updateMesh = (
    index: number,
    body: CANNON.Body,
    shape: CANNON.Shape
  ) => {
    let mesh = _meshes[index];

    if (!_typeMatch(mesh, shape)) {
      if (mesh) {
        scene.remove(mesh);
      }

      const newMesh = _createMesh(shape);
      mesh = newMesh;
      _meshes[index] = newMesh;
    }

    _scaleMesh(mesh, shape);
  };

  const update = () => {
    const bodies = world.bodies;
    const meshes = _meshes;
    const shapeWorldPosition = _tempVec0;
    const shapeWorldQuaternion = _tempQuat0;

    let meshIndex = 0;

    for (let i = 0; i !== bodies.length; i++) {
      const body = bodies[i];

      for (let j = 0; j !== body.shapes.length; j++) {
        const shape = body.shapes[j];

        _updateMesh(meshIndex, body, shape);
        const mesh = meshes[meshIndex];

        if (mesh) {
          mesh.position.set(body.position.x, body.position.y, body.position.z);
          mesh.quaternion.copy(body.quaternion);
        }

        meshIndex++;
      }
    }

    for (let i = meshIndex; i < meshes.length; i++) {
      const mesh = meshes[i];

      if (mesh) {
        scene.remove(mesh);
      }
    }

    meshes.length = meshIndex;
  };

  return update;
};

const useCannonWireframes = () => {
  const { scene } = useThree();
  const world = useContext(WorldContext);

  if (!world) {
    throw new Error(
      "useCannonWireframes must be used within a PhysicsProvider"
    );
  }

  const wireframeRenderer = cannonWireframeRenderer(scene, world);
  useFrame(() => wireframeRenderer());
};

export { useCannonWireframes };
