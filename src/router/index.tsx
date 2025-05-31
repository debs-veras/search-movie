import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import routesPaginas from "./paginas";

function Router(): React.JSX.Element {
  const router = createBrowserRouter([
    routesPaginas
  ]);

  return <RouterProvider router={router} />;
}

export default Router;
