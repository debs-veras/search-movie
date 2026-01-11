import { lazy } from 'react';
import SearchMovie from '../pages/SearchMovie';
import PageLayout from '../layout/PageLayout';
import NotFoundPage from '../pages/NotFoundPage';
import { ProtectedRoute } from './ProtectedRoute';
import DetailsPage from '../pages/DetailsPage';
import MyCollection from '../pages/MyCollection';

const HomePage = lazy(() => import('../pages/HomePage'));

const routesPaginas = {
  path: '/',
  element: (
    <ProtectedRoute>
      <PageLayout />
    </ProtectedRoute>
  ),
  errorElement: <NotFoundPage />,
  children: [
    {
      path: '/',
      element: <HomePage />,
      errorElement: <NotFoundPage />,
    },
    {
      path: '/search',
      element: <SearchMovie />,
      errorElement: <NotFoundPage />,
    },
    {
      path: '/details/:media_type/:id',
      element: <DetailsPage />,
      errorElement: <NotFoundPage />,
    },
    {
      path: '/my-collection',
      element: <MyCollection />,
      errorElement: <NotFoundPage />,
    },
  ],
};

export default routesPaginas;
