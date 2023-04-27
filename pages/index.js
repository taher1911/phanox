import React from "react";

import { client } from "@/utills/client";
import { Product, FooterBanner, HeroBanner } from "../components";

import { motion } from "framer-motion";

const Home = ({ products, bannerData, footerData, loading }) => {
  if (loading) return <h1>Loading..........</h1>;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <HeroBanner heroBanner={bannerData.length && bannerData[0]} />
      <section className="products-heading">
        <h2>Best Selling Products.</h2>
        <p>Speakers of many variations</p>
      </section>
      <section className="products-container">
        {products?.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </section>
      <FooterBanner footerBanner={footerData && footerData[0]} />
    </motion.div>
  );
};

export const getServerSideProps = async () => {
  //fetch products
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);

  //fetch banner data
  const bannerQuery = "*[_type == 'banner' && largeText1 == 'HEADPHONE' ]";
  const bannerData = await client.fetch(bannerQuery);

  //fetch footer data
  const footerQuery = "*[_type == 'banner' && largeText1 == 'FINE' ]";
  const footerData = await client.fetch(footerQuery);

  return {
    props: { products, bannerData, footerData },
  };
};

export default Home;
