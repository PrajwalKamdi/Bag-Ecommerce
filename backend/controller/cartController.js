import Cart from "../models/cartSchema.js";

export const addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      // create a new cart if not exists
      cart = new Cart({
        userId,
        products: [{ productId, quantity }],
      });
    } else {
      // check if product already exists
      const productIndex = cart.products.findIndex(
        (p) => p.productId.toString() === productId
      );

      if (productIndex > -1) {
        // update quantity if product already in cart
        cart.products[productIndex].quantity += quantity;
      } else {
        // add new product
        cart.products.push({ productId, quantity });
      }
    }

    await cart.save();
    res.status(200).json({ success: true, cart });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


// Delete entire cart for a user
export const deleteProductFromCart = async (req, res) => {
  try {
    const { userId } = req.body;
    const { productId } = req.body;

    let cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    // filter out the product
    const updatedProducts = cart.products.filter(
      (p) => p.productId.toString() !== productId
    );
    cart.products = updatedProducts;
    await cart.save();
    res.status(200).json({ success: true, cart });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};



export const getCartByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const cart = await Cart.findOne({ userId }).populate("products.productId");
    if (!cart) {
      return res.status(404).json({ success: false, message: "Cart not found" });
    }
    res.status(200).json({ success: true, cart });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const removeAllFromCart = async (req, res) => {
  const userId = req.body;
  try {
    const cart = await Cart.findOne({ userId });
    console.log(cart)
    if (!cart) {
      res.status(404).json({
        sucess: false,
        message: "cart not found!"
      })
    }
    console.log(cart)

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

