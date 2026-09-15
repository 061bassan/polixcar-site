"use client";

import { liquidMetalFragmentShader, ShaderMount } from "@paper-design/shaders";
import { useEffect, useRef, useState } from "react";

interface LiquidMetalButtonProps {
  label: string;
  href: string;
  icon?: React.ReactNode;
}

const WIDTH = 264;
const HEIGHT = 56;

export function LiquidMetalButton({ label, href, icon }: LiquidMetalButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [ripples, setRipples] = useState<Array<{ x: number; y: number; id: number }>>([]);
  const shaderRef = useRef<HTMLDivElement>(null);
  const shaderMount = useRef<InstanceType<typeof ShaderMount> | null>(null);
  const anchorRef = useRef<HTMLAnchorElement>(null);
  const rippleId = useRef(0);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion || !shaderRef.current) return;

    try {
      shaderMount.current = new ShaderMount(
        shaderRef.current,
        liquidMetalFragmentShader,
        {
          u_repetition: 4,
          u_softness: 0.5,
          u_shiftRed: 0.3,
          u_shiftBlue: 0.3,
          u_distortion: 0,
          u_contour: 0,
          u_angle: 45,
          u_scale: 8,
          u_shape: 1,
          u_offsetX: 0.1,
          u_offsetY: -0.1,
          u_colorBack: [0, 0, 0, 0],
          u_colorTint: [0.65, 0.78, 0.7, 1],
        },
        undefined,
        0.55,
      );
    } catch (error) {
      console.error("Falha ao iniciar o shader do botão:", error);
    }

    return () => {
      shaderMount.current?.dispose?.();
      shaderMount.current = null;
    };
  }, []);

  function handleMouseEnter() {
    setIsHovered(true);
    shaderMount.current?.setSpeed?.(1);
  }

  function handleMouseLeave() {
    setIsHovered(false);
    setIsPressed(false);
    shaderMount.current?.setSpeed?.(0.55);
  }

  function handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
    shaderMount.current?.setSpeed?.(2.2);
    setTimeout(() => shaderMount.current?.setSpeed?.(isHovered ? 1 : 0.55), 300);

    if (anchorRef.current) {
      const rect = anchorRef.current.getBoundingClientRect();
      const ripple = { x: e.clientX - rect.left, y: e.clientY - rect.top, id: rippleId.current++ };
      setRipples((prev) => [...prev, ripple]);
      setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== ripple.id)), 600);
    }
  }

  return (
    <div className="relative inline-block" style={{ perspective: "1000px" }}>
      <div
        style={{
          position: "relative",
          width: WIDTH,
          height: HEIGHT,
          transformStyle: "preserve-3d",
          transition: "transform 0.6s cubic-bezier(0.34,1.56,0.64,1)",
        }}
      >
        <div
          className="pointer-events-none absolute inset-0 flex items-center justify-center gap-2"
          style={{ transform: "translateZ(20px)", zIndex: 30 }}
        >
          {icon}
          <span
            className="whitespace-nowrap text-[15px] font-semibold text-white"
            style={{ textShadow: "0 1px 2px rgba(0,0,0,0.6)" }}
          >
            {label}
          </span>
        </div>

        <div
          className="absolute inset-0"
          style={{
            transform: `translateZ(10px) ${isPressed ? "translateY(1px) scale(0.98)" : ""}`,
            transition: "transform 0.15s cubic-bezier(0.4,0,0.2,1)",
            zIndex: 20,
          }}
        >
          <div
            className="m-[2px] h-[calc(100%-4px)] w-[calc(100%-4px)] rounded-full"
            style={{
              background: "linear-gradient(180deg, #1f4a32 0%, #0a0a0a 100%)",
              boxShadow: isPressed ? "inset 0 2px 4px rgba(0,0,0,0.4)" : "none",
            }}
          />
        </div>

        <div
          className="absolute inset-0 overflow-hidden rounded-full"
          style={{
            transform: `${isPressed ? "translateY(1px) scale(0.98)" : ""}`,
            transition: "transform 0.15s cubic-bezier(0.4,0,0.2,1), box-shadow 0.2s ease",
            zIndex: 10,
            boxShadow: isHovered
              ? "0 0 0 1px rgba(163,228,188,0.5), 0 10px 24px rgba(47,107,72,0.35)"
              : "0 0 0 1px rgba(163,228,188,0.25), 0 4px 14px rgba(0,0,0,0.35)",
            // Fallback visual: fica visível até (e a menos que) o canvas do shader monte por cima.
            background:
              "linear-gradient(120deg, #1f4a32 0%, #2f6b48 35%, #5fb381 55%, #2f6b48 75%, #1f4a32 100%)",
            backgroundSize: "220% 220%",
            animation: "polixcar-metal-sheen 6s ease-in-out infinite",
          }}
        >
          <div ref={shaderRef} className="absolute inset-0 [&>canvas]:h-full [&>canvas]:w-full" />
        </div>

        <a
          ref={anchorRef}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleClick}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onMouseDown={() => setIsPressed(true)}
          onMouseUp={() => setIsPressed(false)}
          aria-label={label}
          className="absolute inset-0 overflow-hidden rounded-full"
          style={{ transform: "translateZ(25px)", zIndex: 40 }}
        >
          {ripples.map((r) => (
            <span
              key={r.id}
              className="pointer-events-none absolute rounded-full"
              style={{
                left: r.x,
                top: r.y,
                width: 20,
                height: 20,
                background:
                  "radial-gradient(circle, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0) 70%)",
                animation: "polixcar-ripple 0.6s ease-out",
              }}
            />
          ))}
        </a>
      </div>
    </div>
  );
}
