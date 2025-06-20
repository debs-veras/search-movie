import { Suspense } from "react";
import Router from "./router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "./components/Loading";
import { SearchProvider } from "./context/FiltroContext";

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        rtl={false}
        draggable
        pauseOnHover
        closeButton={true}
        style={{ width: "fit-content" }}
      />
      <div className="bg-gray-100 h-screen">
        <SearchProvider>
          <Router />
        </SearchProvider>
      </div>
    </Suspense>
  );
}

export default App;
