import { db } from "@/utils/db";
import path from "path";
import fs from "fs";
import { Buffer } from "buffer";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: Request) {
  try {
    const data = await req.formData();
    const image = data.get("image[]");
    const name = data.get("name");
    const position = data.get("position");
    const email = data.get("email");
    const number = data.get("number");
    const location = data.get("location");
    const linkedinUrl = data.get("linkedinUrl");

    const existingUser = await db.user.findUnique({
      where: { email: email as string },
    });

    if (existingUser) {
      return new Response("User with this email already exists", {
        status: 400,
      });
    }

    if (!image || !(image instanceof Blob)) {
      return Response.json({ message: "No image provided" }, { status: 400 });
    }
    const buffer = await image.arrayBuffer();
    const filename = image.name || "image";
    const fileExtension = path.extname(filename);
    const baseFilename = path.basename(filename, fileExtension);
    const uniqueId = uuidv4();
    const newImageName = `${uniqueId}${fileExtension}`;
    const newImageNameThumbnail = `${uniqueId}-thumbnail`;

    const originalPath = path.join(
      process.cwd(),
      `/public/upload/${newImageName}`
    );
    fs.writeFileSync(originalPath, Buffer.from(buffer));
    const sharp = (await import("sharp")).default;

    const thumbnailBuffer = await sharp(Buffer.from(buffer))
      .blur(1)
      .resize(10)
      .toBuffer();

    const thumbnailPath = path.join(
      process.cwd(),
      `/public/upload/${newImageNameThumbnail}${fileExtension}`
    );
    fs.writeFileSync(thumbnailPath, thumbnailBuffer);
    const imgPath = `/public/upload/${newImageName}`;

    const user = await db.user.create({
      data: {
        image: imgPath,
        name: name as string,
        position: position as string,
        email: email as string,
        phoneNumber: number as string,
        linkedinUrl: linkedinUrl as string,
        location: location as string,
        aboutMe: {
          create: {
            description: "",
            yearsOfExperience: 0,
            trainingCourses: 0,
            awardsCertificates: 0,
          },
        },
        whatIDo: {
          create: [],
        },
        education: {
          create: [],
        },
        workExperience: {
          create: [],
        },
        projects: {
          create: [],
        },
        contact: {
          create: [],
        },
      },
    });
    return Response.json({ user }, { status: 200 });
  } catch (error) {
    console.error("Error adding data:", error);
    return new Response("Error adding data", { status: 500 });
  }
}
