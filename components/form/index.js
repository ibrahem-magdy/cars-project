import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../userContext";

import { useRouter } from "next/router";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "firebase-config";

import {
  Box,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Button,
  Image,
  FormLabel,
  Text,
} from "@chakra-ui/react";
import { LockIcon } from "@chakra-ui/icons";
import { Formik } from "formik";
import * as Yup from "yup";

const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  lastName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .required("No password provided.")
    .min(8, "Password is too short - should be 8 chars minimum.")
    .matches(/[a-zA-Z]/, "Password should contain at least one letter."),
  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Required"),
});

// const auth = getAuth();

const Inp = ({ plac, icon, lab, ...props }) => {
  return (
    <Box>
      <FormLabel mb="15px" fontWeight="bold">
        {lab}
      </FormLabel>
      <Input
        {...props}
        placeholder={plac}
        w="100%"
        h="45px"
        bg="transparent"
        border="none"
        outline="none"
        borderBottom="1px solid gray"
        color="white"
        transition=".3s"
        _focus={{
          borderColor: "white",
        }}
      />
    </Box>
  );
};

const Message = ({ msg }) => {
  return (
    <Box
      bg="#a52222"
      w="100%"
      padding="5px"
      bottom="1px"
      borderRadius="0 0 5px 5px"
    >
      <Text>{msg}</Text>
    </Box>
  );
};

const SignButton = ({ name, sign, img, ...props }) => {
  return (
    <Button
      w="100%"
      h="60px"
      onClick={sign}
      {...props}
      _hover={{ bg: "inhert", opacity: ".9" }}
      transition=".3s"
      display="flex"
      alignItems="center"
      justifyContent="center"
      textTransform="uppercase"
    >
      <Image src={img} mr="15px" w="30px" h="30px" alt="" />
      {name}
    </Button>
  );
};

