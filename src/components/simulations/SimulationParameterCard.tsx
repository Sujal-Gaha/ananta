import type { ReactNode } from "react";

export type SimulationParameterCardProps = {
  id: string;
  title: string;
  description: string;
  icon?: ReactNode;
  className?: string;
};

export function SimulationParameterCard({
  id,
  title,
  description,
  icon,
  className = "",
}: SimulationParameterCardProps) {
  return (
    <div id={id} className={`rounded-lg border bg-primary/5 p-4 ${className}`}>
      <div className="flex items-center gap-2">
        {icon && <div className="text-primary">{icon}</div>}
        <h3 className="font-medium text-primary">{title}</h3>
      </div>
      <p className="mt-1 text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
