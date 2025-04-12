import { useState } from "react";
import { motion } from "framer-motion";
import { SimulationControlModal } from "@/components/simulations/simulation-control-modal";
import { SimulationNavbar } from "@/components/simulations/SimulationNavbar";
import { BouncingBallCanvas } from "@/simulation/BouncingBall/BouncingBallCanvas";
import { SimulationParameterCard } from "@/components/simulations/SimulationParameterCard";
import {
  BouncingBallConstants,
  simulationParameters,
} from "@/constants/simulations/BouncingBall";

export const BouncingBallPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openSimulationControlModal = () => setIsModalOpen(true);
  const closeSimulationControlModal = () => setIsModalOpen(false);

  return (
    <div className="flex min-h-screen flex-col">
      <SimulationNavbar onControlBtnClick={openSimulationControlModal} />

      <main className="flex-1 bg-grid-small-white/[0.2] bg-[length:20px_20px] flex justify-center">
        <div className="container py-8">
          <motion.div
            className="rounded-lg border bg-background/80 p-6 backdrop-blur-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="mb-4 space-y-2">
              <h2 className="text-2xl font-bold">
                {BouncingBallConstants.title}
              </h2>
              <p className="text-muted-foreground">
                {BouncingBallConstants.description}
              </p>
            </div>

            <BouncingBallCanvas />

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {simulationParameters.map((params) => (
                <SimulationParameterCard
                  key={params.id}
                  id={params.id}
                  title={params.title}
                  description={params.description}
                  className={params.className}
                  icon={params.icon}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </main>

      <SimulationControlModal
        isOpen={isModalOpen}
        onClose={closeSimulationControlModal}
      />
    </div>
  );
};
