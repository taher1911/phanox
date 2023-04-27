import React from "react";
import Link from "next/link";
import { AiOutlineShopping } from "react-icons/ai";

import { Cart } from ".";
import { useSelector, useDispatch } from "react-redux";
import { storeActions } from "@/store";

const Navbar = () => {
  const dispatch = useDispatch();
  const { showCart, totalQuantities } = useSelector((state) => state);

  return (
    <div className="navbar-container">
      <p className="logo">
        <Link href="/">Phanox Headphones</Link>
      </p>
      <button
        type="button"
        className="cart-icon"
        onClick={() => dispatch(storeActions.showCartHandler())}
      >
        <AiOutlineShopping />
        <span className="cart-item-qty">{totalQuantities}</span>
      </button>
      {showCart && <Cart />}
    </div>
  );
};

export default Navbar;
