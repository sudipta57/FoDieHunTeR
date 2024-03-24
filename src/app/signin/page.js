"use client";
import {
  Box,
  Button,
  Card,
  Grid,
  GridItem,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useSession, signIn, signOut } from "next-auth/react";
import { FaFacebook } from "react-icons/fa";
import { toast } from "react-toastify";

import { FaGooglePlus } from "react-icons/fa";
import { IoLogoGithub } from "react-icons/io5";
import { redirect } from "next/navigation";
import { useContext } from "react";
import { cartContext } from "@/context/cartcontext";
export default function Component() {
  const { data: session } = useSession();
  const { dispatch } = useContext(cartContext);
  if (session) {
    toast.success("Logged in successful", { autoClose: 2000 });
    dispatch({ type: "isloggedin", payload: true });
    return redirect("/");
  }
  return (
    <center className="h-[90vh] bg-gray-100">
      <Box>
        <Text className="text-5xl font-bold mb-7">Sign in or Sign Up</Text>
        <Card className=" h-[70vh]  my-7 rounded-xl max-w-[1000px]">
          <Grid templateColumns="repeat(2, 1fr)">
            <GridItem w="100%" h="70vh" className="items-center text-center">
              <Text className="text-3xl font-extrabold pt-5">Sign In</Text>
              <Text className="text-2xl pt-6 font-bold">
                Keep Logged in with us
              </Text>
              <Text className="text-2xl pt-6 font-bold">
                &#128522; &#x1F609;
              </Text>
              <Stack className="pt-10 items-center " spacing="8">
                <Button
                  w="150px"
                  leftIcon={<FaFacebook />}
                  onClick={() => signIn("facebook")}
                >
                  FaceBook
                </Button>
                <Button
                  w="150px"
                  leftIcon={<FaGooglePlus />}
                  onClick={() => signIn("google")}
                >
                  Google
                </Button>
                <Button
                  w="150px"
                  leftIcon={<IoLogoGithub />}
                  onClick={() => signIn("github")}
                >
                  Github
                </Button>
              </Stack>
            </GridItem>
            <GridItem w="100%" h="70vh" bg="#ff445c">
              <Box className="m-auto items-center py-12">
                <Text className="text-3xl font-bold">Hello, Friend!</Text>
                <Text className="py-5">
                  Enter your personal details and start journey with us
                </Text>
                <Button onClick={() => signIn()}>Sign Up</Button>
              </Box>
            </GridItem>
          </Grid>
        </Card>
      </Box>
    </center>
  );
}
