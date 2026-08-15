"use client";

import type { MutableRefObject } from "react";
import { useEffect, useRef } from "react";
import * as THREE from "three";

type SceneTier = "full" | "compact";

type AISignalSceneProps = {
  progressRef: MutableRefObject<number>;
  activeStoryRef: MutableRefObject<number>;
  tier: SceneTier;
  onReady: () => void;
};

const clusterCentres = [
  new THREE.Vector3(-3.5, 1.55, 0.2),
  new THREE.Vector3(3.45, 1.25, -0.15),
  new THREE.Vector3(-3.1, -1.8, -0.35),
  new THREE.Vector3(3.15, -1.65, 0.35),
];

const offsets = [
  new THREE.Vector3(0, 0, 0),
  new THREE.Vector3(1.05, 0.45, -0.2),
  new THREE.Vector3(-0.72, 0.82, 0.25),
  new THREE.Vector3(0.35, -0.92, 0.12),
];

function seededRandom(seed: number) {
  let value = seed >>> 0;
  return () => {
    value = (value * 1664525 + 1013904223) >>> 0;
    return value / 4294967296;
  };
}

function smoothstep(edge0: number, edge1: number, value: number) {
  const x = THREE.MathUtils.clamp((value - edge0) / (edge1 - edge0), 0, 1);
  return x * x * (3 - 2 * x);
}

