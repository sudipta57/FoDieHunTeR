"use client";
import {
  Box,
  Button,
  Card,
  Center,
  Divider,
  Flex,
  HStack,
  Image,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import { cartContext } from "@/context/cartcontext";
import { useContext, useState } from "react";
import { Bounce, toast } from "react-toastify";
const page = () => {
  const { cartdata, setcartdata, state } = useContext(cartContext);
  const [useraddress, setUserAddress] = useState();
  const OnplusClick = (index) => {
    const updateCart = [...cartdata];
    updateCart[index].quantity += 1;
    setcartdata(updateCart);
  };
  //OnminusClick
  const OnminusClick = (index) => {
    const updatecart = [...cartdata];
    if (updatecart[index].quantity !== 0) {
      updatecart[index].quantity -= 1;
      setcartdata(updatecart);
    } else {
      console.log("hi");
      const filteredcart = updatecart.filter((_, index2) => index2 !== index);
      setcartdata(filteredcart);
    }
  };
  const handelLocation = (e) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;

        getlocation(latitude, longitude);
      });
    }
  };
  const apiEndpoint = "https://api.opencagedata.com/geocode/v1/json";
  const apikey = "c460576e5c0447768bea4b7083907388";
  // get location address from opencage
  const getlocation = async (latitude, longitude) => {
    const query = `${latitude},${longitude}`;
    const apiUrl = `${apiEndpoint}?key=${apikey}&q=${query}&pretty=1`;

    try {
      const res = await fetch(apiUrl);
      const data = await res.json();
      toast.success("🦄 added location successful", {
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
      setUserAddress(data.results[0].formatted);
    } catch (error) {
      console.log(error);
    }
  };

  // establish with razorpay
  const initializeRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";

      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };

  //payment routes goes here

  const makePayment = async (e) => {
    e.preventDefault();
    const res = await initializeRazorpay();

    if (!res) {
      alert("Razorpay SDK Failed to load");
      return;
    }
    if (!totalBill) {
      return toast.error("🦄 Add something ", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
    // Make API call to the serverless API
    const data = await fetch("/api/razorpay", {
      method: "POST",
      body: JSON.stringify({ totalBill }), // Assuming price is a variable containing the data you want to send
    });

    const res2 = await data.json();

    var options = {
      key: "rzp_test_FoHZrMsipfSV6C", // Enter the Key ID generated from the Dashboard
      name: "FoodieHub PVT LMT",
      currency: res2.currency,
      amount: res2.amount,
      order_id: res2.id,
      description: "Thankyou for your test donation",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcsrepyftVfUfL24sWmpmaZaDJw3eIa1Zjii_dLg4WZQ&s",
      handler: function (response) {
        // Encode the response data and redirect user to the success page with parameters
        const responseData = encodeURIComponent(JSON.stringify(response));
        window.location.href = `/paymentsuccess?data=${responseData}`;
      },
      prefill: {
        name: "Foodie Hub",
        email: "foodieHub@gmail.com",
        contact: "9999999999",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  // Calculate total price for each item separately
  const itemTotal = (cartItem) => {
    return parseFloat(cartItem.price) * cartItem.quantity;
  };

  // Calculate total price for all items in the cart
  const totalBill = cartdata.reduce(
    (total, cartItem) => total + itemTotal(cartItem),
    0
  );
  const handelpaymentprocced = (e) => {
    if (!useraddress) {
      return toast.warn("🦄 Add address before payment", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    } else if (!state.islogin) {
      return toast.warn("🦄 Login first before payment", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }

    // Proceed with the payment logic here
    makePayment(e);
  };

  return cartdata ? (
    <div className=" h-[89vh] flex">
      <Card maxW="700px" shadow="md" m="auto" textAlign="center">
        <Text className="text-4xl font-bold underline">My Cart</Text>
        <Box className="p-10 max-w-[700px]">
          {cartdata.map((cartItem, index) => (
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
                    onClick={() => {
                      OnminusClick(index);
                    }}
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
                    onClick={() => {
                      OnplusClick(index);
                    }}
                  >
                    +
                  </Text>
                </HStack>
                {/* Assuming options is an array, access it from cartItem */}
                <Text my="auto">₹{itemTotal(cartItem).toFixed(2)}</Text>
              </Flex>
            </Flex>
          ))}
          <Box>
            <Link href="/menu">
              <Text
                fontWeight="bold"
                fontSize="20px"
                color="rgb(44, 152, 240)"
                as="u"
                cursor="pointer"
              >
                ADD MORE ITEM
              </Text>
            </Link>
          </Box>
          <Divider
            borderBottomWidth="10px" // Adjust the border width as needed
            borderBottomStyle="solid"
            borderColor="gray" // Set the color of the border
            fontWeight="300" // Make the divider bold
            my={4} // Adjust margin as needed
          />
          <Box>
            <Text fontWeight="bold" fontSize="20px">
              Bill Details
            </Text>
            <Box>
              <Flex justify="space-between">
                <Text color="gray">Item Total</Text>
                <Text color="gray">₹{totalBill}</Text>
              </Flex>
              <Flex justify="space-between">
                <Text color="gray">delhivery fee for 1.29 kms</Text>
                <Text color="gray">₹0.00</Text>
              </Flex>
              <Flex justify="space-between">
                <Text color="gray">Taxes & Charges</Text>
                <Text color="gray">₹0.00</Text>
              </Flex>
            </Box>
            <Divider
              borderBottomWidth="2px" // Adjust the border width as needed
              borderBottomStyle="solid"
              borderColor="gray" // Set the color of the border
              fontWeight="300" // Make the divider bold
              my={4} // Adjust margin as needed
            />
            <Box>
              <Flex justify="space-between">
                <Text fontWeight="bold">To Pay</Text>
                <Text fontWeight="bold">₹{totalBill}</Text>
              </Flex>
            </Box>
            <Divider
              borderBottomWidth="4px" // Adjust the border width as needed
              borderBottomStyle="solid"
              borderColor="gray" // Set the color of the border
              fontWeight="300" // Make the divider bold
              mt={4} // Adjust margin as needed
            />
          </Box>
          {useraddress ? (
            <>
              <Text fontSize="15px" fontWeight="bold" className="my-4">
                {useraddress}
              </Text>
            </>
          ) : (
            <>
              <Box className="my-4">
                <Text fontSize="20px" fontWeight="900">
                  Add delivery address to proceed order
                </Text>
                <Text fontSize="13px">
                  Your delivery fee may change according to your address. please
                  add adress before proceed to pay
                </Text>
                <Button
                  my="4"
                  bgColor="white"
                  color="rgb(44, 152, 240)"
                  border="1px solid rgb(44, 152, 240)"
                  w="100%"
                  onClick={handelLocation}
                >
                  ADD ADDRESS TO PROCEED
                </Button>
              </Box>
            </>
          )}
          {state.islogin ? (
            ""
          ) : (
            <Box my="4">
              <Text fontSize="30px" fontWeight="bold" mb="0">
                Almost There
              </Text>
              <Text fontWeight="10px"> Login or sign up to place order</Text>
              <Link href="/signin">
                <Button
                  w="100%"
                  my="4"
                  bgColor="rgb(44, 152, 240)"
                  color="whitesmoke"
                >
                  Continue
                </Button>
              </Link>
            </Box>
          )}

          <Flex justify="space-between">
            <button className="bg-orange-600 p-4 text-white rounded-lg font-bold">
              To Pay ₹{totalBill}
            </button>
            <button
              className="bg-orange-600 p-4 text-white rounded-lg font-bold"
              onClick={(e) => handelpaymentprocced(e)}
            >
              Proceed to pay
            </button>
          </Flex>
        </Box>
      </Card>
    </div>
  ) : (
    <Center>
      <Text>you don't have any cart items</Text>
    </Center>
  );
};

export default page;
