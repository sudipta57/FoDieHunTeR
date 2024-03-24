import { useSession, signIn, signOut } from "next-auth/react";
import React from "react";
const logout = () => {
  const { data: session } = useSession();
  return (
    <center>
      <Text>logging out</Text>
    </center>
  );
};

export default logout;
