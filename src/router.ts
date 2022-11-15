import path from "node:path";
import { Router } from "express";
import multer from "multer";

import { createCategory } from "./useCases/categories/createCategory";
import { listCategories } from "./useCases/categories/listCategories";
import { createProduct } from "./useCases/products/createProduct";
import { listProducts } from "./useCases/products/listProducts";
import { listProductsByCategory } from "./useCases/categories/listProductsByCategory";
import { listOrders } from "./useCases/orders/listOrders";
import { createOrder } from "./useCases/orders/createOrder";
import { changeOrderStatus } from "./useCases/orders/changeOrderStatus";
import { cancelOrder } from "./useCases/orders/cancelOrder";

export const router = Router();

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, callback) {
      callback(null, path.resolve(__dirname, "..", "uploads"));
    },
    filename(req, file, callback) {
      callback(null, `${Date.now()}-${file.originalname}`);
    },
  }),
});

// List Categories
router.get("/categories", listCategories);

// Create Category
router.post("/categories", createCategory);

// List Products
router.get("/products", listProducts);

// Create Product
router.post("/products", upload.single("image"), createProduct);

// Get Products by Category
router.post("/categories/:categoryId/products", listProductsByCategory);

// List Orders
router.get("/orders", listOrders);

// Create Order
router.post("/orders", createOrder);

// Change Order Status
router.patch("/orders/:orderId", changeOrderStatus);

// Delete/Cancel Order
router.delete("/orders/:orderId", cancelOrder);
