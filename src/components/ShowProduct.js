import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  getProducts,
  productSelectors,
  deleteProducts,
} from "../features/ProductSlice";

const ShowProduct = () => {
  const { title, price } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);
  const product = useSelector(productSelectors.selectAll);
  return (
    <div className="shadow p-3 mt-5">
      <Link to={"/add"}>
        <button type="" className="btn btn-success">
          {" "}
          Add New
        </button>
      </Link>
      <div class="table-responsive">
        <table class="table table-striped">
          <thead>
            <tr>
              <th scope="col">No</th>
              <th scope="col">Title</th>
              <th scope="col">Price</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {product.map((el, idx) => (
              <tr key={el.id}>
                <td scope="row">{idx + 1}</td>
                <td>{el.title}</td>
                <td>{el.price}</td>
                <td>
                  <Link
                    to={`/edit/${el.id}`}
                    type=""
                    className="btn btn-primary me-2"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={async () => {
                      await dispatch(deleteProducts(el.id));
                      dispatch(getProducts());
                    }}
                    type=""
                    className="btn btn-primary"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ShowProduct;
