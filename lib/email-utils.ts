import { Resend } from "resend";
import { AutoResponseEmail } from "@/components/emails/auto-response-email";
import { ProjectInquiryEmail } from "@/components/emails/project-inquiry-email";
import { JobOpportunityEmail } from "@/components/emails/job-opportunity-email";
import { CollaborationEmail } from "@/components/emails/collaboration-email";
import { FollowUpEmail } from "@/components/emails/follow-up-email";
import { NewsletterSubscriptionEmail } from "@/components/emails/newsletter-subscription-email";

const resend = new Resend(process.env.RESEND_API_KEY);

interface EmailSenderOptions {
  from?: string;
  replyTo?: string;
}

export async function sendAutoResponseEmail(
  to: string,
  recipientName: string,
  portfolioOwnerName: string,
  portfolioOwnerEmail: string,
  options?: EmailSenderOptions
) {
  return resend.emails.send({
    from: options?.from || "Portfolio Contact <ziad@ziadhatem.live>",
    // reply_to: options?.replyTo || portf≥÷olioOwnerEmail,
    to,
    subject: "Thank you for contacting me!",
    react: AutoResponseEmail({
      recipientName,
      portfolioOwnerName,
      portfolioOwnerEmail,
    }),
  });
}

export async function sendProjectInquiryEmail(
  to: string,
  recipientName: string,
  projectName: string,
  portfolioOwnerName: string,
  options?: EmailSenderOptions
) {
  return resend.emails.send({
    from: options?.from || "Portfolio Contact <ziad@ziadhatem.live>",
    // reply_to: options?.replyTo,
    to,
    subject: `Thank you for your interest in ${projectName}`,
    react: ProjectInquiryEmail({
      recipientName,
      projectName,
      portfolioOwnerName,
    }),
  });
}

export async function sendJobOpportunityEmail(
  to: string,
  recipientName: string,
  companyName: string,
  portfolioOwnerName: string,
  options?: EmailSenderOptions
) {
  return resend.emails.send({
    from: options?.from || "Portfolio Contact <ziad@ziadhatem.live>",
    // reply_to: options?.replyTo,
    to,
    subject: "Thank you for the job opportunity",
    react: JobOpportunityEmail({
      recipientName,
      companyName,
      portfolioOwnerName,
    }),
  });
}

export async function sendCollaborationEmail(
  to: string,
  recipientName: string,
  projectType: string,
  portfolioOwnerName: string,
  options?: EmailSenderOptions
) {
  return resend.emails.send({
    from: options?.from || "Portfolio Contact <ziad@ziadhatem.live>",
    // reply_to: options?.replyTo,
    to,
    subject: "Excited about our potential collaboration",
    react: CollaborationEmail({
      recipientName,
      projectType,
      portfolioOwnerName,
    }),
  });
}

export async function sendFollowUpEmail(
  to: string,
  recipientName: string,
  originalSubject: string,
  meetingDate: string,
  portfolioOwnerName: string,
  options?: EmailSenderOptions
) {
  return resend.emails.send({
    from: options?.from || "Portfolio Contact <ziad@ziadhatem.live>",
    // reply_to: options?.replyTo,
    to,
    subject: `Following up: ${originalSubject}`,
    react: FollowUpEmail({
      recipientName,
      originalSubject,
      meetingDate,
      portfolioOwnerName,
    }),
  });
}

export async function sendNewsletterSubscriptionEmail(
  to: string,
  recipientName: string,
  portfolioOwnerName: string,
  options?: EmailSenderOptions
) {
  return resend.emails.send({
    from: options?.from || "Portfolio Newsletter <ziad@ziadhatem.live>",
    // reply_to: options?.replyTo,
    to,
    subject: "Welcome to my newsletter!",
    react: NewsletterSubscriptionEmail({
      recipientName,
      portfolioOwnerName,
    }),
  });
}
