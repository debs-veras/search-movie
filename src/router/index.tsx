import React, { lazy } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import routesPaginas from './paginas';

const Login = lazy(() => import('../pages/Login'));
const NotFound = lazy(() => import('../pages/NotFoundPage'));

function Router(): React.JSX.Element {
  const router = createBrowserRouter([
    {
      path: '/login',
      element: <Login />,
      errorElement: <NotFound />,
    },
    routesPaginas,
  ]);

  return <RouterProvider router={router} />;
}

export default Router;
