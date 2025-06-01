import Loading from "../components/Loading";
import PageLayout from "../layout/PageLayout";
import HomePage from "../pages/HomePage";
import NotFoundPage from "../pages/NotFoundPage";

const routesPaginas = {
  path: "/",
  element: <PageLayout />,
  errorElement: <NotFoundPage />,
  children: [
    {
      path: "/",
      element: <HomePage />,
      errorElement: <Loading />,
    },
  ],
};

export default routesPaginas;
