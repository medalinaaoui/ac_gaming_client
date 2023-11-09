import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense } from "react";
import React from "react";
const Home = lazy(() => import("./pages/Home"));
const Games = lazy(() => import("./pages/Games.jsx"));
const PlayedGames = lazy(() => import("./pages/PlayedGames.jsx"));
const Standings = lazy(() => import("./pages/Standings.jsx"));
import Navbar from "./componants/Navbar";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <Navbar />
          <Home />
        </Suspense>
      ),
    },
    {
      path: "/games",
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <Navbar />
          <Games />
        </Suspense>
      ),
    },
    {
      path: "/played_games",
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <Navbar />
          <PlayedGames />
        </Suspense>
      ),
    },
    {
      path: "/standings",
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <Navbar />
          <Standings />
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
