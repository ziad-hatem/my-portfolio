import { db } from "@/utils/db";

export async function POST(req: Request) {
  try {
    const email = await req.url.split("email=")[1];
    const res = await req.json();
    console.log(res);

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
        workExperience: {
          create: {
            title: res.title,
            description: res.description,
            startDate: res.startDate,
            endDate: res.endDate,
          },
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
    const { id, title, description, startDate, endDate } = res;

    const user = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return new Response("User not found", { status: 404 });
    }

    const updatedUser = await db.workExperience.update({
      where: {
        id,
        user: {
          email,
        },
      },
      data: {
        title,
        description,
        startDate,
        endDate,
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

    const updatedUser = await db.workExperience.delete({
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
    return new Response("Error DELETE EXPERIENCE data", { status: 500 });
  }
}
