// import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
// const handler = NextAuth({
//   providers: [
//     // OAuth authentication providers...
//     GithubProvider({
//       clientId: "00eff1a3a4b61abb99b0",
//       clientSecret: "0ac187812e2d52b5065119a2f366977adf9d7fd3",
//     }),
//     GoogleProvider({
//       clientId:
//         "80375417783-5ag6l91it78mha3q5tc096nbfnls0pmn.apps.googleusercontent.com",
//       clientSecret: "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",
//     }),
//   ],
// });

// export { handler as GET, handler as POST };

// ***************************
import NextAuth from "next-auth";

export const authOptions = {
  providers: [
    // OAuth authentication providers...
    GithubProvider({
      clientId: "00eff1a3a4b61abb99b0",
      clientSecret: "0ac187812e2d52b5065119a2f366977adf9d7fd3",
    }),
    GoogleProvider({
      clientId:
        "80375417783-5ag6l91it78mha3q5tc096nbfnls0pmn.apps.googleusercontent.com",
      clientSecret: "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",
    }),
  ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
