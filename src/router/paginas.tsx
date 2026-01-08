import SearchMovie from '../layout/components/SearchMovie';
import PageLayout from '../layout/PageLayout';
import DetailsPage from '../pages/DetailsPage';
import HomePage from '../pages/HomePage';
import MyCollection from '../pages/MyCollection';
import NotFoundPage from '../pages/NotFoundPage';
import { ProtectedRoute } from './ProtectedRoute';

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
