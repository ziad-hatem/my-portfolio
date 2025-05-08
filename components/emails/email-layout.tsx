import type { ReactNode } from "react"

interface EmailLayoutProps {
  children: ReactNode
  footerText?: string
}

export function EmailLayout({
  children,
  footerText = "This is an automatic response. Please do not reply to this email.",
}: EmailLayoutProps) {
  return (
    <div style={{ fontFamily: "Arial, sans-serif", maxWidth: "600px", margin: "0 auto" }}>
      <div style={{ padding: "20px", backgroundColor: "#f9f9f9" }}>{children}</div>

      <div
        style={{
          padding: "15px",
          backgroundColor: "#333",
          color: "#fff",
          textAlign: "center" as const,
          fontSize: "14px",
        }}
      >
        <p style={{ margin: "0" }}>{footerText}</p>
      </div>
    </div>
  )
}

export function Heading({ children }: { children: ReactNode }) {
  return <h1 style={{ color: "#333", fontSize: "24px", marginBottom: "20px" }}>{children}</h1>
}

export function Paragraph({ children }: { children: ReactNode }) {
  return <p style={{ fontSize: "16px", lineHeight: "1.5", color: "#555" }}>{children}</p>
}

export function CalloutBox({ children, color = "#4a90e2" }: { children: ReactNode; color?: string }) {
  return (
    <div style={{ margin: "30px 0", padding: "15px", backgroundColor: "#f0f0f0", borderLeft: `4px solid ${color}` }}>
      {children}
    </div>
  )
}

export function Signature({ name, position, website }: { name: string; position?: string; website?: string }) {
  return (
    <div style={{ marginTop: "30px" }}>
      <p style={{ fontSize: "16px", lineHeight: "1.5", color: "#555", margin: "0" }}>
        Best regards,
        <br />
        {name}
        {position && (
          <>
            <br />
            <span style={{ fontSize: "14px" }}>{position}</span>
          </>
        )}
      </p>
      {website && (
        <p style={{ fontSize: "14px", color: "#777", margin: "5px 0 0 0" }}>
          <a href={website} style={{ color: "#4a90e2", textDecoration: "none" }}>
            {website.replace(/^https?:\/\//, "")}
          </a>
        </p>
      )}
    </div>
  )
}

export function Button({ href, children }: { href: string; children: ReactNode }) {
  return (
    <div style={{ margin: "25px 0", textAlign: "center" as const }}>
      <a
        href={href}
        style={{
          backgroundColor: "#4a90e2",
          color: "#ffffff",
          padding: "12px 24px",
          borderRadius: "4px",
          textDecoration: "none",
          fontWeight: "bold",
          display: "inline-block",
        }}
      >
        {children}
      </a>
    </div>
  )
}
