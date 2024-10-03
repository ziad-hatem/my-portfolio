import crypto from "crypto";

export async function compareImagesPixelByPixel(
  buffer1: Buffer,
  buffer2: Buffer
): Promise<boolean> {
  const hash1 = crypto.createHash("sha256").update(buffer1).digest("hex");
  const hash2 = crypto.createHash("sha256").update(buffer2).digest("hex");
  return hash1 === hash2;
}
