import { Box } from "@chakra-ui/react";
import Container from "components/shared/container";
import Feauter from "./feauter";

const feauters = [
  {
    heading: "feauter one ..",
    text: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore nesciunt
           officia dicta fugiat voluptas ratione doloribus illo perferendis! fugiat voluptas ratione doloribus illo perferendis! fugiat voluptas ratione doloribus illo perferendis!`,
    img: "insid2.jpg",
  },
  {
    heading: "feauter two ..",
    text: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore nesciunt
           officia dicta fugiat voluptas ratione doloribus illo perferendis! fugiat voluptas ratione doloribus illo perferendis! fugiat voluptas ratione doloribus illo perferendis! `,
    img: "inside.jpg",
  },
];
const Feauters = () => {
  return (
    <Box>
      <Container>
        {feauters.map((f, i) => {
          return (
            <Box key={Math.random()}>
              <Feauter
                heading={f.heading}
                text={f.text}
                img={f.img}
                dir={i % 2 != 0 ? true : false}
              />
            </Box>
          );
        })}
      </Container>
    </Box>
  );
};

export default Feauters;
