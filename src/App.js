import React, { useState, Suspense, useRef } from "react";
import { Canvas, useFrame } from "react-three-fiber";
import { Box, OrbitControls, Text, useTexture } from "@react-three/drei";
import Grid from "./Grid";
import Controls from "./Controls";
import "./styles.css";

// Cube object with position rotation and scaling props as well as onClick that is only console.log for now...
// <group> that is commented can be used and is always used for grouping into a parentNode where all the components are inside the same coordinate system
const Cube = ({ position, rotation, scale = [1, 1, 1], handleClick }) => (
  <Box
    args={[1, 1, 1]}
    position={position}
    rotation={rotation}
    scale={scale}
    onClick={handleClick}
  >
    <meshStandardMaterial attach="material" color="white" />
  </Box>
);

// Light object is used to position light inside the canvas, here we have some props like position, color ,intensity and orbit params
// we use useFrame to perform updates and animations in a 3D scene. It is the same as requestAnimationFrame...
// here we use it to update its position based on current time

// as Texture we can use our own local image lightbulb.png
// group we know is the ParentNode but sprite is a 2D image that needs to be rendered in 3D Scene and it comes with enclosed SpriteMaterial child component...
// pointLight represents a point light source in the 3D scene. It illuminates the surrounding objects and creates a lighting effect.
// The color prop sets the color of the light. The intensity prop controls the brightness of the light. The decay prop determines how quickly the light's intensity diminishes over distance.
//The distance prop specifies the maximum range at which the light affects objects.
// Added SKF light

const Light = ({
  position,
  color,
  intensity,
  orbitalOffset = 0,
  orbitalSpeed = 1,
}) => {
  const ref = useRef();
  useFrame(() => {
    let date = Date.now() * orbitalSpeed * 0.001 + orbitalOffset;
    ref.current.position.set(
      Math.cos(date) * 2 + position[0],
      Math.sin(date) * 2 + position[1],
      Math.sin(date) * 2 + position[2]
    );
  });
  const texture = useTexture("skflogo.png");
  return (
    <group position={position} ref={ref}>
      <sprite>
        <spriteMaterial
          attach="material"
          map={texture}
          transparent
          opacity={0.7}
          color={color}
        />
      </sprite>
      <pointLight color={color} intensity={intensity} decay={2} distance={20} />
    </group>
  );
};

export default function App() {
  // Here we declare our state for the transformation of our Box
  const [xPosition, setXPosition] = useState(0);
  const [yPosition, setYPosition] = useState(0);
  const [zPosition, setZPosition] = useState(0);

  const [xRotation, setXRotation] = useState(0);
  const [yRotation, setYRotation] = useState(0);
  const [zRotation, setZRotation] = useState(0);

  const [xScale, setXScale] = useState(1);
  const [yScale, setYScale] = useState(1);
  const [zScale, setZScale] = useState(1);

  // The parent element is ALWAYS the Canvas component and it has camera param which is the config on how we view the canvas...
  // the Suspense is lazyLoad that shows Loading text until our Canvas is loaded
  // In React Three Fiber, the OrbitControls component is often used to provide user-controlled navigation within a 3D scene.
  // It allows users to explore the scene from different angles and perspectives by dragging the mouse, using touch gestures, or using keyboard inputs.
  // By attaching the OrbitControls component to the camera in a React Three Fiber application, you can enable user interaction and control the camera's movement.
  // The OrbitControls component listens to user input and updates the camera's position and orientation accordingly.
  // We also display Grid which is the visual representation of the Coordinate System of the component that is sibling ?
  // Outside of the Canvas element we append the Controls that we built in Controls.js file that help us interact with props of the canvas and/or its elements, in this case the Cube component

  return (
    <>
      <Canvas camera={{ position: [0, 2, 10] }}>
        <Suspense
          fallback={
            <Text
              color="white" // default
              anchorX="center" // default
              anchorY="middle" // default
            >
              Loading
            </Text>
          }
        >
          <OrbitControls />
          <directionalLight intensity={0.5} position={[6, 2, 1]} />
          {/* <ambientLight intensity={0.1} /> */}
          <Grid size={10} />
          <Light
            position={[-3, 0, -2]}
            color="blue"
            intensity={2}
            offset={200}
          />
          <Cube
            handleClick={() => console.log("clicked on the cube")}
            rotation={[
              xRotation * Math.PI,
              yRotation * Math.PI,
              zRotation * Math.PI,
            ]}
            position={[xPosition, yPosition, zPosition]}
            scale={[xScale, yScale, zScale]}
          />
        </Suspense>
      </Canvas>
      <Controls
        controls={{
          xPosition,
          yPosition,
          zPosition,
          xRotation,
          yRotation,
          zRotation,
          xScale,
          yScale,
          zScale,
          setXPosition,
          setYPosition,
          setZPosition,
          setXRotation,
          setYRotation,
          setZRotation,
          setXScale,
          setYScale,
          setZScale,
        }}
      />
    </>
  );
}
