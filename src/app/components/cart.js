import { cartContext } from "@/context/cartcontext";
import { Flex, HStack, Image, Text } from "@chakra-ui/react";
import { useContext, useState } from "react";

const Cart = () => {
  const { state, dispatch } = useContext(cartContext);
  const { cart } = state;

  const OnminusClick = (index1, index2) => {
    if (cart[index1][index2].quantity > 0) {
      dispatch({
        type: "update_quantity",
        payload: {
          index1,
          index2,
          quantity: cart[index1][index2].quantity - 1,
        },
      });
    } else {
      dispatch({
        type: "removeItem",
        payload: { removeIndex1: index1, removeIndex2: index2 },
      });
    }
  };

  const OnplusClick = (index1, index2) => {
    dispatch({
      type: "update_quantity",
      payload: { index1, index2, quantity: cart[index1][index2].quantity + 1 },
    });
  };

  return (
    <>
      {cart.map((cartItemArray, index1) => (
        <div key={index1}>
          {cartItemArray.map((cartItem, index) => (
            <Flex justify="space-between" my="4" p="2" key={cartItem._id}>
              <Flex justifyContent="space-between" w="50%">
                <Image w="50" h="50" borderRadius="10px" src={cartItem.img} />
                <Text my="auto" ps="3">
                  {cartItem.name}
                </Text>
              </Flex>
              <Flex justify="space-between" w="40%">
                <HStack>
                  <Text
                    fontWeight="bold"
                    cursor="pointer"
                    my="auto"
                    onClick={() => OnminusClick(index1, index)}
                  >
                    -
                  </Text>
                  <Text fontWeight="bold" color="rgb(44, 152, 240)" my="auto">
                    {cartItem.quantity}
                  </Text>
                  <Text
                    fontWeight="bold"
                    color="rgb(44, 152, 240)"
                    cursor="pointer"
                    my="auto"
                    onClick={() => OnplusClick(index1, index)}
                  >
                    +
                  </Text>
                </HStack>
                {/* Assuming options is an array, access it from cartItem */}
                <Text my="auto">
                  ₹{cartItem.options[0].half * cartItem.quantity}
                </Text>
              </Flex>
            </Flex>
          ))}
        </div>
      ))}
    </>
  );
};

export default Cart;
