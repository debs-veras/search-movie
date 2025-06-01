import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import routesPaginas from "./paginas";
import NotFoundPage from "../pages/NotFoundPage";
import Login from "../pages/Login";

// const Login = lazy(() => import("../pages/Login"));
// const NotFound = lazy(() => import("../templates/pages/NotFound"));

function Router(): React.JSX.Element {
  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login />,
      errorElement: <NotFoundPage />,
    },
    routesPaginas
  ]);

  return <RouterProvider router={router} />;
}

export default Router;
