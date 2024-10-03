import { db } from "@/utils/db";

export async function POST(req: Request) {
  try {
    const email = await req.url.split("email=")[1];
    const res = await req.json();
    console.log(res);
    const { icon, name } = res;
    const user = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return new Response("User not found", { status: 404 });
    }

    const updatedUser = await db.user.update({
      where: {
        email,
      },
      data: {
        mySkills: {
          create: { icon, name },
        },
      },
    });

    return Response.json({ user: updatedUser }, { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Error Add Education data", { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const email = await req.url.split("email=")[1];
    const res = await req.json();
    const { id, icon, name } = res;

    const user = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return new Response("User not found", { status: 404 });
    }

    const updatedUser = await db.mySkills.update({
      where: {
        id,
        user: {
          email,
        },
      },
      data: {
        icon,
        name,
      },
    });

    return Response.json({ user: updatedUser }, { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Error Add Education data", { status: 500 });
  }
}
export async function DELETE(req: Request) {
  try {
    const email = await req.url.split("email=")[1];
    const res = await req.json();
    const { id } = res;

    const user = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return new Response("User not found", { status: 404 });
    }

    const updatedUser = await db.mySkills.delete({
      where: {
        id: id,
        user: {
          email,
        },
      },
    });

    return Response.json({ user: updatedUser }, { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Error DELETE Skill data", { status: 500 });
  }
}
