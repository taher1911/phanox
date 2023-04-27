import React from "react";
import Head from "next/head";

import { Navbar, Footer } from ".";

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Head>
        <title>Phanox Store</title>
        <meta
          name="description"
          content="Author:Taher abozeid,
    fullstack web developer"
        ></meta>
      </Head>
      <header>
        <Navbar />
      </header>
      <main className="main-container">{children}</main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
