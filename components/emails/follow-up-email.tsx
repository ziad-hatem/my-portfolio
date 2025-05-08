import { EmailLayout, Heading, Paragraph, CalloutBox, Signature, Button } from "./email-layout"

interface FollowUpEmailProps {
  recipientName: string
  originalSubject: string
  meetingDate?: string
  portfolioOwnerName: string
  portfolioOwnerPosition?: string
  portfolioWebsite?: string
  calendarUrl?: string
}

export function FollowUpEmail({
  recipientName,
  originalSubject,
  meetingDate = "our recent conversation",
  portfolioOwnerName,
  portfolioOwnerPosition = "Web Developer",
  portfolioWebsite = "https://yourportfolio.com",
  calendarUrl = "https://calendly.com/yourname",
}: FollowUpEmailProps) {
  return (
    <EmailLayout footerText="This is a personal follow-up to our conversation.">
      <Heading>Following Up: {originalSubject}</Heading>

      <Paragraph>Hello {recipientName},</Paragraph>

      <Paragraph>
        I hope this email finds you well. I wanted to follow up on {meetingDate} regarding {originalSubject}.
      </Paragraph>

      <CalloutBox color="#f57c00">
        <Paragraph>
          <strong>Key points from our discussion:</strong>
        </Paragraph>
        <Paragraph>
          • We discussed potential collaboration opportunities
          <br />• You expressed interest in [specific aspect]
          <br />• We agreed to reconnect to discuss next steps
        </Paragraph>
      </CalloutBox>

      <Paragraph>
        I'm excited about the possibility of working together and would love to continue our conversation. Would you be
        available for a follow-up call this week to discuss further details?
      </Paragraph>

      <Button href={calendarUrl}>Schedule a Call</Button>

      <Paragraph>
        If you have any questions or need additional information before our next conversation, please don't hesitate to
        let me know.
      </Paragraph>

      <Signature name={portfolioOwnerName} position={portfolioOwnerPosition} website={portfolioWebsite} />
    </EmailLayout>
  )
}
