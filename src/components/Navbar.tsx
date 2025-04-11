import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Atom } from "lucide-react";

export const Navbar = () => {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur flex items-center justify-center">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="rounded-full bg-primary/10 p-1">
            <Atom className="h-6 w-6 text-primary" />
          </div>
          <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent font-bold">
            Ananta
          </span>
        </Link>
        <nav className="hidden md:flex gap-6">
          <Link to="/" className="text-sm font-medium hover:text-primary">
            Home
          </Link>
          <Link
            to="#simulations"
            className="text-sm font-medium hover:text-primary"
          >
            Simulations
          </Link>
          <Link to="#" className="text-sm font-medium hover:text-primary">
            About
          </Link>
          <Link to="#" className="text-sm font-medium hover:text-primary">
            Contact
          </Link>
        </nav>
        <Button
          variant="outline"
          size="sm"
          className="hidden border-primary/20 bg-primary/5 hover:bg-primary/10 md:inline-flex"
        >
          Get Started
        </Button>
      </div>
    </header>
  );
};
