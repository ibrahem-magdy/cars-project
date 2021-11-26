import Link from "next/link";
import {
  Box,
  Heading,
  Link as L,
  Text,
  Image,
  Flex,
  Button,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState, useEffect, useContext } from "react";
import { CarContext } from "../../userContext";

const CarCard = ({ img, name, price, url, model, added }) => {
  const [add, setAdd] = useState();
  const [present, setPresent] = useState(false);

  const router = useRouter();
  const { cars, addCar } = useContext(CarContext);
  console.log(addCar);

  useEffect((e) => {
    cars.map((e) => {
      if (e.id == url) {
        setPresent(true);
      }
    });
  }, []);

  function getDate() {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, "0");
    let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    let yyyy = today.getFullYear();
    return (today = mm + "/" + dd + "/" + yyyy);
  }

  // const update = async (id, data) => {
  //   const res = await fetch(`http://localhost:4000/products/${id}`, {
  //     method: "put",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(data),
  //   });
  //   // await router.push(`/${router.pathname}`);
  // };

  return (
    <Box
      bg="#131417"
      borderRadius="15px"
      _hover={{
        transform: "scale(1.02)",
      }}
      transition=".3s"
    >
      <Link
        href={{
          pathname: "/cars/[carId]",
          query: { ...router.query, carId: `${url}` },
        }}
        passHref
      >
        <L _hover={{ textDecor: "none" }}>
          <Box p="15px" cursor="pointer">
            <Image src={img} w="100%" h="256px" objectFit="cover" alt="" />
            <Heading as="h2" textAlign="center" my="20px" fontSize="30px">
              {name}
            </Heading>
            <Text textAlign="center">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Reiciendis, voluptate! amet consectetur
            </Text>
            <Flex justifyContent="center" my="20px">
              <Text
                fontWeight="bold"
                me="30px"
                bg="black"
                p="10px 20px"
                borderRadius="10px"
              >
                {model}
              </Text>
              <Text
                fontWeight="bold"
                bg="black"
                p="10px 20px"
                borderRadius="10px"
              >
                {price}
              </Text>
            </Flex>
          </Box>
        </L>
      </Link>
      <Button
        textTransform="uppercase"
        display="block"
        m="auto"
        w="100%"
        py="20px"
        h="initial"
        borderRadius="0 0 15px 15px"
        border="none"
        outline="none"
        bg="#222221"
        color="white"
        letterSpacing="1px"
        cursor={present || add ? "not-allowed" : "pointer"}
        opacity={present || add ? ".5" : "1"}
        _hover={{
          bg: "#222229",
        }}
        onClick={() => {
          addCar(url, img, name, getDate());
          setAdd(true);
          // update(url, {
          //   id: url,
          //   product_image: img,
          //   product_name: name,
          //   product_price: price,
          //   model: model,
          //   added: { add: "true", date: getDate() },
          // });
        }}
      >
        {present || add ? "Added to cart" : "Add to cart "}
      </Button>
    </Box>
  );
};

export default CarCard;
