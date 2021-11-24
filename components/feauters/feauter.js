import { Flex, Box, Heading, Image, Text } from "@chakra-ui/react";

const Feauter = ({ text, heading, img, dir }) => {
  return (
    <Flex
      flexDirection={dir ? "row-reverse" : "row"}
      h={["auto", "", "400px", ""]}
      bg="#131417"
      flexWrap="wrap"
      overflow="hidden"
    >
      <Box
        className="feauter_width"
        w="50%"
        p={["20px", "", "100px", ""]}
        h="100%"
      >
        <Heading mb="20px">{heading} </Heading>
        <Text color="gray">{text}</Text>
      </Box>
      <Image
        src={img}
        h="auto"
        className="feauter_width"
        w="50%"
        objectFit="cover"
        alt="feauter"
      />
    </Flex>
  );
};

export default Feauter;
