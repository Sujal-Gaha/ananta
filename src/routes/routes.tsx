import { ROUTE_PATHS } from "@/constants/routes";
import { NotFoundPage } from "@/pages/NotFound";
import { RouteObject } from "react-router-dom";
import { HomePage } from "@/pages/Home";
import { BouncingBallPage } from "@/pages/simulations/BouncingBallPage";

export const routes: RouteObject[] = [
  {
    path: ROUTE_PATHS.HOME,
    element: <HomePage />,
  },
  {
    path: ROUTE_PATHS.BOUNCING_BALL,
    element: <BouncingBallPage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
];
