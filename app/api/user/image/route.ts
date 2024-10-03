import path from "path";
import fs from "fs";
import { Buffer } from "buffer";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const image = formData.get("image");

    if (!image || !(image instanceof Blob)) {
      return Response.json({ message: "No image provided" }, { status: 400 });
    }

    const buffer = await image.arrayBuffer();
    const filename = image.name || "image";
    const fileExtension = path.extname(filename);
    const baseFilename = path.basename(filename, fileExtension);

    const originalPath = path.join(
      process.cwd(),
      `/public/upload/${baseFilename}${fileExtension}`
    );
    fs.writeFileSync(originalPath, Buffer.from(buffer));
    const sharp = (await import("sharp")).default;

    const thumbnailBuffer = await sharp(Buffer.from(buffer))
      .blur(1)
      .resize(10)
      .toBuffer();

    const thumbnailPath = path.join(
      process.cwd(),
      `/public/upload/${baseFilename}-thumbnail.jpg`
    );
    fs.writeFileSync(thumbnailPath, thumbnailBuffer);

    return new Response(
      JSON.stringify({ message: "Image uploaded successfully" }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error adding data:", error);
    return new Response("Error adding data", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const src = searchParams.get("src");
    const thumbnail = searchParams.get("thumbnail");
    const width = searchParams.get("w");
    const quality = searchParams.get("quality");

    if (!src) {
      return new Response("No image source provided", { status: 400 });
    }

    const basename = path.basename(src, path.extname(src));
    const imgExtension = path.extname(src);
    console.log(basename);

    if (thumbnail) {
      const thumbnailImage = fs.readFileSync(
        path.join(
          process.cwd(),
          `/public/upload/${basename}-thumbnail${imgExtension}`
        )
      );

      return new Response(thumbnailImage);
    }

    const imagePath = path.join(process.cwd(), `${src}`);
    const originalImage = fs.readFileSync(imagePath);

    const sharp = (await import("sharp")).default;

    const resizedImageBuffer = await sharp(originalImage)
      .png({ quality: quality ? Number(quality) : 100 })
      .resize(Number(width))
      .toBuffer();

    return new Response(resizedImageBuffer, {
      headers: { "Content-Type": "image/png" },
    });
  } catch (error) {
    console.error("Error adding data:", error);
    return new Response("Error adding data", { status: 500 });
  }
}
