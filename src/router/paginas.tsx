import Loading from '../components/Loading';
import SearchMovie from '../layout/components/SearchMovie';
import PageLayout from '../layout/PageLayout';
import DetailsPage from '../pages/DetailsPage';
import HomePage from '../pages/HomePage';
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
      errorElement: <Loading />,
    },
    {
      path: '/search',
      element: <SearchMovie />,
      errorElement: <Loading />,
    },
    {
      path: '/details/:media_type/:id',
      element: <DetailsPage />,
      errorElement: <Loading />,
    },
  ],
};

export default routesPaginas;
