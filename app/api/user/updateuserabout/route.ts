import { db } from "@/utils/db";

export async function POST(req: Request) {
  try {
    const url = new URL(req.url);
    const email = url.searchParams.get("email");
    const data = await req.json();

    if (email) {
      const user = await db.user.findUnique({
        where: { email },
        include: {
          aboutMe: true,
        },
      });
      if (!user) {
        return new Response("User not found", { status: 404 });
      }
      const about = await db.aboutMe.update({
        where: {
          userId: user.id,
        },
        data: {
          ...data,
          userId: user.id,
        },
      });
      return Response.json({ data: about }, { status: 200 });
    } else {
      if (!email) {
        return new Response("email not Provided", { status: 400 });
      }
    }
  } catch (error) {
    console.log(error);
    return new Response("Error adding data", { status: 500 });
  }
}
