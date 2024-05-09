import CredentialsProvider from "next-auth/providers/credentials";
import { NuxtAuthHandler } from "#auth";
import User from "~/server/models/user.schema";

// Need to add session role authentication
export default NuxtAuthHandler({
  secret: useRuntimeConfig().authSecret,
  pages: {
    signIn: "/admin/signin",
  },
  providers: [
    CredentialsProvider.default({
      async authorize(credentials: any) {
        const user = await User.findOne({ username: credentials?.username });

        // [Câu hỏi] Em zai có encrypt password ko ý nhỉ? Hay là store password as plain text?
        // Với cả em ko cần check username nữa vì nó đã được match ở dòng 14 rồi
        if (
          credentials?.username === user?.username &&
          credentials?.password === user?.password
        ) {
          return {
            name: user?.username,
          };
        } else {
          console.error(
            "Warning: Malicious login attempt registered, bad credentials provided"
          );
          return null;
        }
      },
    }),
  ],
});
