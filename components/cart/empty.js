import { Box, Flex, Text } from "@chakra-ui/react";

const Empty = () => {
  return (
    <Flex bg="black" justifyContent="center" alignItems="center" h="100%">
      <Text fontSize="30px" color="gray">
        cart is empty yet!
      </Text>
    </Flex>
  );
};

export default Empty;
