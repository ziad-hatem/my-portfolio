import { db } from "@/utils/db";
import path from "path";
import fs from "fs";
import { Buffer } from "buffer";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: Request) {
  try {
    const data = await req.formData();
    const image = data.get("image");
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

    const user = await db.user.create({
      data: {
        image: image as string,
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
