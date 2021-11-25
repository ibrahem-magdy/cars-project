import { Box } from "@chakra-ui/react";
import Container from "components/shared/container";
import { Cart, Empty } from "components/cart";
import { useContext } from "react";
import { CarContext } from "userContext";

const CartPage = () => {
  const { cars } = useContext(CarContext);

  if (cars.length == 0) {
    return <Empty />;
  } else {
    return (
      <Box>
        <Container>
          <Box
            display="grid"
            gridTemplateColumns={["repeat(1,1fr)", "", "repeat(2,1fr)", ""]}
            gridGap="15px"
            my="100px"
          >
            {cars.map((e) => {
              return (
                <Box key={e.id}>
                  <Cart date={e.date} img={e.img} name={e.name} id={e.id} />
                </Box>
              );
            })}
          </Box>
        </Container>
      </Box>
    );
  }
};

// export const getServerSideProps = async () => {
//   const response = await fetch("http://localhost:4000/products?added.add=true");
//   const data = await response.json();
//   return {
//     props: {
//       data,
//     },
//   };
// };
export default CartPage;
