import { db } from "@/utils/db";
export async function POST(req: Request, res: Response) {
  try {
    const data = await req.formData();
    const email = data.get("email");
    const position = data.get("position");
    const name = data.get("name");
    const number = data.get("number");
    const location = data.get("location");
    const linkedinUrl = data.get("linkedinUrl");
    const image = data.get("image");

    const user = await db.user.findUnique({
      where: {
        email: email as string,
      },
    });

    if (!user) {
      return new Response("User not found", { status: 404 });
    }
    const updatedUser = await db.user.update({
      where: { email: email as string },
      data: {
        image: image as string,
        position: position as string,
        name: name as string,
        phoneNumber: number as string,
        location: location as string,
        linkedinUrl: linkedinUrl as string,
      },
    });

    return Response.json({ message: updatedUser }, { status: 200 });
  } catch (error) {
    console.log(error);
    return Response.json({ message: "Error updating user" }, { status: 500 });
  }
}
