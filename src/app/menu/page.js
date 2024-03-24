"use client";
import { Box, Container } from "@chakra-ui/react";
import Cart from "../components/card";
import { useEffect, useState } from "react";

const Menu = () => {
  const [fooddata, setfooddata] = useState([]);
  //set food data to localstorege
  const setDataWithExpiry = (value) => {
    const now = new Date();
    const item = {
      value: value,
      expiry: now.getTime() + 7200 * 1000, // Convert seconds to milliseconds
    };
    localStorage.setItem("foodItems", JSON.stringify(item));
  };

  const sendFoodRequest = async () => {
    try {
      const res = await fetch("api/menu", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      // console.log(data);
      if (!res.ok) {
        throw new Error(data.error);
      }
      const data = await res.json();
      setfooddata(data.updatedFoodData);
      setDataWithExpiry(data.updatedFoodData);
    } catch (error) {
      console.error(error);
    }
  };
  //get data with expiry from localstorege
  const getDataWithExpiry = (itemString) => {
    if (!itemString) {
      return null;
    }
    const item = JSON.parse(itemString);
    setfooddata(item.value);
    const now = new Date();
    if (now.getTime() > item.expiry) {
      // Item has expired, delete it from localStorage
      localStorage.removeItem("foodItems");
      return null;
    }
    return item.value;
  };

  useEffect(() => {
    const isKeyAvailable = localStorage.getItem("foodItems") !== null;

    if (!isKeyAvailable) {
      return () => sendFoodRequest();
    } else {
      getDataWithExpiry(localStorage.getItem("foodItems"));
    }
  }, [sendFoodRequest]);

  return (
    <>
      <Box className="bg-gray-100">
        <Container maxW="container.xl">
          <Box className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 py-8">
            {fooddata.map((food) => (
              <Cart key={food._id} food={food} />
            ))}
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Menu;
