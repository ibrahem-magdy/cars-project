import { Box, Link as L } from "@chakra-ui/react";
import Brands from "components/brands";
import Feauters from "components/feauters";
import Form from "components/form";
import { Intro } from "components/Home";
import { CarCard } from "components/product";
import Container from "components/shared/container";
import Link from "next/link";
import { useContext, useEffect } from "react";
import { UserContext, CarContext } from "../userContext";

const Home = ({ cars }) => {
  const user = useContext(UserContext);
  return (
    <>
      <Intro />
      <Feauters />
      <Brands />
      <Container>
        <Box mb="50px" mt={["50px", "", "", "0"]}>
          <Box
            display="grid"
            className="grid_cars"
            gridTemplateColumns="repeat(3,1fr)"
            gridGap="20px"
          >
            {cars?.map((e) => {
              return (
                <Box key={Math.random()}>
                  <CarCard
                    name={e.product_name}
                    url={e.id}
                    img={e.product_image}
                    price={e.product_price}
                    model={e.model}
                    added={e.added.add}
                  />
                </Box>
              );
            })}
          </Box>
          <Link href="/cars" passHref>
            <L
              display="block"
              m="auto"
              w={["100%", "400px", "", ""]}
              py="20px"
              mt="50px"
              bg="#c32b2b"
              textAlign="center"
              textTransform="uppercase"
              borderRadius="5px"
              cursor="pointer"
              transition=".3s"
              _hover={{ textDecoration: "none", bg: "#a52222" }}
            >
              see all cars
            </L>
          </Link>
        </Box>
        {user.user ? (
          false
        ) : (
          <Box mt="50px" mb="100px">
            <Form />
          </Box>
        )}
      </Container>
    </>
  );
};

export const getStaticProps = async () => {
  const respone = await fetch(
    "http://localhost:3000/api/products?page=1&limit=6"
  );
  const cars = await respone.json();

  return {
    props: {
      cars,
    },
  };
};

export default Home;
