import { db } from "@/utils/db";

export async function POST(req: Request) {
  try {
    const url = new URL(req.url);
    const email = url.searchParams.get("email");
    const res = await req.json();

    if (!email) {
      return new Response("Email parameter is missing", { status: 400 });
    }
    const { title, youtubeUrl, imageUrl, projectUrl, linkedinUrl, githubUrl } =
      res;

    const user = await db.user.findUnique({
      where: { email },
    });

    if (!user) {
      return new Response("User not found", { status: 404 });
    }

    const updatedUser = await db.user.update({
      where: { email },
      data: {
        projects: {
          create: {
            title,
            youtubeUrl: youtubeUrl ?? undefined,
            imageUrl,
            projectUrl,
            linkedinUrl: linkedinUrl ?? undefined,
            githubUrl: githubUrl ?? undefined,
            technologies: {
              create: res.technologies.map(
                (technology: { icon: string; name: string }) => ({
                  icon: technology.icon,
                  name: technology.name,
                })
              ),
            },
          },
        },
      },
    });

    return Response.json({ user: updatedUser }, { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Error adding project data", { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const email = await req.url.split("email=")[1];
    const res = await req.json();
    const {
      id,
      title,
      youtubeUrl,
      imageUrl,
      projectUrl,
      linkedinUrl,
      githubUrl,
    } = res;
    const user = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return new Response("User not found", { status: 404 });
    }

    const updatedProject = await db.projects.update({
      where: {
        id,
        user: { email },
      },
      data: {
        title,
        youtubeUrl,
        imageUrl,
        projectUrl,
        linkedinUrl,
        githubUrl,
        technologies: {
          upsert: res.technologies.map(
            (technology: { id?: string; icon: string; name: string }) => ({
              where: { id: technology.id || "new-id" },
              update: { icon: technology.icon, name: technology.name },
              create: { icon: technology.icon, name: technology.name },
            })
          ),
        },
      },
      include: {
        technologies: true,
      },
    });

    return Response.json({ user: updatedProject }, { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Error Add Education data", { status: 500 });
  }
}
export async function DELETE(req: Request) {
  try {
    const url = new URL(req.url);
    const email = url.searchParams.get("email") || "";
    const id = url.searchParams.get("id") || "";
    const user = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return new Response("User not found", { status: 404 });
    }

    const updatedUser = await db.projects.delete({
      where: {
        id,
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
