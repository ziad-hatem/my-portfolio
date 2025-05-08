"use server";

import { db } from "./prisma";
import { revalidatePath } from "next/cache";
import { Resend } from "resend";
import { ContactFormEmail } from "@/components/emails/contact-form-email";
import { sendAutoResponseEmail } from "@/lib/email-utils";

const resend = new Resend(process.env.RESEND_API_KEY);

interface ContactFormData {
  name: string;
  email: string;
  phoneNumber: string;
  message: string;
  category?: "general" | "project" | "job" | "collaboration";
}

export async function submitContactForm(userId: string, data: ContactFormData) {
  try {
    // 1. Save to database
    const contact = await db.contact.create({
      data: {
        userId,
        name: data.name,
        email: data.email,
        phoneNumber: data.phoneNumber,
        message: data.message,
      },
    });

    // 2. Get user info for the auto-response
    const user = await db.user.findUnique({
      where: { id: userId },
      select: { name: true, email: true },
    });

    // 3. Send notification email to portfolio owner
    const notificationResult = await resend.emails.send({
      from: "Portfolio Contact <ziad@ziadhatem.live>", // Update with your verified domain
      to: process.env.NOTIFICATION_EMAIL || "ziad@ziadhatem.live",
      subject: `New Contact Form Submission from ${data.name}`,
      react: ContactFormEmail({
        name: data.name,
        email: data.email,
        phoneNumber: data.phoneNumber,
        message: data.message,
      }),
    });

    if (notificationResult.error) {
      console.error(
        "Error sending notification email:",
        notificationResult.error
      );
    }

    // 4. Send auto-response email to the person who submitted the form
    const autoResponseResult = await sendAutoResponseEmail(
      data.email,
      data.name,
      user?.name || "Portfolio Owner",
      user?.email || process.env.NOTIFICATION_EMAIL || "your-email@example.com"
    );

    if (autoResponseResult.error) {
      console.error(
        "Error sending auto-response email:",
        autoResponseResult.error
      );
    }

    revalidatePath("/");
    return {
      success: true,
      data: contact,
      notificationSent: !notificationResult.error,
      autoResponseSent: !autoResponseResult.error,
    };
  } catch (error) {
    console.error("Error submitting contact form:", error);
    return { success: false, error: "Failed to submit contact form" };
  }
}
