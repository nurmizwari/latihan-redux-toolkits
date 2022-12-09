import { createBrowserRouter } from "react-router-dom";
import EditProduct from "../components/EditProduct";
import ShowProduct from "../components/ShowProduct";
import AddProduct from "./../components/AddProduct";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <ShowProduct />,
  },
  {
    path: "/add",
    element: <AddProduct />,
  },
  {
    path: "/edit/:id",
    element: <EditProduct />,
  },
]);
