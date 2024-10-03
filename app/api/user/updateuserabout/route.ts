import { db } from "@/utils/db";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const email = await req.url.split("email=")[1];
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
  } catch (error) {
    console.log(error);
    return new Response("Error adding data", { status: 500 });
  }
}
