import { EmailTemplate } from "@/app/_components/email-template";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const res = await req.json();
    const { data, error } = await resend.emails.send({
      from: `${res.fullname} <onboarding@resend.dev>`,
      to: ["ziadhatemdev@gmail.com"],
      subject: `${res.subject}`,
      react: EmailTemplate({ message: res.message, sender: res.email }),
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
