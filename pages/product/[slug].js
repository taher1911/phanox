import React, { useState } from "react";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiFillStar,
  AiOutlineStar,
} from "react-icons/ai";

import { motion } from "framer-motion";

import { client, urlFor } from "@/utills/client";

import { Product } from "@/components";
import { useSelector, useDispatch } from "react-redux";
import { storeActions } from "@/store";

const ProductDetails = ({ product, products }) => {
  const [index, setIndex] = useState(0);
  const { image, name, details, price } = product;

  //store
  const qty = useSelector((state) => state.qty);
  const dispatch = useDispatch();

  const handleBuyNow = () => {
    dispatch(storeActions.onAdd({ product, qty }));
    dispatch(storeActions.showCartHandler());
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="product-detail-container">
        <div>
          <div className="image-container">
            <img
              src={urlFor(image && image[index])}
              alt="product"
              className="product-detail-image"
            />
          </div>
          <div className="small-images-container">
            {image?.map((item, i) => (
              <img
                key={i}
                src={urlFor(item)}
                className={
                  i === index ? "small-image selected-image" : "small-image"
                }
                onMouseEnter={() => setIndex(i)}
                alt="product"
              />
            ))}
          </div>
        </div>
        <div className="product-detail-desc">
          <h1>{name}</h1>
          <div className="reviews">
            <div>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            <p>(20)</p>
          </div>
          <h4>Details: </h4>
          <p>{details}</p>
          <p className="price">${price}</p>
          <div className="quantity">
            <h3>Quantity: </h3>
            <p className="quantity-desc">
              <span
                className="minus"
                onClick={() => dispatch(storeActions.decQty())}
              >
                <AiOutlineMinus />
              </span>
              <span className="num">{qty}</span>
              <span
                className="plus"
                onClick={() => dispatch(storeActions.incQty())}
              >
                <AiOutlinePlus />
              </span>
            </p>
          </div>
          <div className="buttons">
            <button
              type="button"
              className="add-to-cart"
              onClick={() => dispatch(storeActions.onAdd({ product, qty }))}
            >
              Add to Cart
            </button>
            <button type="button" className="buy-now" onClick={handleBuyNow}>
              Buy Now
            </button>
          </div>
        </div>
      </div>
      <div className="maylike-products-wrapper">
        <h2>you may also like</h2>
        <div className="marquee">
          <div className="maylike-products-container track">
            {products.map((product) => (
              <Product key={product._id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const getStaticPaths = async () => {
  const query = '*[_type == "product"]{slug{current}}';
  const products = await client.fetch(query);

  const paths = products.map((product) => ({
    params: {
      slug: product.slug.current,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async ({ params: { slug } }) => {
  const query = `*[_type == 'product' && slug.current == '${slug}'][0]`;
  const productsQuery = '*[_type == "product"]';

  const product = await client.fetch(query);
  const products = await client.fetch(productsQuery);
  return {
    props: { product, products },
  };
};

export default ProductDetails;