const Forms = () => {
  const { user, updateUser } = useContext(UserContext);
  const [uncorrectMesssage, setUncorrectMessage] = useState(false);
  const router = useRouter();

  const signUp = async (email, password) => {
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setUncorrectMessage(true);
    }
  };

  const signGoogle = async () => {
    try {
      const google_provider = new GoogleAuthProvider();
      const user = await signInWithPopup(auth, google_provider);
    } catch (error) {}
  };

  onAuthStateChanged(auth, (user) => {
    if (user) {
      updateUser(user.email);
      router.push("/");
    }
  });

  return (
    <Flex
      bg="black"
      borderRadius="15px"
      justifyContent="space-between"
      boxShadow="0 0 5px -1px white"
      flexWrap={["wrap", "", "", "nowrap"]}
      w={["100%", "", "80%", "100%"]}
      mx="auto"
    >
      <Box w={["100%", "", "", "55%"]}>
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            passwordConfirmation: "",
          }}
          validationSchema={SignupSchema}
          onSubmit={(values, actions) => {
            signUp(values.email, values.password);
            actions.setSubmitting(false);
          }}
        >
          {({
            errors,
            touched,
            values,
            handleChange,
            handleSubmit,
            handleBlur,
            isSubmitting,
          }) => (
            <Box
              as="form"
              p={["30px", "50px", "", ""]}
              w="100%"
              onSubmit={handleSubmit}
            >
              <Text
                p="20px"
                my="20px"
                bg="#a52222"
                textAlign="center"
                borderRadius="5px"
                fontSize="17px"
                display={uncorrectMesssage ? "block" : "none"}
              >
                This Email is used before please try another one!
              </Text>
              <Box
                display="grid"
                gridTemplateColumns={["repeat(1,1fr)", "", "repeat(2,1fr)", ""]}
                gridColumnGap="15px"
                mb="35px"
              >
                <Box pos="relative">
                  <Inp
                    plac="ex:ibrahem"
                    lab="First Name"
                    id="firstName"
                    name="firstName"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.firstName}
                    mb={["35px", "", "0", ""]}
                  />
                  {errors.firstName && touched.firstName ? (
                    <Message msg={errors.firstName} />
                  ) : null}
                </Box>
                <Box pos="relative">
                  <Inp
                    plac="ex:magdy"
                    lab="Last Name"
                    id="lastName"
                    name="lastName"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.lastName}
                  />
                  {errors.lastName && touched.lastName ? (
                    <Message msg={errors.lastName} />
                  ) : null}
                </Box>
              </Box>
              <Box pos="relative" mb="35px">
                <Inp
                  plac="ex:ibrahem@gmail.com"
                  lab="Your Email"
                  id="email"
                  name="email"
                  type="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email}
                />
                {errors.email && touched.email ? (
                  <Message msg={errors.email} />
                ) : null}
              </Box>
              <Box
                display="grid"
                gridTemplateColumns={["repeat(1,1fr)", "", "repeat(2,1fr)", ""]}
                gridColumnGap="15px"
                mb="35px"
              >
                <Box pos="relative">
                  <InputGroup mb={["25px", "", "0", ""]}>
                    <InputLeftElement
                      pointerEvents="none"
                      top="50%"
                      transform="translateY(-50%)"
                      justifyContent="initial"
                    >
                      <LockIcon color="gray.300" />
                    </InputLeftElement>
                    <Input
                      type="password"
                      onChange={handleChange}
                      value={values.password}
                      id="password"
                      name="password"
                      placeholder="Password"
                      w="100%"
                      h="45px"
                      pl="25px"
                      bg="transparent"
                      border="none"
                      outline="none"
                      borderBottom="1px solid gray"
                      color="white"
                      transition=".3s"
                      _hover={{
                        borderColor: "white",
                      }}
                      _focus={{ boxShadow: "none" }}
                    />
                  </InputGroup>
                  {errors.password && touched.password ? (
                    <Message msg={errors.password} />
                  ) : null}
                </Box>
                <Box pos="relative">
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      top="50%"
                      transform="translateY(-50%)"
                      justifyContent="initial"
                    >
                      <LockIcon color="gray.300" />
                    </InputLeftElement>
                    <Input
                      type="password"
                      placeholder="Confirm password"
                      id="passwordConfirmation"
                      name="passwordConfirmation"
                      onChange={handleChange}
                      value={values.passwordConfirmation}
                      w="100%"
                      h="45px"
                      pl="25px"
                      bg="transparent"
                      border="none"
                      outline="none"
                      borderBottom="1px solid gray"
                      color="white"
                      transition=".3s"
                      _hover={{
                        borderColor: "white",
                      }}
                      _focus={{ boxShadow: "none" }}
                    />
                  </InputGroup>
                  {errors.passwordConfirmation &&
                  touched.passwordConfirmation ? (
                    <Message msg={errors.passwordConfirmation} />
                  ) : null}
                </Box>
              </Box>

              <Button
                textTransform="uppercase"
                display="block"
                m="auto"
                mt="40px"
                w="100%"
                h="60px"
                border="none"
                outline="none"
                bg="rgb(27,27,27)"
                color="white"
                borderRadius="5px"
                letterSpacing="1px"
                cursor="pointer"
                type="submit"
                disabled={isSubmitting}
                transition=".3s"
                _hover={{ bg: "inhert", opacity: ".9" }}
              >
                Create a free account
              </Button>
              <Box pos="relative" w="100%" h="2px" bg="gray" m="auto" mt="35px">
                <Box
                  pos="absolute"
                  left="50%"
                  top="50%"
                  transform="translate(-50%,-50%)"
                  w="30px"
                  h="30px"
                  bg="#131417"
                  borderRadius="50%"
                  display="grid"
                  placeItems="center"
                  userSelect="none"
                >
                  or
                </Box>
              </Box>
              <Flex
                alignItems="center"
                justifyContent="center"
                mt="30px"
                flexDir="column"
              >
                <SignButton
                  bg="#16161c"
                  name="Log in with google"
                  sign={signGoogle}
                  img="/google.png"
                />
              </Flex>
            </Box>
          )}
        </Formik>
      </Box>
      <Image
        src="car3bg.jpg"
        w={["100%", "", "", "55%"]}
        borderRadius="0 15px 15px 0"
        alt="car"
      />
    </Flex>
  );
};

export default Forms;
