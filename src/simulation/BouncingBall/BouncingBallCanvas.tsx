import { useEffect, useRef } from "react";
import { Ball } from "./Ball";

export const BouncingBallCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    setCanvasDimensions();
    window.addEventListener("resize", setCanvasDimensions);

    const ballCount = Math.min(
      1,
      Math.floor((window.innerWidth * window.innerHeight) / 10000)
    );
    const balls: Ball[] = [];

    for (let i = 0; i < ballCount; i++) {
      balls.push(new Ball(canvas, ctx));
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = "rgba(140, 255, 200, 0.05)";
      ctx.lineWidth = 1;

      for (let i = 0; i < balls.length; i++) {
        for (let j = i + 1; j < balls.length; j++) {
          const dx = balls[i].h - balls[j].h;
          const dy = balls[i].k - balls[j].k;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(balls[i].h, balls[i].k);
            ctx.lineTo(balls[j].h, balls[j].k);
            ctx.stroke();
          }
        }
      }

      for (const ball of balls) {
        ball.update(canvas);
        ball.draw();
      }

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", setCanvasDimensions);
    };
  }, []);

  return (
    <div className="flex justify-center">
      <canvas
        ref={canvasRef}
        className="relative aspect-video w-full max-w-6xl rounded-lg border bg-muted/30"
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-muted-foreground">
            Click the "Controls" button in the header to open the simulation
            controls.
          </p>
        </div>
      </canvas>
    </div>
  );
};
