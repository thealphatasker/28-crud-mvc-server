import Product from "../model/Product.js";

const getProductsController = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products" });
  }
};

const saveProductController = async (req, res) => {
  try {
    const newProductFields = req.body;

    // Check if product with same ID already exists
    const existingProduct = await Product.findOne({ id: newProductFields.id });
    if (existingProduct) {
      return res
        .status(400)
        .json({
          message: `Product with ID ${newProductFields.id} already exists!`,
        });
    }

    const newProduct = new Product(newProductFields);
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ message: "Product with this ID already exists!" });
    }
    res.status(500).json({ message: "Error saving product" });
  }
};

const updateProductController = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedProductFields = req.body;
    const updatedProduct = await Product.findOneAndUpdate(
      { id: id },
      updatedProductFields,
      { new: true },
    );
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: "Error updating product" });
  }
};

const deleteProductController = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findOneAndDelete({ id: id });
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting product" });
  }
};

export {
  getProductsController,
  saveProductController,
  updateProductController,
  deleteProductController,
};
