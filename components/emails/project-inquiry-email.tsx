import { EmailLayout, Heading, Paragraph, CalloutBox, Signature, Button } from "./email-layout"

interface ProjectInquiryEmailProps {
  recipientName: string
  projectName: string
  portfolioOwnerName: string
  portfolioOwnerPosition?: string
  portfolioWebsite?: string
  projectUrl?: string
}

export function ProjectInquiryEmail({
  recipientName,
  projectName,
  portfolioOwnerName,
  portfolioOwnerPosition = "Web Developer",
  portfolioWebsite = "https://yourportfolio.com",
  projectUrl = "https://yourportfolio.com/projects",
}: ProjectInquiryEmailProps) {
  return (
    <EmailLayout>
      <Heading>Thank You for Your Interest in {projectName}</Heading>

      <Paragraph>Hello {recipientName},</Paragraph>

      <Paragraph>
        Thank you for your interest in my project, <strong>{projectName}</strong>. I'm excited to discuss how this
        project might align with your needs.
      </Paragraph>

      <CalloutBox>
        <Paragraph>
          <strong>About this project:</strong>
        </Paragraph>
        <Paragraph>
          {projectName} was developed using modern technologies and best practices to create a seamless user experience.
          I'd be happy to discuss the technical details, development process, or potential customizations.
        </Paragraph>
      </CalloutBox>

      <Paragraph>
        I'll review your inquiry and get back to you within 1-2 business days with more information. In the meantime,
        you can find more details about this project on my portfolio.
      </Paragraph>

      <Button href={projectUrl}>View Project Details</Button>

      <Paragraph>
        If you have any specific questions or require immediate assistance, please don't hesitate to let me know.
      </Paragraph>

      <Signature name={portfolioOwnerName} position={portfolioOwnerPosition} website={portfolioWebsite} />
    </EmailLayout>
  )
}
