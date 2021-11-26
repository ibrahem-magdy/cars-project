import {
  Box,
  Flex,
  UnorderedList,
  ListItem,
  Heading,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Link as L,
} from "@chakra-ui/react";
import Link from "next/link";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import Container from "components/shared/container";
import { useState, useRef, useContext } from "react";
import { UserContext } from "../../userContext";
import NavLink from "./nav-link";
import Search from "components/search";
import { signOut } from "firebase/auth";
import { auth } from "firebase-config";
import { useRouter } from "next/router";

const links = [
  {
    url: "/",
    text: "Home",
  },
  {
    url: "/cars",
    text: "Cars",
  },
  {
    url: "/cart",
    text: "Cart",
  },
];

const Header = ({ ...props }) => {
  const { user, updateUser } = useContext(UserContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const router = useRouter();
  const out = () => {
    try {
      router.push("/");
      signOut(auth)
        .then(function () {
          updateUser("");
        })
        .catch(function (error) {
          return false;
        });
    } catch (error) {
      return false;
    }
  };

  return (
    <>
      <Box {...props}>
        <Box bg="#131417" pos="fixed" top="0%" left="0" right="0" zIndex="1000">
          <Container>
            <Flex justifyContent="space-between" h="80px">
              <Link href="/">
                <L
                  _hover={{ textDecor: "none" }}
                  display="flex"
                  alignItems="center"
                >
                  <Heading as="h2" textTransform="uppercase">
                    c
                    <Box as="span" color="#a52222">
                      a
                    </Box>
                    rs
                  </Heading>
                </L>
              </Link>
              <UnorderedList
                display={["none", "", "flex", ""]}
                alignItems="center"
              >
                <Search />
                {links.map((e, i) => {
                  return (
                    <ListItem
                      listStyleType="none"
                      key={Math.random()}
                      me={i == links.length - 1 ? "20px" : "20px"}
                    >
                      <NavLink url={e.url} text={e.text} />
                    </ListItem>
                  );
                })}
                {user ? (
                  router.pathname == "/cars/[carId]" ? (
                    false
                  ) : (
                    <NavLink
                      url=""
                      text="SignOut"
                      onClick={out}
                      p="5px 14px"
                      bg="#323030"
                      borderRadius="5px"
                      transition=".3s"
                      _hover={{ textDecor: "none", bg: "#585656" }}
                    />
                  )
                ) : (
                  <>
                    <NavLink
                      url="/login"
                      text="SignIn"
                      mr="20px"
                      p="5px 14px"
                      bg="#323030"
                      borderRadius="5px"
                      transition=".3s"
                      _hover={{ textDecor: "none", bg: "#585656" }}
                    />
                    <NavLink
                      url="/signup"
                      text="SignUp"
                      p="5px 14px"
                      bg="#323030"
                      borderRadius="5px"
                      transition=".3s"
                      _hover={{ textDecor: "none", bg: "#585656" }}
                    />
                  </>
                )}
              </UnorderedList>

              <Box display={["flex", "", "none", ""]} alignItems="center">
                {user ? (
                  <NavLink
                    url=""
                    text="SignOut"
                    onClick={out}
                    mr="15px"
                    p="5px 14px"
                    bg="#323030"
                    borderRadius="5px"
                    _hover={{ textDecor: "none", bg: "#585656" }}
                  />
                ) : (
                  <>
                    <NavLink
                      url="/login"
                      text="SignIn"
                      mr="15px"
                      p="5px 14px"
                      bg="#323030"
                      borderRadius="5px"
                      _hover={{ textDecor: "none", bg: "#585656" }}
                    />
                    <NavLink
                      url="/signup"
                      text="SignUp"
                      mr="15px"
                      p="5px 14px"
                      bg="#323030"
                      borderRadius="5px"
                      _hover={{ textDecor: "none", bg: "#585656" }}
                    />
                  </>
                )}

                <HamburgerIcon ref={btnRef} onClick={onOpen} fontSize="20px" />
              </Box>
            </Flex>
          </Container>
        </Box>
      </Box>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
        bg="rgb(27,27,27)"
      >
        <DrawerOverlay />
        <DrawerContent bg="rgb(27,27,27)" bottom="0" h="100%">
          <DrawerHeader
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            pos="relative"
          >
            Hi {user.slice(0, user?.indexOf("@"))}!{" "}
            <DrawerCloseButton
              children={<CloseIcon color="gray.300" />}
              display="flex"
              alignItems="center"
              top="0"
              right="0"
              w="65px"
              fontSize="18px"
              h="100%"
              borderRadius="none"
              _focus={{ boxShadow: "none" }}
              bg="black"
            />
          </DrawerHeader>

          <DrawerBody p="0">
            <UnorderedList alignItems="center" m="0">
              {links.map((e, i) => {
                return (
                  <ListItem listStyleType="none" key={Math.random()}>
                    <NavLink
                      url={e.url}
                      text={e.text}
                      py="15px"
                      px="15px"
                      display="block"
                      onClick={onClose}
                      bg={i % 2 == 0 ? "#131417" : "transparent"}
                      _hover={{
                        bg: i % 2 == 0 ? "#222428" : "rgb(27,27,31)",
                        textDecor: "none",
                      }}
                    />
                  </ListItem>
                );
              })}
              <Box mt="15px" pl="15px">
                <Search
                  ulShadow="0 0 5px -3px white"
                  searchBorder="1px solid white"
                />
              </Box>
            </UnorderedList>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Header;
