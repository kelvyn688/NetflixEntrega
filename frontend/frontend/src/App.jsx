import { Home } from './pages/Home/Home'
import { Signin } from './pages/Signin/Signin';
import { ErrorPage } from './pages/ErrorPage/ErrorPage';

// RRD
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import './App.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/signin" />,
  },
  {
    path: "/signin",
    element: <Signin />,
  },
  {
    path: "/home",
    element: <Home />,
    errorElement: <ErrorPage />
  },
]);

export function App() {

  return (
    <RouterProvider router={router} />
  )
}