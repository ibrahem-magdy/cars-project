import { Box, Flex, Image } from "@chakra-ui/react";
import Ticker from "react-ticker";
import { motion } from "framer-motion";

const MotionFlex = motion(Flex);

const logos = [
  "/logos/tesla.png",
  "/logos/tyota.png",
  "/logos/chevrolet.png",
  "/logos/ford.png",
  "/logos/honda.png",
  "/logos/bmw.png",
  "/logos/mercedes.png",
  "/logos/audi.png",
];
const Brands = () => {
  return (
    <Box
      my="30px"
      overflow="hidden"
      pos="relative"
      display={["none", "", "", "block"]}
    >
      <Ticker speed={8}>
        {({ index }) => {
          return (
            <Box display="flex" alignItems="center" flexWrap="wrap">
              {logos.map((e) => {
                return (
                  <Image
                    key={Math.random()}
                    src={e}
                    w={["120px"]}
                    opacity=".5"
                    transition=".3s"
                    objectFit="cover"
                    _hover={{ opacity: "1" }}
                    m="15px"
                    alt="brand"
                  />
                );
              })}
            </Box>
          );
        }}
      </Ticker>
    </Box>
  );
};

export default Brands;
