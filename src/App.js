import { lazy, Suspense, useContext, useState } from "react";
import { createRoot } from "react-dom/client";
import UserContext from "../utils/UserContext";
import { Provider } from "react-redux";
import appStore from "../utils/appStore";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

// import Header from "./components/Header";
// import Body from "./components/Body";
// import Contact from "./components/Contact";
// import ErrorPage from "./components/ErrorPage";
// import RestaurantMenu from "./components/RestaurantMenu";
// import Cart from "./components/Cart";

const ErrorPage = lazy(() => import("./components/ErrorPage"));
const Header = lazy(() => import("./components/Header"));
const RestaurantMenu = lazy(() => import("./components/RestaurantMenu"));
const Body = lazy(() => import("./components/Body"));
const About = lazy(() => import("./components/About"));
const Cart = lazy(() => import("./components/Cart"));
const Contact = lazy(() => import("./components/Contact"));
const Grocery = lazy(() => import("./components/Grocery"));

const AppLayout = () => {
  const [globalText, setGlobalText] = useState("");
  return (
    <div className="app">
      <Provider store={appStore}>
        <UserContext.Provider
          value={{ loggedInUser: globalText, setGlobalText }}
        >
          <Header />
          <Suspense fallback={<h1>Loading....</h1>}>
            <Outlet />
          </Suspense>
        </UserContext.Provider>
      </Provider>
    </div>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/grocery",
        element: <Grocery />,
      },
      {
        path: "/restaurants/:resId",
        element: <RestaurantMenu />,
      },
    ],
    errorElement: <ErrorPage />,
  },
]);

const root = createRoot(document.getElementById("root"));

root.render(<RouterProvider router={appRouter} />);
