import { db } from "@/utils/db";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const editedUser = await db.user.update({
      where: {
        email: data.email,
      },
      data: {
        whatIDo: {
          update: {
            where: {
              id: data.id,
            },
            data: {
              title: data.title,
              text: data.text,
            },
          },
        },
      },
    });

    return Response.json({ editedUser }, { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Error adding data", { status: 500 });
  }
}
