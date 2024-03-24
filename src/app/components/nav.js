"use client";
import {
  Text,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
  Box,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { IoReorderThreeSharp } from "react-icons/io5";

const Nav = () => {
  const { data: session } = useSession();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  return (
    <>
      <Box
        display={{
          base: "none",
          md: "block",
        }}
      >
        <nav className="h-22 py-3 max-w-full mx-auto px-4 sm:px-6 lg:px-8 w-full md:w-80%">
          <ul className="flex justify-between items-center font-bold">
            <Text className="px-4 text-2xl cursor-pointer">FooDie HuNteR</Text>
            <div className="flex space-x-6 font-bold w-50%">
              <NavItem href="/">HOME</NavItem>
              <NavItem href="/menu">MENU</NavItem>
              <NavItem href="/cart">CART</NavItem>
              <NavItem href="/contact">CONTACT</NavItem>
              {session ? (
                <NavItem href="/signout">LOG OUT</NavItem>
              ) : (
                <NavItem href="/signin">SIGN IN</NavItem>
              )}
            </div>
          </ul>
        </nav>
      </Box>
      <Box
        className="h-22 py-3 max-w-full mx-auto px-4 sm:px-6 lg:px-8 w-full md:w-80%"
        display={{
          base: "block",
          md: "none",
        }}
      >
        <ul className="flex justify-between items-center font-bold">
          <Text className="px-4 text-2xl cursor-pointer">FooDie HuNteR</Text>
          <Button ref={btnRef} colorScheme="teal" onClick={onOpen}>
            <IoReorderThreeSharp />
          </Button>
        </ul>
      </Box>

      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <nav className="h-22 py-3 max-w-full mx-auto px-4 sm:px-6 lg:px-8 w-full md:w-80% pt-24">
            <ul className="flex justify-between items-center font-bold">
              <Text className="px-4 text-2xl cursor-pointer">
                FooDie HuNteR
              </Text>
              <div className=" space-x-6 font-bold w-50%">
                <NavItem href="/">HOME</NavItem>
                <NavItem href="/menu">MENU</NavItem>
                <NavItem href="/cart">CART</NavItem>
                <NavItem href="/contact">CONTACT</NavItem>
                {session ? (
                  <NavItem href="/signout">LOG OUT</NavItem>
                ) : (
                  <NavItem href="/signin"> SIGN IN</NavItem>
                )}
              </div>
            </ul>
          </nav>
        </DrawerContent>
      </Drawer>
    </>
  );
};

const NavItem = ({ href, button, children }) => {
  const defaultClasses =
    "p-4 cursor-pointer hover:text-white hover:transition hover:bg-black hover:rounded-md";
  const buttonClasses =
    "p-4 cursor-pointer bg-orange-600 text-white rounded-md";

  return (
    <Link href={href}>
      <li className={button ? buttonClasses : defaultClasses}>{children}</li>
    </Link>
  );
};

export default Nav;
