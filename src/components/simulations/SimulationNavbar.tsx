import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, Settings } from "lucide-react";

export const SimulationNavbar = ({
  onControlBtnClick,
}: {
  onControlBtnClick: () => void;
}) => {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur flex items-center justify-center">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/">
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">Back to home</span>
            </Link>
          </Button>
          <h1 className="text-lg font-semibold">
            Physics Simulator: Bouncing Ball
          </h1>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="gap-2"
          onClick={onControlBtnClick}
        >
          <Settings className="h-4 w-4" />
          <span>Controls</span>
        </Button>
      </div>
    </header>
  );
};
