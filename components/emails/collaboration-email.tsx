import { EmailLayout, Heading, Paragraph, CalloutBox, Signature, Button } from "./email-layout"

interface CollaborationEmailProps {
  recipientName: string
  projectType?: string
  portfolioOwnerName: string
  portfolioOwnerPosition?: string
  portfolioWebsite?: string
  projectsUrl?: string
}

export function CollaborationEmail({
  recipientName,
  projectType = "this project",
  portfolioOwnerName,
  portfolioOwnerPosition = "Web Developer",
  portfolioWebsite = "https://yourportfolio.com",
  projectsUrl = "https://yourportfolio.com/projects",
}: CollaborationEmailProps) {
  return (
    <EmailLayout>
      <Heading>Excited About Potential Collaboration</Heading>

      <Paragraph>Hello {recipientName},</Paragraph>

      <Paragraph>
        Thank you for reaching out about collaborating on {projectType}. I'm always interested in connecting with other
        professionals and exploring new opportunities to create something amazing together.
      </Paragraph>

      <CalloutBox color="#9c27b0">
        <Paragraph>
          <strong>Collaboration process:</strong>
        </Paragraph>
        <Paragraph>
          I believe the best collaborations start with a clear understanding of goals, expectations, and timelines. I'd
          love to schedule a call to discuss your ideas in more detail and see how we might work together effectively.
        </Paragraph>
      </CalloutBox>

      <Paragraph>
        You might be interested in reviewing some of my previous collaborative projects to get a better sense of my work
        style and capabilities.
      </Paragraph>

      <Button href={projectsUrl}>View My Projects</Button>

      <Paragraph>
        I'll follow up within 1-2 business days to discuss next steps. In the meantime, if you have any specific details
        about the project you'd like to share, please feel free to send them my way.
      </Paragraph>

      <Signature name={portfolioOwnerName} position={portfolioOwnerPosition} website={portfolioWebsite} />
    </EmailLayout>
  )
}
