import { Box, Button, Grid, GridItem, Stack, Text } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";

const Herosec = () => {
  return (
    <Box>
      <Grid templateColumns="repeat(2, 2fr)" gap={6} w="100%">
        <GridItem colSpan={{ base: 2, lg: "auto" }}>
          <Stack spacing="16">
            <Stack spacing="6">
              <Text className="text-7xl font-extrabold pt-28">
                Your Favourite Food
              </Text>
              <Text className="text-7xl font-extrabold ">
                <span className="text-orange-600"> delivery</span> Partner
              </Text>
            </Stack>
            <Stack spacing="10">
              <Text className="text-gray-400">
                We are focused on being the best helping hand to the local
                <Text>buissnesses</Text>
              </Text>
              <Button colorScheme="orange" rounded="lg" w="40">
                Order now
              </Button>
            </Stack>
          </Stack>
        </GridItem>
        <GridItem
          colSpan={{ base: 2, lg: "auto" }}
          className="relative  h-[90vh]"
        >
          <Image
            src="/deliveryboy.png"
            layout="fill"
            objectFit="cover"
            alt="Delivery man"
          />
        </GridItem>
      </Grid>
    </Box>
  );
};

export default Herosec;
