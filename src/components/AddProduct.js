import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { saveProducts } from "../features/ProductSlice";
import { useNavigate } from "react-router-dom";
// import { update } from "../features/ProductSlice";

const AddProduct = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const dispatch = useDispatch();
  //   const updateProduct = (e) => {
  //     e.preventDefault();
  //     dispatch(update({ title, price }));
  //   };
  const navigate = useNavigate();
  const createProduct = async (e) => {
    e.preventDefault();
    await dispatch(saveProducts({ title, price }));
    navigate("/");
  };
  return (
    <div className="shadow mt-5 p-3">
      <form onSubmit={createProduct}>
        <div className="field">
          <label for="" className="label">
            Title
          </label>
          <div className="control">
            <input
              className="form-control"
              type="text"
              placeholder="Title"
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
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
