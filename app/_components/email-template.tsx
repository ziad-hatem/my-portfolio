import * as React from "react";

interface EmailTemplateProps {
  message: string;
  sender: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  message,
  sender,
}) => (
  <div>
    <h1>Welcome, Ziad Hatem!</h1>
    <h2>This Message From: {sender}</h2>
    <p>{message}</p>
  </div>
);
