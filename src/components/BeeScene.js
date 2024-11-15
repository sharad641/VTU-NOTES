import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Howl } from 'howler';  // We'll use Howler.js for sound management

const BeeScene = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Append renderer to the DOM
    const mountNode = mountRef.current;
    if (mountNode) {
      mountNode.appendChild(renderer.domElement);
    }

    // Ambient Light
    const ambientLight = new THREE.AmbientLight(0x404040, 0.5);  // Soft light for the forest
    scene.add(ambientLight);

    // Point Light for dynamic lighting
    const pointLight = new THREE.PointLight(0xffffff, 1, 500);
    pointLight.position.set(0, 10, 30);
    scene.add(pointLight);

    // Bee - Represented as a sphere here
    const beeGeometry = new THREE.SphereGeometry(1, 32, 32);
    const beeMaterial = new THREE.MeshBasicMaterial({ color: 0xffd700 }); // Bee color
    const bee = new THREE.Mesh(beeGeometry, beeMaterial);
    scene.add(bee);

    // Create the forest (trees)
    const createForest = () => {
      for (let i = 0; i < 50; i++) {
        const treeGeometry = new THREE.CylinderGeometry(0.5, 1, Math.random() * 10 + 5, 8);
        const treeMaterial = new THREE.MeshStandardMaterial({ color: Math.random() * 0xffffff });
        const tree = new THREE.Mesh(treeGeometry, treeMaterial);
        tree.position.set(Math.random() * 100 - 50, 0, Math.random() * 100 - 50);
        scene.add(tree);
      }
    };
    createForest();

    // Ambient Sound Setup (frogs, insects, water)
    const ambientSounds = new Howl({
      src: [
        'https://example.com/sounds/forest_ambient.mp3', // Link to your forest ambient sound
      ],
      loop: true,
      volume: 0.5,
    });

    const frogSound = new Howl({
      src: [
        'https://example.com/sounds/frog_croak.mp3', // Frog croaking sound
      ],
      loop: true,
      volume: 0.3,
    });

    const waterSound = new Howl({
      src: [
        'https://example.com/sounds/water_bubbling.mp3', // Water bubbling sound
      ],
      loop: true,
      volume: 0.2,
    });

    // Start the ambient sounds
    ambientSounds.play();
    frogSound.play();
    waterSound.play();

    // Sparks - Generate when the bee moves
    const createSparks = (position) => {
      const sparkGeometry = new THREE.SphereGeometry(0.1, 10, 10);
      const sparkMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 }); // Yellow sparks
      const spark = new THREE.Mesh(sparkGeometry, sparkMaterial);
      spark.position.set(position.x, position.y, position.z);
      scene.add(spark);

      // Add random movement to simulate flickering
      setTimeout(() => {
        scene.remove(spark);
      }, 500);  // Remove spark after 0.5 seconds
    };

    // Animate the bee and the forest scene
    const beeSpeed = 0.1;
    let beeAngle = 0;

    const animate = () => {
      requestAnimationFrame(animate);

      // Move the bee in a circular path (simulate flying)
      bee.position.x = Math.sin(beeAngle) * 20;
      bee.position.z = Math.cos(beeAngle) * 20;
      createSparks(bee.position); // Generate sparks as bee moves
      beeAngle += beeSpeed;

      // Render the scene
      renderer.render(scene, camera);
    };

    // Camera position
    camera.position.z = 50;

    animate();

    // Cleanup function
    return () => {
      if (mountNode) {
        mountNode.removeChild(renderer.domElement); // Clean up the renderer
      }
      ambientSounds.stop();
      frogSound.stop();
      waterSound.stop();
    };
  }, []);

  return <div ref={mountRef} />;
};

export default BeeScene;
