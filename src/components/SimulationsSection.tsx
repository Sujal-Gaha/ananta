import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowRight, Atom } from "lucide-react";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { simulations } from "@/constants/simulaions";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
    },
  },
};

export const SimulationsSection = () => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <section
      id="simulations"
      className="relative py-16 md:py-24 flex items-center justify-center"
    >
      <div className="absolute inset-0 bg-secondary/5" />
      <div className="container relative">
        <div className="mb-12 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <Atom className="h-6 w-6 text-primary" />
          </div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Choose a Simulation
          </h2>
          <p className="mt-4 text-muted-foreground md:text-xl">
            Select from our collection of interactive simulations to explore
            different scientific phenomena
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {simulations.map((sim) => (
            <motion.div
              key={sim.id}
              variants={itemVariants}
              onHoverStart={() => setHoveredCard(sim.id)}
              onHoverEnd={() => setHoveredCard(null)}
            >
              <Card className="group overflow-hidden border-primary/10 transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
                <div className="relative h-48 w-full overflow-hidden">
                  <img
                    src={sim.image || "/placeholder.svg"}
                    alt={sim.title}
                    className="object-cover transition-transform duration-500"
                    style={{
                      transform:
                        hoveredCard === sim.id ? "scale(1.05)" : "scale(1)",
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
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
