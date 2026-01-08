import React, { lazy } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import routesPaginas from './paginas';
import NotFoundPage from '../pages/NotFoundPage';

const Login = lazy(() => import('../pages/Login'));

function Router(): React.JSX.Element {
  const router = createBrowserRouter([
    {
      path: '/login',
      element: <Login />,
      errorElement: <NotFoundPage />,
    },
    routesPaginas,
  ]);

  return <RouterProvider router={router} />;
}

export default Router;
