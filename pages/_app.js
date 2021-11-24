import "../styles/globals.css";
import Layout from "layout";
import customTheme from "styles/Theme";
import { ChakraProvider } from "@chakra-ui/react";
import User from "../userContext";

const MyApp = ({ Component, pageProps }) => {
  return (
    <User>
      <ChakraProvider resetCSS theme={customTheme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </User>
  );
};

export default MyApp;
