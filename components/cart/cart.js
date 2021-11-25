import { Box, Flex, Heading, Image, Text, Link as L } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import { CarContext } from "userContext";
import { useContext } from "react";
import Link from "next/link";

const Cart = ({ date, img, name, id, price, model }) => {
  const router = useRouter();
  const { removeCar } = useContext(CarContext);

  const remove = async (data, id) => {
    const res = await fetch(`http://localhost:4000/products/${id}`, {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    await router.push(`/${router.pathname}`);
  };

  return (
    <Flex
      bg="#131417"
      justifyContent="space-between"
      alignItems="center"
      p="5px"
      borderRadius="0 10px 10px 0 "
      className="cart_flex"
      flexWrap="wrap"
    >
      <Flex
        alignItems="center"
        flexWrap="wrap"
        justifyContent={["center", "initial", "", ""]}
        w={["100%", "initial", "", ""]}
      >
        <Image
          src={img}
          w={["100%", "100px", "", ""]}
          minH="80px"
          h={["auto", "80px", "", ""]}
          me={["0", "20px", "", ""]}
          mb={["15px", "0", "", ""]}
          maxH={["234px", "initial", "", ""]}
          objectFit="cover"
          alt="car"
        />

        <Flex
          flexDir={["", "", "column", "row"]}
          alignItems={["center", "", "initial", "center"]}
        >
          <Heading
            as="h2"
            my="0"
            mr="20px"
            fontSize={["initial", "", "14px", "18px"]}
            mb={["0", "0", "3px", "0"]}
          >
            {name}
          </Heading>
          <Text color="gray" m="0">
            {date}
          </Text>
        </Flex>
      </Flex>

      <Flex
        alignItems="center"
        mt={["15px", "0", "", ""]}
        justifyContent={["center", "initial", "", ""]}
        w={["100%", "initial", "", ""]}
      >
        <Link href={`/cars/${id}`} passHref>
          <L
            me="20px"
            bg="black"
            p="10px 15px"
            borderRadius="10px"
            textDecoration="none"
            transition=".3s"
            _hover={{ bg: "#0c0c0c" }}
          >
            Read More
          </L>
        </Link>
        <Box
          bg="#c32b2b"
          w="45px"
          h="45px"
          me="10px"
          cursor="pointer"
          transition=".3s"
          display="grid"
          placeItems="center"
          borderRadius="5px"
          _hover={{ bg: "#a52222" }}
          onClick={() => {
            removeCar(id);
            remove(
              {
                id,
                product_image: img,
                product_name: name,
                product_price: price,
                model: model,
                added: { add: "false", date: "" },
              },
              id
            );
          }}
        >
          <CloseIcon fontSize="14px" />
        </Box>
      </Flex>
    </Flex>
  );
};

export default Cart;
