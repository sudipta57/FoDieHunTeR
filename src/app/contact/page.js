"use client";
import {
  Box,
  Button,
  Card,
  CardBody,
  Center,
  Flex,
  FormControl,
  Grid,
  GridItem,
  Icon,
  Input,
  Stack,
  Text,
  Textarea,
  useMediaQuery,
} from "@chakra-ui/react";
import { FaPhone } from "react-icons/fa6";
import { MdOutlineEmail } from "react-icons/md";
import { FaAddressCard } from "react-icons/fa6";
import React, { useState } from "react";
import { toast } from "react-toastify";
const griditems = [
  {
    icon: FaPhone,
    tag: "phone",
    info: "+91823928642",
  },
  {
    icon: MdOutlineEmail,
    tag: "Email",
    info: "ghoramiswapna32@gmail.com",
  },
  {
    icon: FaAddressCard,
    tag: "Address",
    info: "Kakdwip, WB",
  },
];
const Page = () => {
  const [user, setuser] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handelinput = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setuser({
      ...user,
      [name]: value,
    });
  };

  //sending the contact data's to backend
  const sendContactData = async (e) => {
    e.preventDefault();
    const res = await fetch("api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const data = await res.json();
    if (!data.status === "200") {
      return toast(data.message, { autoClose: 2000 });
    }

    toast.success(data.message, { autoClose: 2000 });
    setuser({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <Stack
      spacing="25"
      bgColor="#F3F3F7"
      pt={{
        base: "10",
        sm: "0",
      }}
      h="90vh"
    >
      <Box paddingTop="18">
        <Grid
          templateColumns={{
            base: "repeat(1, 2fr)",
            md: "repeat(3, 2fr)",
          }}
          gap={6}
          px="16"
        >
          {griditems.map((val) => (
            <GridItem
              w="100%"
              h="16"
              bgColor="white"
              boxShadow="md"
              key={val.icon}
            >
              <Stack>
                <Flex gap="5">
                  <Box pt="3" pl="2">
                    <Text className="text-orange-500">
                      <Icon as={val.icon} boxSize="5" />
                    </Text>
                  </Box>
                  <Stack>
                    <Text marginBottom="0" fontWeight="bold">
                      {val.tag}
                    </Text>
                    <Text marginTop="-1" fontSize="14">
                      {val.info}
                    </Text>
                  </Stack>
                </Flex>
              </Stack>
            </GridItem>
          ))}
        </Grid>
      </Box>
      <Center>
        <Card boxShadow="md" maxW="900px" w="100%">
          <CardBody p="16">
            <Text fontSize="2xl" fontWeight="bold" className="text-orange-500">
              Get In Touch
            </Text>

            <form method="GET">
              <Flex justify="space-around" py="5">
                <Grid
                  templateColumns={{ base: "1fr", md: "1fr 1fr 1fr" }} // Adjust the column layout based on screen size
                  gap={4} // Adjust the gap between grid items
                >
                  <GridItem>
                    <FormControl width="100%">
                      <Input
                        type="text"
                        placeholder="Your Name"
                        name="name"
                        value={user.name}
                        onChange={handelinput}
                      />
                    </FormControl>
                  </GridItem>
                  <GridItem>
                    <FormControl width="100%">
                      <Input
                        type="email"
                        placeholder="Your Email"
                        value={user.email}
                        onChange={handelinput}
                        name="email"
                      />
                    </FormControl>
                  </GridItem>
                  <GridItem>
                    <FormControl width="100%">
                      <Input
                        type="number"
                        placeholder="Your Number"
                        value={user.phone}
                        onChange={handelinput}
                        name="phone"
                      />
                    </FormControl>
                  </GridItem>
                </Grid>
              </Flex>
            </form>
            <Stack>
              <Box py="5">
                <Textarea
                  placeholder="Here is a sample placeholder"
                  value={user.message}
                  onChange={handelinput}
                  name="message"
                />
              </Box>
              <Box>
                <button
                  className="bg-orange-500 text-white p-3 rounded-md"
                  onClick={sendContactData}
                >
                  Send Message
                </button>
              </Box>
            </Stack>
          </CardBody>
        </Card>
      </Center>
    </Stack>
  );
};

export default Page;
