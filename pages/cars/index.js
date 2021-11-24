import {
  Box,
  Link as L,
  Input,
  Flex,
  Text,
  Button,
  Heading,
} from "@chakra-ui/react";
import { CarCard } from "components/product";
import Container from "components/shared/container";
import { useState, useCallback, useEffect } from "react";
import { Filter } from "components/cars";
import { useRouter } from "next/router";
import ReactPaginate from "react-paginate";

const Cars = ({ cars, count, lim }) => {
  const [items, setItems] = useState([]);
  const [pageCount, setpageCount] = useState(0);
  const [limit, setLimit] = useState(lim);
  const [first, setFirst] = useState(false);
  const [last, setLast] = useState(false);

  const realCount = count;
  useEffect(() => {
    setItems(cars);
    setpageCount(count);
  }, [limit]);

  const fetchComments = async (currentPage) => {
    const res = await fetch(
      `http://localhost:4000/products?_page=${currentPage}&_limit=${limit}`
      // `https://jsonplaceholder.typicode.com/comments?_page=${currentPage}&_limit=${limit}`
    );
    const data = await res.json();
    return data;
  };

  const handlePageClick = async (data) => {
    let currentPage = data.selected + 1;

    const commentsFormServer = await fetchComments(currentPage);

    setItems(commentsFormServer);
  };
  const router = useRouter();

  return (
    <Box my="100px">
      <Container>
        <Box
          display="grid"
          gridTemplateColumns="repeat(3,1fr)"
          className="grid_cars"
          gridGap="20px"
        >
          {items.length > 0 ? (
            items.map((e, i, arr) => {
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
            })
          ) : (
            <Text
              pos="absolute"
              top="50%"
              left="50%"
              transform="translate(-50%,-50%)"
              color="gray"
              fontSize="18px"
            >
              No results
            </Text>
          )}
        </Box>

        <ReactPaginate
          previousLabel={"<< previous"}
          nextLabel={"next >>"}
          breakLabel={"..."}
          pageCount={pageCount} //count of pagination number
          marginPagesDisplayed={2} // count of number after final of breakpoints
          pageRangeDisplayed={3} // count of number between first and final breakpoints
          onPageChange={handlePageClick} // on click pagination number
          containerClassName={"pagination justify-content-center"} //class name for pagination parent
          pageClassName={"page-item"} //class name for number li
          pageLinkClassName={"page-link"} //class name for number link
          previousClassName={"page-item"}
          previousLinkClassName={"page-link"}
          nextClassName={"page-item"}
          nextLinkClassName={"page-link"}
          breakClassName={"page-item"}
          breakLinkClassName={"page-link"}
          activeClassName={"active_page"} //acitve number
        />
      </Container>
    </Box>
  );
};

export const getStaticProps = async () => {
  const limit = 6;
  const respone = await fetch(`http://localhost:4000/products?_limit=${limit}`);
  const cars = await respone.json();
  const total = respone.headers.get("x-total-count");
  const count = Math.ceil(total / limit);

  return {
    props: {
      cars,
      count,
      lim: limit,
    },
  };
};

export default Cars;
