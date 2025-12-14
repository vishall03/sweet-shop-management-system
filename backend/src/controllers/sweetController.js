const Sweet = require("../models/Sweet");
const { Op } = require("sequelize"); // ✅ IMPORT OPERATOR

// ===============================
// ADD SWEET
// ===============================
exports.addSweet = async (req, res) => {
  try {
    const sweet = await Sweet.create(req.body);
    res.status(201).json(sweet);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ===============================
// GET ALL SWEETS
// ===============================
exports.getSweets = async (req, res) => {
  try {
    const sweets = await Sweet.findAll();
    res.json(sweets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ===============================
// UPDATE SWEET
// ===============================
exports.updateSweet = async (req, res) => {
  try {
    const sweet = await Sweet.findByPk(req.params.id);
    if (!sweet) {
      return res.status(404).json({ message: "Sweet not found" });
    }

    await sweet.update(req.body);
    res.json(sweet);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ===============================
// DELETE SWEET
// ===============================
exports.deleteSweet = async (req, res) => {
  try {
    const sweet = await Sweet.findByPk(req.params.id);
    if (!sweet) {
      return res.status(404).json({ message: "Sweet not found" });
    }

    await sweet.destroy();
    res.json({ message: "Sweet deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ===============================
// PURCHASE SWEET
// ===============================
exports.purchaseSweet = async (req, res) => {
  try {
    const { quantity } = req.body;

    const sweet = await Sweet.findByPk(req.params.id);
    if (!sweet) {
      return res.status(404).json({ message: "Sweet not found" });
    }

    if (sweet.quantity < quantity) {
      return res.status(400).json({ message: "Not enough stock" });
    }

    sweet.quantity -= quantity;
    await sweet.save();

    res.json({
      message: "Purchase successful",
      remainingQuantity: sweet.quantity,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ===============================
// RESTOCK SWEET (ADMIN)
// ===============================
exports.restockSweet = async (req, res) => {
  try {
    const { quantity } = req.body;

    const sweet = await Sweet.findByPk(req.params.id);
    if (!sweet) {
      return res.status(404).json({ message: "Sweet not found" });
    }

    sweet.quantity += quantity;
    await sweet.save();

    res.json({
      message: "Restock successful",
      newQuantity: sweet.quantity,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ===============================
// 🔍 SEARCH SWEETS (NEW FEATURE)
// ===============================
exports.searchSweets = async (req, res) => {
  try {
    const { name, category, minPrice, maxPrice } = req.query;

    let whereClause = {};

    if (name) {
      whereClause.name = { [Op.like]: `%${name}%` };
    }

    if (category) {
      whereClause.category = category;
    }

    if (minPrice || maxPrice) {
      whereClause.price = {};
      if (minPrice) whereClause.price[Op.gte] = minPrice;
      if (maxPrice) whereClause.price[Op.lte] = maxPrice;
    }

    const sweets = await Sweet.findAll({ where: whereClause });
    res.json(sweets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
