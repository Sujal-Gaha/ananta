import { ROUTE_PATHS } from "@/constants/routes";
import { NotFoundPage } from "@/pages/NotFound";
import { RouteObject } from "react-router-dom";
import { HomePage } from "@/pages/Home";

export const routes: RouteObject[] = [
  {
    path: ROUTE_PATHS.HOME,
    element: <HomePage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
];
