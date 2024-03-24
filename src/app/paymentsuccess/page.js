"use client";

import { Button, Text } from "@chakra-ui/react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const Paymentsuccess = () => {
  const searchparams = useSearchParams();
  const [param, setParam] = useState();
  useEffect(() => {
    const paramObj = searchparams.get("data");
    setParam(paramObj);
  }, []);
  return (
    <div>
      <center>
        <Text className="text-2xl font-bold">
          Your payment details are {param}
        </Text>
        <Text mt="10">Make Sure To Click The Continue Button</Text>
        <Link href="/menu">
          <Button my="10">Continue</Button>
        </Link>
      </center>
    </div>
  );
};

export default Paymentsuccess;
