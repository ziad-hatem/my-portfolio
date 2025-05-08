interface ContactFormEmailProps {
  name: string
  email: string
  phoneNumber: string
  message: string
}

export function ContactFormEmail({ name, email, phoneNumber, message }: ContactFormEmailProps) {
  return (
    <div>
      <h1>New Contact Form Submission</h1>
      <p>You have received a new message from your portfolio contact form.</p>

      <div style={{ margin: "24px 0", padding: "16px", borderLeft: "4px solid #333", backgroundColor: "#f7f7f7" }}>
        <h2>Contact Details</h2>
        <p>
          <strong>Name:</strong> {name}
        </p>
        <p>
          <strong>Email:</strong> {email}
        </p>
        <p>
          <strong>Phone:</strong> {phoneNumber}
        </p>

        <h3>Message:</h3>
        <p>{message}</p>
      </div>

      <p>You can reply directly to this email to respond to {name}.</p>
    </div>
  )
}
