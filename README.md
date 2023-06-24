# React Three Fiber library fundamentals exercise

YoutubeLink:
https://www.youtube.com/watch?v=VNd8n566R48&list=PLh6HtLNJBq2baXwwO1_3EK4MfV1AYv4Ih&index=7

Demo: Check code example at CodeSandbox
https://codesandbox.io/s/react-three-fiber-lighting-essentials-qwxb8?file=/src/App.js:0-3500

## Steps

## 1 -> Installed react with three, react-three-fiber and @react-three/drei

## 2 -> Going through docs and video and adjusting project code from Sandbox to match needs

## 3 -> Adding comments to explain code in detail to myself and others

#### Some notes on the side ->

-Talking about coordinates, Z axis is configured to be towards you in WEBGL...
-Cube is positioned in [0, 0, 0] - meaning center...
-You can pass PROPS to position and thats how you apply Transforms within every object inside React Three Fiber...
-Rotation also has X,Y,Z value but it works with Radiants (ratio of PI)...
-Scaling will multiply the value of object coordinates...

This is always happening inside the globalSpace (GlobalSpace = Canvas) and it representes a tree of nodes but inside every object, you can nest multiple nodes(objects)
You do this with GROUP <group>, so you can put group inside parent group as well...
It gives you nested tree of coordinate systems and its handy because you can build shape and position components...
