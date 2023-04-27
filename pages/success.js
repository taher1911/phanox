import React, { useState, useEffect } from "react";
import Link from "next/link";
import { BsBagCheckFill } from "react-icons/bs";
import { useRouter } from "next/router";

import { runFireworks } from "@/utills/confetti";

import { storeActions } from "@/store";
import { useSelector, useDispatch } from "react-redux";

const success = () => {
  //   const [order, setOrder] = useState(null);
  const dispatch = useDispatch();
  const quantity = useSelector((state) => state.totalQuantity);

  useEffect(() => {
    localStorage.clear();
    dispatch(storeActions.paymentSucceeded());
    runFireworks();
  }, []);

  return (
    <div className="success-wrapper">
      <div className="success">
        <p className="icon">
          <BsBagCheckFill />
        </p>
        <h2>Thank you for your order!</h2>
        <p className="email-msg">Check your email inbox for the receipt.</p>
        <p className="description">
          if you have any question, please email
          <a className="email" href="mailto:taherabozeid91@gmail.com">
            taherabozeid91@gmail
          </a>
        </p>
        <Link href="/">
          <button type="button" width="300px" className="btn">
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  );
};

export default success;
