import "../styles/globals.css";
import Layout from "layout";
import customTheme from "styles/Theme";
import { ChakraProvider } from "@chakra-ui/react";
import User, { Car } from "../userContext";

const MyApp = ({ Component, pageProps }) => {
  return (
    <Car>
      <User>
        <ChakraProvider resetCSS theme={customTheme}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ChakraProvider>
      </User>
    </Car>
  );
};

export default MyApp;
