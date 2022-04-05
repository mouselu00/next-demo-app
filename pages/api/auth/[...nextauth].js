import NextAuth from "next-auth";
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";
export default NextAuth({
  providers: [
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  secret: process.env.SECRET,
  pages: {
    signIn: "/index", // Displays signin buttons
  },
  jwt: {
    // openssl rand -base64 64
    secret: process.env.JWT_SECRET,
    encryption: true,
    // npx node-jose-tools newkey -s 256 -t oct -a HS512
    signingKey: process.env.JWT_SIGNING_KEYS,
    // npx node-jose-tools newkey -s 256 -t oct -a A256GCM
    encryptionKey: process.env.JWT_ENCRYPTION_KEY,
  },
});
