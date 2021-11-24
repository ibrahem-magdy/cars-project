import React, { useContext, useState } from "react";
import { useRouter } from "next/router";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "firebase-config";
import { UserContext } from "../../userContext";

import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  Button,
  FormLabel,
  Text,
  Link as L,
} from "@chakra-ui/react";
import Link from "next/link";
import { LockIcon } from "@chakra-ui/icons";
import { Formik } from "formik";
import * as Yup from "yup";

const SignupSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
});

const Inp = ({ plac, icon, lab, ...props }) => {
  return (
    <Box>
      <FormLabel mb="15px" fontWeight="bold">
        {lab}
      </FormLabel>
      <Input
        {...props}
        type="tel"
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

const Login = () => {
  const router = useRouter();
  const { user, updateUser } = useContext(UserContext);
  const [uncorrectMesssage, setUncorrectMessage] = useState(false);

  const signIn = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = email;

        updateUser(user);
        router.push("/");
      })
      .catch(() => {
        setUncorrectMessage(true);
      });
  };

  onAuthStateChanged(auth, (user) => {
    if (user) {
      updateUser(user.email);
      router.push("/");
    }
  });

  return (
    <Box
      h="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
      my="100px"
    >
      <Box
        w={["95%", "60%", "50%", "40%"]}
        m="auto"
        boxShadow="0 0 5px -1px white"
      >
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
            signIn(values.email, values.password);
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
              p={["20px", "50px", "", ""]}
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
                The Email is uncorrect or password is uncorrect
                <br />
                please try again!
              </Text>
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
              <Box mb="35px">
                <Box pos="relative">
                  <FormLabel mb="15px" fontWeight="bold">
                    Your Password
                  </FormLabel>
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
                      placeholder="password"
                      id="password"
                      name="password"
                      onChange={handleChange}
                      value={values.password}
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
                  {/* {errors.password && touched.password ? (
                    <Message msg={errors.password} />
                  ) : null} */}
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
                _hover={{ bg: "inhrit", opacity: ".9" }}
              >
                Login
              </Button>
              <Text textAlign="center" mt="20px" fontSize="18px">
                Not a member?
                <Link href="/signup" passHref>
                  <L color="#a52222">Signup now</L>
                </Link>
              </Text>
            </Box>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default Login;
