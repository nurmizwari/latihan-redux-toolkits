import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getProducts,
  productSelectors,
  updateProducts,
} from "../features/ProductSlice";
import { useParams, useNavigate } from "react-router-dom";

// import { update } from "../features/ProductSlice";

const EditProduct = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  //   const updateProduct = (e) => {
  //     e.preventDefault();
  //     dispatch(update({ title, price }));
  //   };

  const product = useSelector((state) =>
    productSelectors.selectById(state, id)
  );

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);
  useEffect(() => {
    if (product) {
      setTitle(product.title);
      setPrice(product.price);
    }
  }, [product]);
  const handleUpdate = async (e) => {
    e.preventDefault();
    await dispatch(updateProducts({ id, price, title }));
    navigate("/");
  };

  return (
    <div className="shadow mt-5 p-3">
      <form onSubmit={handleUpdate}>
        <div className="field">
          <label for="" className="label">
            Title
          </label>
          <div className="control">
            <input
              className="form-control"
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
        </div>
        <div className="field">
          <label for="" className="label">
            price
          </label>
          <div className="control">
            <input
              className="form-control"
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="price"
            />
          </div>
        </div>
        <div className="field">
          <button type="submit" class="btn btn-primary mt-3">
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
