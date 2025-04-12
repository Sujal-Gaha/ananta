"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useDragControls, AnimatePresence } from "framer-motion";
import {
  Maximize2,
  Minimize2,
  X,
  GripHorizontal,
  Play,
  Pause,
  RefreshCw,
} from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface SimulationControlModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SimulationControlModal({
  isOpen,
  onClose,
}: SimulationControlModalProps) {
  const [isMinimized, setIsMinimized] = useState(false);
  const [isRunning, setIsRunning] = useState(true);
  const [gravity, setGravity] = useState(0.5);
  const [elasticity, setElasticity] = useState(0.8);
  const [friction, setFriction] = useState(0.99);
  const [showTrail, setShowTrail] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const dragControls = useDragControls();

  // Ball state
  const ballRef = useRef({
    x: 100,
    y: 50,
    radius: 15,
    velocityX: 2,
    velocityY: 0,
    trail: [] as { x: number; y: number }[],
  });

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const toggleSimulation = () => {
    setIsRunning(!isRunning);
  };

  const resetSimulation = () => {
    const ball = ballRef.current;
    ball.x = 100;
    ball.y = 50;
    ball.velocityX = 2;
    ball.velocityY = 0;
    ball.trail = [];
  };

  // Animation loop for the bouncing ball
  useEffect(() => {
    if (!canvasRef.current || !isRunning) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const animate = () => {
      const ball = ballRef.current;
      const width = canvas.width;
      const height = canvas.height;

      // Clear canvas
      ctx.clearRect(0, 0, width, height);

      // Draw trail if enabled
      if (showTrail) {
        ctx.beginPath();
        ball.trail.forEach((point, index) => {
          const alpha = index / ball.trail.length;
          ctx.strokeStyle = `rgba(var(--primary), ${alpha * 0.5})`;
          if (index === 0) {
            ctx.moveTo(point.x, point.y);
          } else {
            ctx.lineTo(point.x, point.y);
          }
        });
        ctx.stroke();
      }

      // Update ball position
      ball.velocityY += gravity;
      ball.velocityX *= friction;
      ball.x += ball.velocityX;
      ball.y += ball.velocityY;

      // Add current position to trail
      if (showTrail) {
        ball.trail.push({ x: ball.x, y: ball.y });
        // Limit trail length
        if (ball.trail.length > 50) {
          ball.trail.shift();
        }
      }

      // Bounce off walls
      if (ball.x + ball.radius > width) {
        ball.x = width - ball.radius;
        ball.velocityX *= -elasticity;
      } else if (ball.x - ball.radius < 0) {
        ball.x = ball.radius;
        ball.velocityX *= -elasticity;
      }

      // Bounce off floor and ceiling
      if (ball.y + ball.radius > height) {
        ball.y = height - ball.radius;
        ball.velocityY *= -elasticity;
        // Apply horizontal friction when hitting the ground
        ball.velocityX *= 0.95;
      } else if (ball.y - ball.radius < 0) {
        ball.y = ball.radius;
        ball.velocityY *= -elasticity;
      }

      // Draw ball
      ctx.beginPath();
      const gradient = ctx.createRadialGradient(
        ball.x - ball.radius / 3,
        ball.y - ball.radius / 3,
        0,
        ball.x,
        ball.y,
        ball.radius
      );
      gradient.addColorStop(0, "rgb(var(--primary))");
      gradient.addColorStop(1, "rgba(var(--primary), 0.7)");
      ctx.fillStyle = gradient;
      ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
      ctx.fill();

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, [isRunning, gravity, elasticity, friction, showTrail]);

  // Resize canvas to fit container
  useEffect(() => {
    const resizeCanvas = () => {
      if (canvasRef.current) {
        const canvas = canvasRef.current;
        const container = canvas.parentElement;
        if (container) {
          canvas.width = container.clientWidth;
          canvas.height = container.clientHeight;
        }
      }
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [isMinimized]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="fixed bottom-4 right-4 z-50 flex flex-col overflow-hidden rounded-lg border bg-background shadow-lg"
        style={{
          width: isMinimized ? "300px" : "600px",
          height: isMinimized ? "40px" : "500px",
        }}
        drag
        dragControls={dragControls}
        dragMomentum={false}
        dragListener={false}
      >
        {/* Modal Header */}
        <div
          className="flex h-10 items-center justify-between border-b bg-primary/5 px-4"
          onPointerDown={(e) => dragControls.start(e)}
        >
          <div className="flex items-center gap-2">
            <GripHorizontal className="h-4 w-4 cursor-grab text-muted-foreground" />
            <span className="text-sm font-medium">
              Bouncing Ball Simulation Controls
            </span>
          </div>
          <div className="flex items-center gap-1">
            {isMinimized ? (
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={toggleMinimize}
              >
                <Maximize2 className="h-3 w-3" />
              </Button>
            ) : (
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={toggleMinimize}
              >
                <Minimize2 className="h-3 w-3" />
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={onClose}
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        </div>

        {/* Modal Content */}
        {!isMinimized && (
          <div className="grid h-full grid-cols-2 gap-4 overflow-hidden">
            {/* Simulation Canvas */}
            <div className="relative col-span-1 h-full border-r">
              <div className="absolute top-2 right-2 z-10 flex gap-1">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 bg-background/80 backdrop-blur-sm"
                  onClick={toggleSimulation}
                >
                  {isRunning ? (
                    <Pause className="h-4 w-4" />
                  ) : (
                    <Play className="h-4 w-4" />
                  )}
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 bg-background/80 backdrop-blur-sm"
                  onClick={resetSimulation}
                >
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
              <div className="h-full w-full">
                <canvas ref={canvasRef} className="h-full w-full" />
              </div>
            </div>

            {/* Controls */}
            <div className="col-span-1 flex flex-col gap-6 overflow-y-auto p-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="gravity">Gravity</Label>
                  <span className="text-xs text-muted-foreground">
                    {gravity.toFixed(2)}
                  </span>
                </div>
                <Slider
                  id="gravity"
                  min={0}
                  max={2}
                  step={0.01}
                  value={[gravity]}
                  onValueChange={(value) => setGravity(value[0])}
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="elasticity">Elasticity (Bounce)</Label>
                  <span className="text-xs text-muted-foreground">
                    {elasticity.toFixed(2)}
                  </span>
                </div>
                <Slider
                  id="elasticity"
                  min={0}
                  max={1}
                  step={0.01}
                  value={[elasticity]}
                  onValueChange={(value) => setElasticity(value[0])}
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="friction">Air Friction</Label>
                  <span className="text-xs text-muted-foreground">
                    {friction.toFixed(2)}
                  </span>
                </div>
                <Slider
                  id="friction"
                  min={0.9}
                  max={1}
                  step={0.001}
                  value={[friction]}
                  onValueChange={(value) => setFriction(value[0])}
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="show-trail"
                  checked={showTrail}
                  onCheckedChange={setShowTrail}
                />
                <Label htmlFor="show-trail">Show Motion Trail</Label>
              </div>

              <div className="space-y-2">
                <Label htmlFor="initial-velocity">
                  Initial Velocity (on reset)
                </Label>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Input
                      id="velocity-x"
                      type="number"
                      placeholder="X Velocity"
                      value="2"
                      onChange={(e) => {
                        const val = Number.parseFloat(e.target.value);
                        if (!isNaN(val)) {
                          ballRef.current.velocityX = val;
                        }
                      }}
                    />
                  </div>
                  <div>
                    <Input
                      id="velocity-y"
                      type="number"
                      placeholder="Y Velocity"
                      value="0"
                      onChange={(e) => {
                        const val = Number.parseFloat(e.target.value);
                        if (!isNaN(val)) {
                          ballRef.current.velocityY = val;
                        }
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-auto flex justify-end gap-2">
                <Button variant="outline" onClick={resetSimulation}>
                  Reset
                </Button>
                <Button onClick={toggleSimulation}>
                  {isRunning ? "Pause" : "Play"}
                </Button>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
