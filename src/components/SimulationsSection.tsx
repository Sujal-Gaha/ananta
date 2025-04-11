import { motion } from "framer-motion";
import { useState } from "react";
import { Atom } from "lucide-react";
import { simulations } from "@/constants/simulaions";
import { SimulationCard } from "./SimulationCard";

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

type HoveredCard = string | null;

export const SimulationsSection = () => {
  const [hoveredCard, setHoveredCard] = useState<HoveredCard>(null);

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
              <SimulationCard hoveredCard={hoveredCard} sim={sim} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
