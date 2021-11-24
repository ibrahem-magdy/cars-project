import Header from "./header/header";
import Footer from "./footer";
import { Box } from "@chakra-ui/react";

const Layout = ({ children }) => {
  return (
    <Box
      display="grid"
      gridTemplateRows="80px 1fr 100px"
      minH="100vh"
      // gridRowGap="50px"
    >
      <Header />
      <Box>{children}</Box>
      <Footer />
    </Box>
  );
};

export default Layout;
