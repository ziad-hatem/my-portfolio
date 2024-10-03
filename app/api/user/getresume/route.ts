import { db } from "@/utils/db";

export async function GET(req: Request) {
  try {
    const email = await req.url.split("email=")[1];
    const user = await db.user.findUnique({
      where: {
        email,
      },
      include: {
        education: true,
        workExperience: true,
      },
    });

    if (!user) {
      return new Response("User not found", { status: 404 });
    }

    return Response.json({ user: user }, { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Error Add Education data", { status: 500 });
  }
}
