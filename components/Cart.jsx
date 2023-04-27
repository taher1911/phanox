import React, { useRef } from "react";
import Link from "next/link";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineLeft,
  AiOutlineShopping,
} from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";

import toast from "react-hot-toast";

import { useSelector, useDispatch } from "react-redux";
import { storeActions } from "@/store";

import { urlFor } from "@/utills/client";

import getStripe from "@/utills/getStripe";

const Cart = () => {
  const cartRef = useRef();
  const { totalPrice, totalQuantities, cartItems } = useSelector(
    (state) => state
  );
  const dispatch = useDispatch();

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const handleChekout = async () => {
    try {
      const stripe = await getStripe();
      const response = await fetch("/api/stripe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cartItems),
      });

      if (response.statusCode === 500) return;
      const data = await response.json();
      toast.loading("Redirecting...");
      stripe.redirectToCheckout({ sessionId: data.id });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="cart-wrapper" ref={cartRef}>
      <div className="cart-container">
        <button
          type="button"
          className="cart-heading"
          onClick={() => dispatch(storeActions.showCartHandler())}
        >
          <span className="close-cart">
            <AiOutlineLeft />
          </span>

          <span className="heading">Your Cart</span>
          <span className="cart-num-items">({totalQuantities} items)</span>
        </button>
        {cartItems.length < 1 && (
          <div className="empty-cart">
            <AiOutlineShopping size={150} />
            <h3>Your shopping bag is empty</h3>
            <Link href="/">
              <button
                type="button"
                onClick={() => dispatch(storeActions.showCartHandler())}
                className="btn"
              >
                Continue Shopping
              </button>
            </Link>
          </div>
        )}
        <div className="product-container">
          {cartItems.length >= 1 &&
            cartItems.map((item, i) => (
              <div key={i} className="product">
                <img
                  src={urlFor(item.image[0])}
                  alt={item.name}
                  className="cart-product-image"
                />
                <div className="item-desc">
                  <div className="flex top">
                    <h5>{item.name}</h5>
                    <h4>${item.price}</h4>
                  </div>
                  <div className="flex bottom">
                    <div>
                      <p className="quantity-desc">
                        <span
                          className="minus"
                          onClick={() =>
                            dispatch(
                              storeActions.toggleCartItemQuantity({
                                id: item._id,
                                value: "dec",
                              })
                            )
                          }
                        >
                          <AiOutlineMinus />
                        </span>
                        <span className="num">{item.quantity}</span>
                        <span
                          className="plus"
                          onClick={() =>
                            dispatch(
                              storeActions.toggleCartItemQuantity({
                                id: item._id,
                                value: "inc",
                              })
                            )
                          }
                        >
                          <AiOutlinePlus />
                        </span>
                      </p>
                    </div>
                    <button
                      type="button"
                      className="remove-item"
                      onClick={() =>
                        dispatch(storeActions.removeFromCart({ id: item._id }))
                      }
                      title="Delete product"
                    >
                      <TiDeleteOutline />{" "}
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
        {cartItems.length >= 1 && (
          <div className="cart-bottom">
            <div className="total">
              <h3>Subtotal:</h3>
              <h3>{formatter.format(totalPrice)}</h3>
            </div>
            <div className="btn-container">
              <button type="button" className="btn" onClick={handleChekout}>
                Pay with stripe
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
