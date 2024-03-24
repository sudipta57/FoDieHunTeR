"use client";
import { cartContext } from "@/context/cartcontext";
import { Box, Button, Card, HStack, Text } from "@chakra-ui/react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { toast } from "react-toastify";

const page = () => {
  const { dispatch } = useContext(cartContext);

  const router = useRouter();
  const { data: session } = useSession();
  if (session) {
    return (
      <center w="100%" className="bg-gray-200 h-[90vh] py-10">
        <Card
          w="400px"
          h="200px"
          className="text-center items-center shadow-2xl"
        >
          <Text className="pt-10">Do you want to Logout ? &#x1F617;</Text>
          <HStack className="pt-11" spacing="10">
            <Button
              leftIcon="&#x1F612;"
              onClick={() => {
                return router.push("/");
              }}
            >
              No
            </Button>
            <Button
              leftIcon="&#128540;"
              onClick={() => {
                const getitem = localStorage.getItem("foodItems");
                if (getitem) {
                  localStorage.removeItem("foodItems");
                }
                dispatch({ type: "isloggedin", payload: false });
                signOut();
                // return router.push("/");
              }}
            >
              yes
            </Button>
          </HStack>
        </Card>
      </center>
    );
  }

  return (
    <center w="100%" className="bg-gray-200 h-[90vh] py-10">
      <Card
        w="400px"
        h="200px"
        className="text-center items-center shadow-2xl py-14"
      >
        <Text mb="6" className="font-bold">
          Signed out successful
        </Text>
        <Button
          onClick={() => {
            toast.success("logged out", { autoClose: 1000 });
            return router.push("/");
          }}
        >
          Go to Home page
        </Button>
      </Card>
    </center>
  );
};

export default page;
