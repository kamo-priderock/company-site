import {
  SendSmtpEmail,
  TransactionalEmailsApi,
  TransactionalEmailsApiApiKeys,
} from "@getbrevo/brevo";

// Get environment variables
const BREVO_API_KEY = process.env.BREVO_API_KEY || "";
const BREVO_FROM_EMAIL = process.env.BREVO_FROM_EMAIL || "noreply@modernspaces.co.za";
const BREVO_FROM_NAME = process.env.BREVO_FROM_NAME || "Pride Rock";

// Initialize Brevo API client
let apiInstance: TransactionalEmailsApi | null = null;

if (BREVO_API_KEY) {
  apiInstance = new TransactionalEmailsApi();
  apiInstance.setApiKey(TransactionalEmailsApiApiKeys.apiKey, BREVO_API_KEY);
} else {
  console.warn("BREVO_API_KEY is not configured. Email sending will fail.");
}

export async function sendMail(to: string, subject: string, text: string, html: string) {
  try {
    if (!apiInstance) {
      throw new Error(
        "Brevo API client is not initialized. Please set BREVO_API_KEY in your environment variables."
      );
    }

    if (!BREVO_API_KEY) {
      throw new Error(
        "BREVO_API_KEY is not configured. Please set it in your environment variables."
      );
    }

    const sendSmtpEmail = new SendSmtpEmail();
    sendSmtpEmail.subject = subject;
    sendSmtpEmail.htmlContent = html;
    sendSmtpEmail.textContent = text;
    sendSmtpEmail.sender = {
      name: BREVO_FROM_NAME,
      email: BREVO_FROM_EMAIL,
    };
    sendSmtpEmail.to = [{ email: to }];

    console.info(`Sending email to: ${to}`);
    const result = await apiInstance.sendTransacEmail(sendSmtpEmail);
    const messageId = result.body?.messageId || "unknown";
    console.info(`✅ Email sent successfully. Message ID: ${messageId}`);
    return result;
  } catch (error) {
    console.error("❌ Error sending email:", error);
    throw error;
  }
}
