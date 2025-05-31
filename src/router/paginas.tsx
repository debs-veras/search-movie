import Loading from "../components/Loading";
import HomePage from "../pages/HomePage";
import NotFoundPage from "../pages/NotFoundPage";

const routesPaginas = {
  path: "/",
  errorElement: <NotFoundPage />,
  children: [
    {
      path: "/",
      element: <HomePage />,
      errorElement: <Loading />,
    }
  ],
};

export default routesPaginas;
