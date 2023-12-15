import { PrismaAdapter } from "@auth/prisma-adapter";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import db from "./db";
import { compare, hash } from "bcrypt";
import { User } from "@prisma/client";

export const options = {
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials, req) {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)
        // const res = await fetch("/your/endpoint", {
        //   method: "POST",
        //   body: JSON.stringify(credentials),
        //   headers: { "Content-Type": "application/json" },
        // });
        // const user = await res.json();
        const user = await db.user.findUnique({
          where: { email: credentials?.email },
        });
        console.log({ credentials });
        if (user) {
          const checkingPassword = await compare(
            credentials?.password || "",
            user.hashpassword
          );
          if (checkingPassword) {
            return {
              id: user.id,
              name: user.name,
              email: user.email,
            };
          } else {
            return null;
          }
        } else {
          return null;
        }

        // If no error and we have user data, return it
        // if (res.ok && user) {
        //   return user;
        // }
        // Return null if user data could not be retrieved
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60,
  },
  callbacks: {
    jwt: ({ token, user }) => {
      console.log("Jwt", { token, user });
      if (user) {
        return {
          ...token,
          id: user.id,
        };
      }

      return token;
    },
    session: ({ session, token, user }) => {
      console.log("Session Callbacks", { session, token });
      // session.accessToken = token.accessToken;
      // session.user.id = token.id;
      // console.log("Hello");
      // console.log(session, user);
      return { ...session, id: token.sub };
    },

    async signIn({ user, credentials }) {
      if (user) {
        return true;
      } else {
        return false;
      }
    },
  },

  pages: {
    signIn: "/login",
  },

  // events: {
  //   async signIn({ user, isNewUser }) {
  //     console.log({ user }, "Signed in");
  //   },
  // },
} satisfies AuthOptions;
