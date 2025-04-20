import { SimulationParameterCardProps } from "@/components/simulations/SimulationParameterCard";
import cuid from "cuid";
import { ArrowDown, Repeat, Wind } from "lucide-react";

export const BouncingBallConstants = {
  title: "Bouncing Ball Simulation",
  description:
    "This simulation demonstrates the physics of a bouncing ball, including gravity, elasticity, and friction. Open the controls panel to adjust parameters and see how they affect the ball's movement.",
};

export const simulationParameters: SimulationParameterCardProps[] = [
  {
    id: cuid(),
    title: "Gravity",
    description:
      "Controls how quickly the ball accelerates downward. Higher values make the ball fall faster.",
    icon: <ArrowDown className="h-4 w-4" />,
    className: "",
  },
  {
    id: cuid(),
    title: "Elasticity",
    description:
      "Determines how bouncy the ball is. A value of 1 means perfect bounce, while 0 means no bounce.",
    icon: <Repeat className="h-4 w-4" />,
    className: "",
  },
  {
    id: cuid(),
    title: "Friction",
    description:
      "Simulates air resistance. Values closer to 1 mean less friction, allowing the ball to maintain momentum.",
    icon: <Wind className="h-4 w-4" />,
    className: "",
  },
];
