import { EmailLayout, Heading, Paragraph, CalloutBox, Signature, Button } from "./email-layout"

interface JobOpportunityEmailProps {
  recipientName: string
  companyName?: string
  portfolioOwnerName: string
  portfolioOwnerPosition?: string
  portfolioWebsite?: string
  resumeUrl?: string
}

export function JobOpportunityEmail({
  recipientName,
  companyName = "your company",
  portfolioOwnerName,
  portfolioOwnerPosition = "Web Developer",
  portfolioWebsite = "https://yourportfolio.com",
  resumeUrl = "https://yourportfolio.com/resume",
}: JobOpportunityEmailProps) {
  return (
    <EmailLayout>
      <Heading>Thank You for the Job Opportunity</Heading>

      <Paragraph>Hello {recipientName},</Paragraph>

      <Paragraph>
        Thank you for reaching out regarding the job opportunity at {companyName}. I'm excited to learn more about the
        position and how my skills and experience might be a good fit for your team.
      </Paragraph>

      <CalloutBox color="#2e7d32">
        <Paragraph>
          <strong>Next steps:</strong>
        </Paragraph>
        <Paragraph>
          I'll review the details you've shared and respond within 1-2 business days. I'm looking forward to discussing
          this opportunity further and learning more about your team and projects.
        </Paragraph>
      </CalloutBox>

      <Paragraph>
        For your convenience, you can view my complete resume and portfolio through the link below. This includes my
        work history, projects, and technical skills that might be relevant to this position.
      </Paragraph>

      <Button href={resumeUrl}>View My Resume</Button>

      <Paragraph>
        If you need any additional information or would like to schedule a call, please let me know your availability.
      </Paragraph>

      <Signature name={portfolioOwnerName} position={portfolioOwnerPosition} website={portfolioWebsite} />
    </EmailLayout>
  )
}
