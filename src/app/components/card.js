import React, { useContext } from "react";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { cartContext } from "../../context/cartcontext";
import { Bounce, toast } from "react-toastify";

const Cart = ({ food }) => {
  const { cartdata, setcartdata } = useContext(cartContext);
  const { CategoryName, name, imgpath, price, description } = food;
  const addtoCart = () => {
    setcartdata([...cartdata, food]);
    toast.success("🦄 Item Added ", {
      position: "bottom-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  };

  return (
    <Box className="col-span-1">
      <Box className="relative h-64 overflow-hidden">
        <Box
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${imgpath})`, // Correct way to set background image
          }}
        ></Box>
        <Box className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900 opacity-50"></Box>
        <Box className="absolute inset-0 flex flex-col justify-end p-4">
          <Text className="text-sm text-white">{name}</Text>
          <Flex justifyContent="space-between">
            <Text className="text-lg font-semibold mt-2 text-white">
              {CategoryName}
            </Text>
            <Flex justifyContent="space-between" w="25%">
              <Text className="text-xs mt-2 text-white font-bold">
                Price - &gt;
              </Text>
              <Text className="text-xs mt-2 text-white font-bold">{price}</Text>
            </Flex>
          </Flex>
          <Flex justifyContent="space-between">
            <Text className="text-xs mt-2 text-white">{description}</Text>
            <Button onClick={addtoCart}>Add to cart</Button>
          </Flex>
        </Box>
      </Box>
    </Box>
  );
};

export default Cart;