export function AISignalScene({ progressRef, activeStoryRef, tier, onReady }: AISignalSceneProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#070909");
    scene.fog = new THREE.FogExp2("#070909", 0.055);

    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 80);
    camera.position.set(0, 0, 11.5);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: tier === "full",
      alpha: false,
      powerPreference: "high-performance",
    });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.92;

    const world = new THREE.Group();
    scene.add(world);

    const ambient = new THREE.AmbientLight("#d8e7e5", 0.42);
    const key = new THREE.PointLight("#9ee8e2", 13, 22, 1.7);
    key.position.set(-2.5, 3.5, 5);
    const rim = new THREE.PointLight("#c5483d", 8, 18, 1.8);
    rim.position.set(4, -2, 3);
    scene.add(ambient, key, rim);

    const coreGeometry = new THREE.IcosahedronGeometry(0.72, tier === "full" ? 2 : 1);
    const coreMaterial = new THREE.MeshPhysicalMaterial({
      color: "#111a19",
      roughness: 0.32,
      metalness: 0.55,
      emissive: "#285b58",
      emissiveIntensity: 0.48,
      clearcoat: 0.65,
    });
    const core = new THREE.Mesh(coreGeometry, coreMaterial);
    world.add(core);

    const shellMaterial = new THREE.MeshBasicMaterial({ color: "#b8f2ee", wireframe: true, transparent: true, opacity: 0.19 });
    const shell = new THREE.Mesh(coreGeometry, shellMaterial);
    shell.scale.setScalar(1.2);
    world.add(shell);

    const nodeGeometry = new THREE.OctahedronGeometry(0.15, 0);
    const nodeMaterial = new THREE.MeshStandardMaterial({ roughness: 0.3, metalness: 0.65 });
    const nodes = new THREE.InstancedMesh(nodeGeometry, nodeMaterial, 16);
    nodes.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    const palette = ["#9ce9e3", "#e6d7b8", "#c55c50", "#99a8c8"];
    palette.forEach((colour, clusterIndex) => {
      for (let nodeIndex = 0; nodeIndex < 4; nodeIndex += 1) {
        nodes.setColorAt(clusterIndex * 4 + nodeIndex, new THREE.Color(colour));
      }
    });
    nodes.instanceColor!.needsUpdate = true;
    world.add(nodes);

    const nodeTargets = clusterCentres.flatMap((centre) => offsets.map((offset) => centre.clone().add(offset)));
    const nodeCurrent = nodeTargets.map(() => new THREE.Vector3());
    const nodeObject = new THREE.Object3D();

    const edges: Array<[number, number]> = [];
    for (let cluster = 0; cluster < 4; cluster += 1) {
      const base = cluster * 4;
      edges.push([-1, base], [base, base + 1], [base, base + 2], [base, base + 3]);
    }
    edges.push([0, 4], [4, 12], [12, 8], [8, 0], [2, 10], [6, 14]);
    const connectionPositions = new Float32Array(edges.length * 6);
    const connectionGeometry = new THREE.BufferGeometry();
    const connectionAttribute = new THREE.BufferAttribute(connectionPositions, 3).setUsage(THREE.DynamicDrawUsage);
    connectionGeometry.setAttribute("position", connectionAttribute);
    const connectionMaterial = new THREE.LineBasicMaterial({ color: "#8ecbc7", transparent: true, opacity: 0 });
    const connections = new THREE.LineSegments(connectionGeometry, connectionMaterial);
    world.add(connections);

    const random = seededRandom(11706);
    const particleCount = tier === "full" ? 168 : 56;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let index = 0; index < particleCount; index += 1) {
      const radius = 1.9 + random() * 6.1;
      const angle = random() * Math.PI * 2;
      particlePositions[index * 3] = Math.cos(angle) * radius;
      particlePositions[index * 3 + 1] = (random() - 0.5) * 6.6;
      particlePositions[index * 3 + 2] = Math.sin(angle) * radius * 0.32;
    }
    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
    const particleMaterial = new THREE.PointsMaterial({ color: "#c6e8e5", size: tier === "full" ? 0.035 : 0.05, transparent: true, opacity: 0 });
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    world.add(particles);

    const pulseGeometry = new THREE.SphereGeometry(0.055, 8, 8);
    const pulseMaterial = new THREE.MeshBasicMaterial({ color: "#dffdfa", transparent: true, opacity: 0 });
    const pulses = Array.from({ length: tier === "full" ? 6 : 3 }, (_, index) => {
      const pulse = new THREE.Mesh(pulseGeometry, pulseMaterial.clone());
      pulse.userData.offset = index / (tier === "full" ? 6 : 3);
      world.add(pulse);
      return pulse;
    });
    pulseMaterial.dispose();

    const pointer = new THREE.Vector2();
    const lookAt = new THREE.Vector3();
    const cameraTarget = new THREE.Vector3();
    let renderedProgress = 0;
    let frame = 0;
    let isVisible = false;
    let documentVisible = !document.hidden;
    let readySent = false;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const width = Math.max(1, Math.round(rect.width));
      const height = Math.max(1, Math.round(rect.height));
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, tier === "full" ? 1.5 : 1));
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    const onPointerMove = (event: PointerEvent) => {
      if (tier !== "full") return;
      pointer.x = (event.clientX / window.innerWidth - 0.5) * 2;
      pointer.y = (event.clientY / window.innerHeight - 0.5) * 2;
    };

    const render = (now: number) => {
      frame = 0;
      if (!isVisible || !documentVisible) return;

      renderedProgress = THREE.MathUtils.lerp(renderedProgress, progressRef.current, 0.065);
      const spread = smoothstep(0.08, 0.34, renderedProgress);
      const network = smoothstep(0.19, 0.49, renderedProgress);
      const flow = smoothstep(0.6, 0.82, renderedProgress);
      const exit = smoothstep(0.82, 1, renderedProgress);
      const activeStory = Math.min(3, Math.max(0, activeStoryRef.current));

      nodeTargets.forEach((target, index) => {
        nodeObject.position.copy(target).multiplyScalar(spread);
        nodeCurrent[index].lerp(nodeObject.position, 0.09);
        nodeObject.position.copy(nodeCurrent[index]);
        const selected = index === activeStory * 4;
        nodeObject.scale.setScalar(selected && renderedProgress > 0.32 && renderedProgress < 0.68 ? 2.15 : 1);
        nodeObject.rotation.set(now * 0.00016 + index, now * 0.00011, 0);
        nodeObject.updateMatrix();
        nodes.setMatrixAt(index, nodeObject.matrix);
      });
      nodes.instanceMatrix.needsUpdate = true;

      edges.forEach(([fromIndex, toIndex], edgeIndex) => {
        const from = fromIndex === -1 ? core.position : nodeCurrent[fromIndex];
        const to = nodeCurrent[toIndex];
        const offset = edgeIndex * 6;
        connectionPositions.set([from.x, from.y, from.z, to.x, to.y, to.z], offset);
      });
      connectionAttribute.needsUpdate = true;
      connectionMaterial.opacity = network * (1 - exit * 0.7) * 0.34;
      particleMaterial.opacity = flow * (1 - exit) * 0.38;

      pulses.forEach((pulse) => {
        const t = (now * 0.00018 + pulse.userData.offset) % 1;
        const from = clusterCentres[Math.floor(pulse.userData.offset * 4) % 4];
        pulse.position.copy(from).lerp(core.position, t);
        (pulse.material as THREE.MeshBasicMaterial).opacity = flow * Math.sin(t * Math.PI) * 0.75;
      });

      core.rotation.y = now * 0.00008;
      core.rotation.x = Math.sin(now * 0.00013) * 0.08;
      shell.rotation.y = -now * 0.0001;
      particles.rotation.z = now * 0.000015;
      particles.rotation.y = now * 0.00001;

      if (renderedProgress < 0.18) {
        cameraTarget.set(0, 0, 11.5 - renderedProgress * 10);
        lookAt.set(0, 0, 0);
      } else if (renderedProgress < 0.65) {
        const focus = clusterCentres[activeStory];
        cameraTarget.set(focus.x * 0.18, focus.y * 0.12, 9.4);
        lookAt.copy(focus).multiplyScalar(0.18);
      } else if (renderedProgress < 0.83) {
        cameraTarget.set(0, 0, 8.7);
        lookAt.set(0, 0, 0);
      } else {
        cameraTarget.set(0, 0, 8.7 + exit * 4.8);
        lookAt.set(0, 0, 0);
      }
      cameraTarget.x += pointer.x * 0.16;
      cameraTarget.y -= pointer.y * 0.1;
      camera.position.lerp(cameraTarget, 0.045);
      camera.lookAt(lookAt);
      world.rotation.y = pointer.x * 0.018;
      world.rotation.x = pointer.y * 0.012;
      renderer.render(scene, camera);

      if (!readySent) {
        readySent = true;
        onReady();
      }
      frame = requestAnimationFrame(render);
    };

    const updateRenderLoop = () => {
      if (isVisible && documentVisible) {
        if (frame === 0) frame = requestAnimationFrame(render);
      } else if (frame !== 0) {
        cancelAnimationFrame(frame);
        frame = 0;
      }
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      updateRenderLoop();
    }, { rootMargin: "200px" });
    visibilityObserver.observe(canvas);
    const onVisibilityChange = () => {
      documentVisible = !document.hidden;
      updateRenderLoop();
    };

    document.addEventListener("visibilitychange", onVisibilityChange);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    resize();
    updateRenderLoop();

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("pointermove", onPointerMove);
      scene.traverse((object) => {
        const mesh = object as THREE.Mesh;
        mesh.geometry?.dispose();
        const materials = Array.isArray(mesh.material) ? mesh.material : mesh.material ? [mesh.material] : [];
        materials.forEach((material) => material.dispose());
      });
      renderer.renderLists.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
    };
  }, [activeStoryRef, onReady, progressRef, tier]);

  return <canvas className="aiSignalCanvas" ref={canvasRef} aria-hidden="true" />;
}
