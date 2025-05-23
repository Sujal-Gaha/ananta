import cuid from "cuid";
import { Atom, Dna, Microscope } from "lucide-react";
import { JSX } from "react";

export type Simulation = {
  id: string;
  title: string;
  description: string;
  icon: JSX.Element;
  image: string;
  to: string;
};

export const simulations: Simulation[] = [
  {
    id: cuid(),
    title: "Bouncing Ball Simulation",
    description:
      "Explore gravity, momentum, and collisions in an interactive environment.",
    icon: <Atom className="h-8 w-8 text-primary" />,
    image: "/placeholder.svg?height=200&width=400",
    to: "/simulations/bouncing_ball",
  },
  {
    id: cuid(),
    title: "Cellular Automaton",
    description:
      "Watch cellular patterns emerge and evolve based on simple rules.",
    icon: <Microscope className="h-8 w-8 text-primary" />,
    image: "/placeholder.svg?height=200&width=400",
    to: "/simulations/cellular",
  },
  {
    id: cuid(),
    title: "Genetic Algorithm",
    description:
      "Witness evolution in action as algorithms find optimal solutions.",
    icon: <Dna className="h-8 w-8 text-primary" />,
    image: "/placeholder.svg?height=200&width=400",
    to: "/simulations/genetic",
  },
];
