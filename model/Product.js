import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
  },
  price: {
    type: Number,
  },
  img: {
    type: String,
  },
  desc: {
    type: String,
  },
});

const Product = mongoose.model("Product", productSchema);

export default Product;
