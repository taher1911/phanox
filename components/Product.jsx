import React, { useRef } from "react";
import Link from "next/link";

import { useInView } from "framer-motion";

import { urlFor } from "@/utills/client";
const Product = ({ product: { image, name, slug, price } }) => {
  const ref = useRef(null);
  const isInView = useInView(ref);
  return (
    <div
      ref={ref}
      style={{
        transform: isInView ? "none" : "translateY(80px)",
        opacity: isInView ? 1 : 0,
        transition: "all 0.9s ",
      }}
    >
      <Link href={`/product/${slug.current}`}>
        <div className="product-card">
          <img
            src={urlFor(image && image[0])}
            width={250}
            height={250}
            alt="product"
            className="product-image"
          />
          <p className="product-name">{name}</p>
          <p className="product-price">${price}</p>
        </div>
      </Link>
    </div>
  );
};

export default Product;
