// create routes for products
import express from "express";
import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
  getProduct,
} from "../controllers/products.js";

const router = express.Router();

router.get("/", getProducts);
router.post("/", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);
// get single product
router.get("/:id", getProduct);

export default router;
