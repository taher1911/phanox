import "@/styles/globals.css";
import { Layout } from "@/components";
import { Toaster } from "react-hot-toast";

import { Provider } from "react-redux";
import store from "@/store";

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Layout>
        <Toaster />
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}
