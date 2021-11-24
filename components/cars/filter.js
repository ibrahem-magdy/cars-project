import { Box, UnorderedList, ListItem, Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import React from "react";

const Filter = ({
  id,
  name,
  list,
  select,
  selected,
  filteration,
  ...props
}) => {
  const [open, setOpen] = useState(false);
  const [svalue, setSvalue] = useState(id);

  useEffect(() => {
    if (id != select) {
      setOpen(false);
    }
  }, [select]);

  const filter = (e) => {
    if (name == "price") {
      filteration({ price: e.target.innerText });
    } else if (name == "model") {
      filteration({ model: e.target.innerText });
    }
  };

  return (
    <Box
      {...props}
      w="20%"
      pos="relative"
      minH="50px"
      bg="rgb(27,27,27)"
      display="grid"
      placeItems="center"
      borderRadius={open && id == select ? "15px 15px 0 0" : "15px"}
      cursor="pointer"
      mb="15px"
      onClick={() => {
        selected(id);
        setOpen(!open);
      }}
    >
      <Text userSelect="none">{svalue}</Text>
      <UnorderedList
        pos="absolute"
        left="0"
        top="50px"
        m="0"
        w="100%"
        bg="rgb(27,27,27)"
        p="0"
        borderRadius="0 0 15px 15px "
        maxH="320px"
        overflow="auto"
        display={open && id == select ? "block" : "none"}
      >
        {list.map((l, i) => {
          return (
            <ListItem
              key={Math.random()}
              listStyleType="none"
              p="15px"
              cursor="pointer"
              transition=".3s"
              borderRadius={i == list.length - 1 ? "0 0 15px 15px" : "0"}
              bg={i % 2 == 0 ? "#131417" : "transparent"}
              _hover={{
                bg: i % 2 == 0 ? "#222428" : "rgb(27,27,31)",
              }}
              onClick={(e) => {
                setSvalue(e.target.innerText);
                filter(e);
              }}
            >
              {l}
            </ListItem>
          );
        })}
      </UnorderedList>
    </Box>
  );
};

export default React.memo(Filter);
