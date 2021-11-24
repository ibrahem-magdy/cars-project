import {
  Box,
  Heading,
  Image,
  Flex,
  Text,
  Button,
  Modal,
  ModalOverlay,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  useDisclosure,
} from "@chakra-ui/react";
import Head from "next/head";
import Container from "components/shared/container";
import { useRouter } from "next/router";

const Car = ({ data }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Head>
        <title>{data.product_name} | localhost</title>
      </Head>

      <Flex h="100%" alignItems="center" py="100px">
        <Container>
          {
            <Flex
              bg="#131417"
              borderRadius="15px"
              justifyContent="space-between"
              flexDir={["column-reverse", "", "row", ""]}
              flexWrap="wrap"
            >
              <Box p={["20px", "50px", "", ""]} w={["100%", "", "60%", ""]}>
                <Heading as="h2" mb="40px">
                  {data.product_name}
                </Heading>
                <Text color="gray" w={["100%", "", "70%", ""]} lineHeight="1.5">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Laboriosam harum deleniti doloribus ab asperiores illo quam
                  dolor consectetur voluptate nesciunt?Lorem ipsum dolor sit
                  amet consectetur adipisicing elit. Aperiam, iusto.
                </Text>
                <Flex my="40px">
                  <Heading
                    as="h6"
                    mr="30px"
                    bg="black"
                    p="10px 20px"
                    borderRadius="10px"
                    fontSize="20px"
                  >
                    {data.product_price}
                  </Heading>
                  <Heading
                    as="h6"
                    bg="black"
                    p="10px 20px"
                    borderRadius="10px"
                    fontSize="20px"
                  >
                    {data.model}
                  </Heading>
                </Flex>
                <Button
                  fontSize="18px"
                  w={["100%", "250px", "", ""]}
                  p="20px"
                  h="65px"
                  borderRadius="10px"
                  bg="#8383dd"
                  color="white"
                  outline="none"
                  border="none"
                  cursor="pointer"
                  letterSpacing="2px"
                  onClick={onOpen}
                  _hover={{
                    bg: "#8383dd",
                  }}
                >
                  Buy Now
                </Button>
              </Box>
              <Image
                src={data.product_image}
                borderRadius={["15px 15px 0 0", "", "0 15px 15px 0", ""]}
                w={["100%", "", "40%", ""]}
                alt="car"
              />
            </Flex>
          }
        </Container>
      </Flex>
      <Modal
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <ModalContent bg="rgb(27,27,27)" maxW={["90%", "", "60%", "50%"]}>
          <ModalCloseButton
            bg="#a52222"
            outline="none"
            p="20px"
            _focus={{ boxShadow: "none" }}
            _hover={{ bg: "#c32b2b" }}
          />
          <ModalBody>
            <Flex flexDir="column" alignItems="center" justifyContent="center">
              <Image src="/working.png" alt="working on it " />
              <Heading
                as="h3"
                color="white"
                mt="30px"
                mb="60px"
                fontSize={["20px", "", "30px", ""]}
                textAlign="center"
              >
                Still working on it ....
              </Heading>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export const getServerSideProps = async (context) => {
  const productId = context.params.carId;
  try {
    const response = await fetch(`http://localhost:4000/products/${productId}`);
    const data = await response.json();
    return {
      props: {
        data,
      },
    };
  } catch (error) {
    return false;
  }
};
export default Car;
