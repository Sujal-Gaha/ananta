import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background to-primary/5 flex items-center justify-center">
      <div className="absolute inset-0 bg-grid-small-white/[0.2] bg-[length:20px_20px]" />
      <div className="container relative flex flex-col items-center justify-center space-y-8 py-32 text-center md:py-40">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <div className="absolute -inset-x-20 -top-6 -bottom-6 bg-primary/10 blur-3xl" />
          <h1 className="relative text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
            Interactive{" "}
            <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent pr-0.5">
              Simulations
            </span>{" "}
            Lab
          </h1>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative max-w-[700px]"
        >
          <p className="text-muted-foreground md:text-xl">
            Explore complex systems through interactive simulations. Visualize
            scientific concepts, experiment with parameters, and deepen your
            understanding.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col gap-4 sm:flex-row"
        >
          <Button
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90"
            asChild
          >
            <Link to="#simulations">
              Explore Simulations <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-primary/20 bg-primary/5 hover:bg-primary/10"
          >
            Learn More
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
