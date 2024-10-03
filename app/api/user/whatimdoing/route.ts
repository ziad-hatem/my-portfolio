import { db } from "@/utils/db";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const user = await db.user.findUnique({
      where: {
        email: data.email,
      },
      include: {
        whatIDo: true,
      },
    });

    if (!user) {
      return new Response("User not found", { status: 404 });
    }

    if (user.whatIDo.length >= 4) {
      return new Response("Cannot Add More than 4", { status: 404 });
    }

    const editedUser = await db.user.update({
      where: {
        email: data.email,
      },
      data: {
        whatIDo: {
          create: {
            title: data.title,
            text: data.text,
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

export async function DELETE(req: Request) {
  try {
    const data = await req.json();

    const editedUser = await db.user.update({
      where: {
        email: data.email,
      },
      data: {
        whatIDo: {
          delete: {
            id: data.id,
          },
        },
      },
    });

    return Response.json({ editedUser }, { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Error deleting data", { status: 500 });
  }
}
