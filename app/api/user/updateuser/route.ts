import { db } from "@/utils/db";
import path from "path";
import fs from "fs";
import { compareImagesPixelByPixel } from "../utils/compareImages";
import { v4 as uuidv4 } from "uuid";
export async function POST(req: Request, res: Response) {
  try {
    const data = await req.formData();
    const email = data.get("email");
    const position = data.get("position");
    const name = data.get("name");
    const number = data.get("number");
    const location = data.get("location");
    const linkedinUrl = data.get("linkedinUrl");
    const image = data.get("image[]");
    const user = await db.user.findUnique({
      where: {
        email: email as string,
      },
    });

    if (!user) {
      return new Response("User not found", { status: 404 });
    }

    if (!image || !(image instanceof Blob)) {
      return Response.json({ message: "No image provided" }, { status: 400 });
    }

    const validMimeTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!validMimeTypes.includes(image.type)) {
      return new Response(
        JSON.stringify({
          message: "Unsupported image format. Please upload JPG or PNG images.",
        }),
        { status: 400 }
      );
    }

    const imageName = image.name;
    const imageExtension = path.extname(imageName).toLowerCase();

    if (![".jpg", ".jpeg", ".png"].includes(imageExtension)) {
      return new Response(
        JSON.stringify({
          message:
            "Unsupported image extension. Please upload JPG or PNG images.",
        }),
        { status: 400 }
      );
    }

    const newImagePath = path.join(
      process.cwd(),
      `/public/upload/${imageName}`
    );
    const oldImagePath = path.join(process.cwd(), `${user.image}`);

    const newImageBuffer = Buffer.from(await image.arrayBuffer());

    let oldImageBuffer: Buffer;
    try {
      oldImageBuffer = await fs.promises.readFile(oldImagePath);
    } catch (err) {
      return new Response(JSON.stringify({ message: "Old image not found" }), {
        status: 404,
      });
    }

    const isSame = await compareImagesPixelByPixel(
      oldImageBuffer,
      newImageBuffer
    );

    if (!isSame) {
      const uniqueId = uuidv4();
      const newImageName = `${uniqueId}${imageExtension}`;
      const buffer = await image.arrayBuffer();
      const filename = image.name || "image";
      const fileExtension = path.extname(filename);
      const baseFilename = path.basename(filename, fileExtension);
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

      await db.user.update({
        where: { email: email as string },
        data: {
          image: imgPath,
        },
      });
    } else {
      if (fs.existsSync(newImagePath)) {
        fs.unlinkSync(newImagePath);
      }
    }

    const updatedUser = await db.user.update({
      where: { email: email as string },
      data: {
        position: position as string,
        name: name as string,
        phoneNumber: number as string,
        location: location as string,
        linkedinUrl: linkedinUrl as string,
      },
    });

    return Response.json({ message: "User updated" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return Response.json({ message: "Error updating user" }, { status: 500 });
  }
}
