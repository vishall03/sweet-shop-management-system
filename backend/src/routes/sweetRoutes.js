const express = require("express");
const router = express.Router();

const sweetController = require("../controllers/sweetController");
const protect = require("../middleware/authMiddleware");
const { isAdmin } = require("../middleware/adminMiddleware");

// 🔍 SEARCH (MUST BE ABOVE "/")
router.get("/search", protect, sweetController.searchSweets);

// CRUD
router.post("/", protect, sweetController.addSweet);
router.get("/", protect, sweetController.getSweets);
router.put("/:id", protect, sweetController.updateSweet);
router.delete("/:id", protect, isAdmin, sweetController.deleteSweet);

// Purchase & Restock
router.post("/:id/purchase", protect, sweetController.purchaseSweet);
router.post("/:id/restock", protect, isAdmin, sweetController.restockSweet);

module.exports = router;
