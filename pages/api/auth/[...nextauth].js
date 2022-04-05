import NextAuth from "next-auth";
import FacebookProvider from "next-auth/providers/facebook";
export default NextAuth({
  providers: [
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
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
