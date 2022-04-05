import React, { useEffect } from "react";
import { Box, Button, Center, Divider, Flex, Heading } from "@chakra-ui/react";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import { signIn, getSession } from "next-auth/react";

function index({ domain }) {
  return (
    <Center h="100vh">
      <Flex
        direction={"column"}
        border="1px"
        borderColor={"gray.300"}
        p={5}
        rounded="md"
      >
        <Heading as={"h1"} alignSelf="center">
          Login
        </Heading>
        <Divider my={5} />
        <Button
          onClick={() => signIn("facebook", { callbackUrl: "" })}
          leftIcon={<FaFacebook />}
          m={1}
          bg={"blue.500"}
          color={"white"}
        >
          Facebook
        </Button>
        <Button
          onClick={() => signIn("google")}
          leftIcon={<FaGoogle />}
          m={1}
          bg={"red.500"}
          color={"white"}
        >
          Google
        </Button>
      </Flex>
    </Center>
  );
}

export async function getServerSideProps(context) {
  const userAgent = context.req.headers["user-agent"];
  const webViewsAgentName = ["Line"];
  const inAppBrowser = webViewsAgentName.find((agentName) =>
    userAgent.includes(agentName)
  );
  if (inAppBrowser) {
    // https://www.wfublog.com/2018/06/mobile-detect-webview-fb-line-in-app.html
    return {
      redirect: {
        permanent: false,
        destination: "/index?openExternalBrowser=1",
      },
    };
  }
  const sessionData = await getSession(context);
  console.log(
    "🚀 ~ file: index.js ~ line 58 ~ getServerSideProps ~ userAgent",
    userAgent
  );
  if (sessionData) {
    return {
      redirect: {
        permanent: false,
        destination: "/home",
      },
    };
  }

  return {
    props: {
      domain: context.req.headers.host,
    },
  };
}

export default index;
