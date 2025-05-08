import { EmailLayout, Heading, Paragraph, CalloutBox, Signature } from "./email-layout"

interface NewsletterSubscriptionEmailProps {
  recipientName: string
  portfolioOwnerName: string
  portfolioOwnerPosition?: string
  portfolioWebsite?: string
  unsubscribeUrl?: string
}

export function NewsletterSubscriptionEmail({
  recipientName,
  portfolioOwnerName,
  portfolioOwnerPosition = "Web Developer",
  portfolioWebsite = "https://yourportfolio.com",
  unsubscribeUrl = "https://yourportfolio.com/unsubscribe",
}: NewsletterSubscriptionEmailProps) {
  return (
    <EmailLayout>
      <Heading>Welcome to My Newsletter!</Heading>

      <Paragraph>Hello {recipientName},</Paragraph>

      <Paragraph>
        Thank you for subscribing to my newsletter! I'm excited to share updates on my latest projects, insights on web
        development trends, and useful resources with you.
      </Paragraph>

      <CalloutBox color="#1976d2">
        <Paragraph>
          <strong>What to expect:</strong>
        </Paragraph>
        <Paragraph>
          • Monthly updates on my latest projects and case studies
          <br />• Insights and tutorials on web development best practices
          <br />• Curated resources and tools I find valuable
          <br />• Occasional announcements about availability for new projects
        </Paragraph>
      </CalloutBox>

      <Paragraph>
        I respect your inbox and promise to only send content that I believe will be valuable to you. You can expect to
        receive my newsletter approximately once a month.
      </Paragraph>

      <Paragraph>
        If at any point you wish to unsubscribe, you can do so by clicking the link below or at the bottom of any
        newsletter email.
      </Paragraph>

      <div style={{ margin: "25px 0", textAlign: "center" as const }}>
        <a
          href={unsubscribeUrl}
          style={{
            color: "#777",
            fontSize: "14px",
            textDecoration: "underline",
          }}
        >
          Unsubscribe from newsletter
        </a>
      </div>

      <Paragraph>
        Thank you again for your interest in my work. I look forward to sharing valuable content with you!
      </Paragraph>

      <Signature name={portfolioOwnerName} position={portfolioOwnerPosition} website={portfolioWebsite} />
    </EmailLayout>
  )
}
