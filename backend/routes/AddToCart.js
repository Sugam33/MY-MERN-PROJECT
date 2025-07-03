const express = require("express");
const Cart = require("../model/Cart");
const fetchUser = require("../middleware/FetchUser");
const { body, validationResult } = require("express-validator");
const router = express.Router();

router.get("/mycart", fetchUser, async (req, res) => {
  try {
    const cartItems = await Cart.find({ user: req.user.id });
    res.json(cartItems);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post(
  "/addtocart",
  fetchUser,
  body("product").notEmpty().withMessage("You must write the product value"),
  body("quantity").isInt({ min: 1 }).withMessage("Quantity must be at least 1"),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { product, quantity } = req.body;
      let existingCartItem = await Cart.findOne({
        user: req.user.id,
        product: product
      });

      if (existingCartItem) {
        existingCartItem.quantity += quantity;
        await existingCartItem.save();
        res.status(200).json({ message: "Cart updated", cart: existingCartItem });
      } else {
        const cartItem = new Cart({
          user: req.user.id,
          product,
          quantity,
        });
        const savedCart = await cartItem.save();
        res.status(201).json({ message: "Item added to cart", cart: savedCart });
      }
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

module.exports = router;
