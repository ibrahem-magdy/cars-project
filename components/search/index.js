import {
  Box,
  Input,
  ListItem,
  UnorderedList,
  Link as L,
} from "@chakra-ui/react";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import useSWR from "swr";
const fetcher = async (url) => {
  const res = await fetch(url);
  const data = await res.json();
  return data;
};

const Search = ({ ulShadow, searchBorder }) => {
  const { data, error } = useSWR(
    "http://localhost:3000/api/products?page=1&limit=18",
    fetcher
  );
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    document.onclick = () => {
      setOpen(false);
      if (ref.current) {
        ref.current.value = "";
      }
    };
    if (search == "") {
      setOpen(false);
      console.log("no items");
    }
  }, [search]);

  if (error) return <Box>failed fetching</Box>;
  if (!data) return <Box>loading .... </Box>;
  const filteration = data.filter((e) => {
    return (
      e.product_name.toLowerCase().trim().indexOf(search.toLowerCase().trim()) >
      -1
    );
  });
  return (
    <Box pos="relative" mr="15px">
      <Input
        outline="none"
        placeholder="search on cars"
        w="100%"
        h="40px"
        fontSize="18px"
        px="10px"
        bg="rgb(27,27,27)"
        border="2px solid gray"
        color="white"
        borderRadius="5px"
        transition=".3s"
        border={searchBorder}
        ref={ref}
        _focus={{ boxShadow: "none", borderColor: "white" }}
        onChange={(e) => {
          setOpen(true);
          setSearch(e.target.value);
        }}
      />
      <UnorderedList
        display={open ? "block" : "none"}
        w="100%"
        pos="absolute"
        top="41px"
        left="-15px"
        zIndex="200000"
        bg="rgb(27,27,27)"
        maxH="300px"
        overflow="auto"
        boxShadow={ulShadow}
      >
        {filteration.map((e, i) => {
          return (
            <Link href={`/cars/${e.id}`} key={Math.random()} passHref>
              <L
                textDecoration="none !important"
                _focus={{ boxShadow: "none" }}
              >
                <ListItem
                  listStyleType="none"
                  transition=".3s"
                  p="15px"
                  bg={i % 2 == 0 ? "#131417" : "transparent"}
                  _hover={{
                    bg: i % 2 == 0 ? "#222428" : "rgb(27,27,31)",
                  }}
                >
                  {e.product_name}
                </ListItem>
              </L>
            </Link>
          );
        })}
      </UnorderedList>
    </Box>
  );
};

export default Search;
