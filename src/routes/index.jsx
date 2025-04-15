import React, { Suspense } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import NotFound from "../Components/NotFound";
import { dashboardItems } from "../constants/router.constants";
import Auth from "../layouts/Auth/Auth";
import Main from "../layouts/Main/Main";
import { routesGenerators } from "../utils/routesGenerators";

// Lazy-loaded components for authentication
const SignIn = React.lazy(() => import("../pages/Auth/SignIn"));
const ForgotPassword = React.lazy(() => import("../pages/Auth/ForgotPassword"));
const ResetPassword = React.lazy(() => import("../pages/Auth/ResetPassword"));
const VerifyEmail = React.lazy(() => import("../pages/Auth/VerifyEmail"));

// Error Boundary for lazy loading fallback
const LazyLoadFallback = ({ children }) => (
  <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Main />
      // <AdminRoutes>
      // </AdminRoutes>
    ),
    children: routesGenerators(dashboardItems),
  },
  {
    path: "/auth",
    element: <Auth />,
    children: [
      {
        path: "/auth",
        element: <Navigate to={"/auth/sign-in"} />,
      },
      {
        path: "/auth/sign-in",
        element: (
          <LazyLoadFallback>
            <SignIn />
          </LazyLoadFallback>
        ),
      },
      {
        path: "/auth/forgot-password",
        element: (
          <LazyLoadFallback>
            <ForgotPassword />
          </LazyLoadFallback>
        ),
      },
      {
        path: `/auth/verify-email/:id`,
        element: (
          <LazyLoadFallback>
            <VerifyEmail />
          </LazyLoadFallback>
        ),
      },
      {
        path: "/auth/reset-password",
        element: (
          <LazyLoadFallback>
            <ResetPassword />
          </LazyLoadFallback>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
