import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Simulation } from "@/constants/simulaions";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export const SimulationCard = ({
  sim,
  hoveredCard,
}: {
  sim: Simulation;
  hoveredCard: string | null;
}) => {
  return (
    <Card className="group overflow-hidden border-primary/10 transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
      <div className="relative h-48 w-full overflow-hidden">
        <img
          src={sim.image || "/placeholder.svg"}
          alt={sim.title}
          className="object-cover transition-transform duration-500"
          style={{
            transform: hoveredCard === sim.id ? "scale(1.05)" : "scale(1)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
        <div className="absolute bottom-4 left-4">
          <div className="rounded-full bg-background/80 p-2 backdrop-blur-sm">
            {sim.icon}
          </div>
        </div>
      </div>
      <CardHeader>
        <CardTitle className="text-xl transition-colors group-hover:text-primary">
          {sim.title}
        </CardTitle>
        <CardDescription className="truncate">
          {sim.description}
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Button
          asChild
          className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90"
        >
          <Link to={sim.to}>
            Launch Simulation
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
