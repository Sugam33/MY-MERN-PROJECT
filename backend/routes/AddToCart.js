const express = require("express");
const Cart = require("../model/Cart");
const fetchUser = require("../middleware/FetchUser");
const { body, validationResult } = require("express-validator");
const router = express.Router();

// get products from cart
router.get("/mycart", fetchUser, async (req, res) => {
  try {
    const cartItems = await Cart.find({ user: req.user.id }).populate("product");
    res.json(cartItems);
  } catch (error) {
    console.error("Fetch cart error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// add products in cart
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

    console.log("Incoming cart data:", req.body);

    try {
      const { product, quantity, price } = req.body;
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
          price,
        });
        const savedCart = await cartItem.save();
        res.status(201).json({ message: "Item added to cart", cart: savedCart });
      }
    } catch (error) {
  console.error("Add to cart error:", error);
  res.status(500).json({ error: "Internal server error" });
}
  }
);

// update product in cart 
router.put("/updatecart/:productId", fetchUser, async (req, res) => {
  try {
    const { quantity } = req.body;
    const { productId } = req.params;

    const cartItem = await Cart.findOne({
      user: req.user.id,
      product: productId,
    });

    if (!cartItem) {
      return res.status(404).json({ error: "Cart item not found" });
    }

    cartItem.quantity = quantity;
    await cartItem.save();

    res.status(200).json({ message: "Cart item updated", cart: cartItem });
  } catch (error) {
    console.error("Update cart error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// delete product in cart 
router.delete("/removefromcart/:productId", fetchUser, async (req, res) => {
  try {
    const { productId } = req.params;

    const deletedItem = await Cart.findOneAndDelete({
      user: req.user.id,
      product: productId,
    });

    if (!deletedItem) {
      return res.status(404).json({ error: "Cart item not found" });
    }

    res.status(200).json({ message: "Item removed from cart", cart: deletedItem });
  } catch (error) {
    console.error("Remove from cart error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// clear all cart products 
router.delete("/clearcart", fetchUser, async (req, res) => {
  try {
    const result = await Cart.deleteMany({ user: req.user.id });

    res.status(200).json({
      message: "All items removed from cart",
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    console.error("Clear cart error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


module.exports = router;
