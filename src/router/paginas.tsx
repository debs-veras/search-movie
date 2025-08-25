import Loading from '../components/Loading';
import PageLayout from '../layout/PageLayout';
import HomePage from '../pages/HomePage';
import NotFoundPage from '../pages/NotFoundPage';
import SeriesPage from '../pages/SeriesPage';
import ProtectedRoute from './privateRoute';

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
      path: '/series',
      element: <SeriesPage />,
      errorElement: <Loading />,
    },
  ],
};

export default routesPaginas;
