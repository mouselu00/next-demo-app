import React from "react";
import { Button, Flex, Heading } from "@chakra-ui/react";
import { FaSignOutAlt } from "react-icons/fa";
import { signOut, getSession } from "next-auth/react";

function Home({ sessionData }) {
  return (
    <Flex h={"100vh"} justify={"center"} align={"center"} direction={"column"}>
      <Heading as={"h1"}>Welcome</Heading>
      <Heading as={"h3"}>{sessionData.user.name} </Heading>
      <small>{sessionData.user.email}</small>
      <Button onClick={() => signOut()} leftIcon={<FaSignOutAlt />}>
        Logout
      </Button>
    </Flex>
  );
}

export async function getServerSideProps(context) {
  const sessionData = await getSession(context);

  if (!sessionData) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }
  return {
    props: {
      sessionData,
    },
  };
}

export default Home;
