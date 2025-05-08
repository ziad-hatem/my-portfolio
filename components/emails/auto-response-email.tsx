import { EmailLayout, Heading, Paragraph, CalloutBox, Signature } from "./email-layout"

interface AutoResponseEmailProps {
  recipientName: string
  portfolioOwnerName: string
  portfolioOwnerEmail: string
  portfolioOwnerPosition?: string
  portfolioWebsite?: string
}

export function AutoResponseEmail({
  recipientName,
  portfolioOwnerName,
  portfolioOwnerEmail,
  portfolioOwnerPosition = "Web Developer",
  portfolioWebsite = "https://yourportfolio.com",
}: AutoResponseEmailProps) {
  return (
    <EmailLayout>
      <Heading>Thank You for Your Message</Heading>

      <Paragraph>Hello {recipientName},</Paragraph>

      <Paragraph>
        Thank you for reaching out through my portfolio website. I appreciate your interest and will review your message
        as soon as possible.
      </Paragraph>

      <CalloutBox>
        <Paragraph>
          <strong>What happens next?</strong>
        </Paragraph>
        <Paragraph>
          I typically respond to inquiries within 1-2 business days. If your matter is urgent, please feel free to reach
          out to me directly at {portfolioOwnerEmail}.
        </Paragraph>
      </CalloutBox>

      <Paragraph>In the meantime, feel free to explore more of my portfolio and projects.</Paragraph>

      <Signature name={portfolioOwnerName} position={portfolioOwnerPosition} website={portfolioWebsite} />
    </EmailLayout>
  )
}
