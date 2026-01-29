import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import Home from "../pages/home";
import Profile from "../pages/profile/Profile";
import Shop from "../pages/shop";
import ProductPage from "../components/product-shop/search";
import BlogDetail from "../pages/BlogDetail";
import CheckoutPage from "../pages/shop/checkout/CheckoutPage";
import Blog from "../pages/blog";
import Login from "../components/modals/modals-item/authorization/login";
import Register from "../components/modals/modals-item/authorization/register";

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/home", element: <Home /> },
      { path: "/Blogs", element: <Blog /> },
      { path: "/profile", element: <Profile /> },
      { path: "/shop", element: <Shop /> },
      { path: "/shop/:category/:id", element: <ProductPage /> },
      { path: "/blog/:id", element: <BlogDetail /> },
      { path: "/checkout", element: <CheckoutPage /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
    ],
  },
]);
