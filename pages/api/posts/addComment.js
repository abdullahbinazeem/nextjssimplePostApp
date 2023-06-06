import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import prisma from "../../../prisma/client";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(401).json({ message: "Please sign in" });
  }

  if (req.method === "POST") {
    //Get User
    const prismaUser = await prisma.user.findUnique({
      where: { email: session?.user?.email },
    });

    //Add a comment
    try {
      const { postId, title } = req.body.data;

      if (!title.length) {
        return res.status(401).json({ message: "Please enter something" });
      }

      const result = await prisma.comment.create({
        data: {
          message: title,
          userId: prismaUser?.id,
          postId,
        },
      });

      res.status(200).json(result);
    } catch (err) {
      res.json({ err: "Error has occured whilst adding commet" });
    }
  }
}
