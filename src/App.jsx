import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { lazy, Suspense } from "react";
import React from "react";
const Home = lazy(() => import("./pages/Home"));
const Games = lazy(() => import("./pages/Games.jsx"));
const PlayedGames = lazy(() => import("./pages/PlayedGames.jsx"));
const Standings = lazy(() => import("./pages/Standings.jsx"));
import Navbar from "./componants/Navbar";
import Footer from "./componants/Footer";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Suspense
          fallback={
            <div className="w-screen h-screen">
              <span className="loader"></span>
            </div>
          }
        >
          <Navbar />
          <Home />
          <Footer />
        </Suspense>
      ),
    },
    {
      path: "/games",
      element: (
        <Suspense
          fallback={
            <div className="w-screen h-screen">
              <span className="loader"></span>
            </div>
          }
        >
          <Navbar />
          <Games />
          <Footer />
        </Suspense>
      ),
    },
    {
      path: "/played_games",
      element: (
        <Suspense
          fallback={
            <div className="w-screen h-screen">
              <span className="loader"></span>
            </div>
          }
        >
          <Navbar />
          <PlayedGames />
          <Footer />
        </Suspense>
      ),
    },
    {
      path: "/standings",
      element: (
        <Suspense
          fallback={
            <div className="w-screen h-screen">
              <span className="loader"></span>
            </div>
          }
        >
          <Navbar />
          <Standings />
          <Footer />
        </Suspense>
      ),
    },
  ]);

  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
};
export default App;
