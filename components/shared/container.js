import { Box } from "@chakra-ui/react";

const Container = ({ children }) => {
  return (
    <Box m="auto" maxW="1440px" px="15px">
      {children}
    </Box>
  );
};

export default Container;
