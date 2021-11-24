import { Box, Text } from "@chakra-ui/react";
const Footer = ({ ...props }) => {
  return (
    <Box {...props} display="grid" placeItems="center" bg="#131417">
      <Text color="white">copyright©Ibrahem Magdy 2021</Text>
    </Box>
  );
};

export default Footer;
