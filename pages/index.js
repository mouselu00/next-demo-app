import React, { useEffect } from "react";
import { Box, Button, Center, Divider, Flex, Heading } from "@chakra-ui/react";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import { signIn, getSession } from "next-auth/react";

function index({ domain }) {
  useEffect(() => {
    // https://www.wfublog.com/2018/06/mobile-detect-webview-fb-line-in-app.html
    const webViewsAgentName = ["Line", "FBAV"];
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;

    const inAppBrowser = webViewsAgentName.find((agentName) =>
      userAgent.includes(agentName)
    );
    if (inAppBrowser) {
      if (/android/i.test(userAgent)) {
        window.location.href = `googlechrome://navigate?url=${domain}`;
      }

      // iOS detection from: http://stackoverflow.com/a/9039885/177710
      if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        alert("IOS");
        window.location.href = `googlechrome://${domain}`;
      }
    }
  }, []);
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
  const sessionData = await getSession(context);

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
