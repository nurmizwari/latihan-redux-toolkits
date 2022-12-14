import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "axios";

export const getProducts = createAsyncThunk("product/getProducts", async () => {
  const response = await axios.get("http://localhost:5000/product");
  return response.data;
});

export const saveProducts = createAsyncThunk(
  "product/saveProducts",
  async ({ title, price }) => {
    const response = await axios.post("http://localhost:5000/product", {
      title,
      price,
    });
    return response.data;
  }
);
export const updateProducts = createAsyncThunk(
  "product/updateProducts",
  async ({ title, price, id }) => {
    const response = await axios.patch(`http://localhost:5000/product/${id}`, {
      title,
      price,
    });
    return response.data;
  }
);
export const deleteProducts = createAsyncThunk(
  "product/deleteProducts",
  async (id) => {
    const response = await axios.delete(`http://localhost:5000/product/${id}`);
    return response.data;
  }
);

const productEntity = createEntityAdapter({
  selectId: (product) => product.id,
});

const productSlice = createSlice({
  name: "product",
  initialState:
    // title: "product 1",
    // price: "123",
    productEntity.getInitialState(),
  extraReducers: {
    [getProducts.fulfilled]: (state, action) => {
      productEntity.setAll(state, action.payload);
    },
    [saveProducts.fulfilled]: (state, action) => {
      productEntity.addOne(state, action.payload);
    },
    [deleteProducts.fulfilled]: (state, action) => {
      productEntity.removeOne(state, action.payload);
    },
    [updateProducts.fulfilled]: (state, action) => {
      productEntity.updateOne(state, {
        id: action.payload.id,
        updates: action.payload,
      });
    },
  },

  //   reducers: {
  //     update: (state, action) => {
  //       state.title = action.payload.title;
  //       state.price = action.payload.price;
  //     },
  //   },
});

// export const { update } = productSlice.actions;
export const productSelectors = productEntity.getSelectors(
  (state) => state.product
);
export default productSlice.reducer;
