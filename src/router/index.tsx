import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import Home from "../pages/home";
import Shop from "../pages/shop";
import ProductPage from "../components/product-shop/search";
import BlogDetail from "../pages/BlogDetail";
import CheckoutPage from "../pages/shop/checkout/CheckoutPage";
import Blog from "../pages/blog";
import Login from "../components/modals/modals-item/authorization/login";
import Register from "../components/modals/modals-item/authorization/register";
import WishlistPage from "../components/product-shop/like";
import ProfileLayout from "../pages/profile/layout/ProfileLayout";
import ProfilePage from "../pages/profile/Profile";
import MyProducts from "../pages/profile/myproduct";
import Orders from "../pages/profile/orders";

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/home", element: <Home /> },
      { path: "/Blogs", element: <Blog /> },
      { path: "/shop", element: <Shop /> },
      { path: "/shop/:category/:id", element: <ProductPage /> },
      { path: "/blog/:id", element: <BlogDetail /> },
      { path: "/proced-checkout", element: <CheckoutPage /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },

      {
        element: <ProfileLayout />,
        children: [
          { path: "/ProfilePage", element: <ProfilePage /> },
          { path: "/like", element: <WishlistPage /> },
          { path: "/orders", element: <Orders /> },
          { path: "/address", element: <div>Addres</div> },
          { path: "/my-products", element: <MyProducts /> },
        ],
      },
    ],
  },
]);
