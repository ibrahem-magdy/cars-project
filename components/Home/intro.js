import { Box, Flex, Heading, Image, Text } from "@chakra-ui/react";
import Container from "components/shared/container";

const Intro = () => {
  return (
    <Box
      pos="relative"
      minH={["50vh", "", "80vh", ""]}
      bg="black"
      overflow="hidden"
    >
      <Container>
        <Flex
          className="height_intro"
          alignItems={["center", "", "initial", ""]}
          h={["80vh", "", "100%", ""]}
          pt={["0", "", "50px", ""]}
        >
          <Box w={["100%", "", "65%", "50%"]} pos="relative" zIndex="3">
            <Heading
              as="h2"
              lineHeight={["1.1", "", "1.3", ""]}
              fontSize={["38px", "55px", "", "55px"]}
              mb={["40px", "", "0", ""]}
              className="heading_intro"
            >
              Long-journey
              <br />
              experience with short
              <br />
              commute convenience.
            </Heading>

            <Box pl={["0", "", "0", "15%"]}>
              <Text mb="40px" lineHeight={["1.6", "", "1.9", ""]} color="gray">
                Lorem ipsum dolor sit amet consectetur adipisicing elitdicta
                voluptatem.
                <br /> Suscipit fugiat eaque vero dolore nostrum ex. Quia porro
                dolorem
                <br /> accusantium porro dolorem accusantium dolorem
              </Text>

              <Text lineHeight="1.8" display={["none", "", "block", ""]}>
                Lorem ipsum dolor sit amet consectetur.
                <br />
                Lorem ipsum dolor sit amet .
                <br />
                Lorem ipsum dolor sit .
              </Text>
            </Box>
          </Box>

          <Image
            src="carside2.png"
            transition=".3s"
            pos="absolute"
            bottom={["16px", "", "150px", ""]}
            left="35%"
            zIndex="1"
            className="image_intro"
          />

          <Box
            display={["none", "", "block", ""]}
            pos="absolute"
            right="0"
            top="0"
            zIndex="0"
            w="40%"
            bg="url(/dot2.png) center"
            h="100%"
          />
        </Flex>
      </Container>
    </Box>
  );
};

export default Intro;
