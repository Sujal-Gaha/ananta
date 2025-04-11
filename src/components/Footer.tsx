import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="border-t bg-muted/30 py-6 md:py-0 flex items-center justify-center">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          © {new Date().getFullYear()}{" "}
          <span className="text-primary font-medium">Ananta</span>. All rights
          reserved.
        </p>
        <div className="flex items-center gap-4">
          <Link
            to="#"
            className="text-sm text-muted-foreground hover:text-primary hover:underline"
          >
            Terms
          </Link>
          <Link
            to="#"
            className="text-sm text-muted-foreground hover:text-primary hover:underline"
          >
            Privacy
          </Link>
          <Link
            to="#"
            className="text-sm text-muted-foreground hover:text-primary hover:underline"
          >
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
};
