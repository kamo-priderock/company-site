"use server";

import { sendMail } from "@/utilities/email";

export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  enquiryType: string;
  message: string;
}

export async function submitContactForm(data: ContactFormData) {
  try {
    // Validate required fields
    if (!data.firstName || !data.lastName || !data.email || !data.phone || !data.enquiryType || !data.message) {
      return {
        success: false,
        error: "All fields are required"
      };
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return {
        success: false,
        error: "Invalid email address"
      };
    }

    // Create email HTML content
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #f9fafb;
            }
            .header {
              background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
              color: white;
              padding: 30px;
              text-align: center;
              border-radius: 8px 8px 0 0;
            }
            .content {
              background: white;
              padding: 30px;
              border-radius: 0 0 8px 8px;
            }
            .field {
              margin-bottom: 20px;
            }
            .label {
              font-weight: bold;
              color: #1e293b;
              display: block;
              margin-bottom: 5px;
            }
            .value {
              color: #475569;
              padding: 10px;
              background-color: #f1f5f9;
              border-radius: 4px;
              border-left: 3px solid #f59e0b;
            }
            .footer {
              text-align: center;
              margin-top: 20px;
              padding-top: 20px;
              border-top: 1px solid #e2e8f0;
              color: #64748b;
              font-size: 12px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0; font-size: 24px;">New Contact Form Submission</h1>
              <p style="margin: 10px 0 0 0; opacity: 0.9;">Pride rock property group</p>
            </div>
            <div class="content">
              <div class="field">
                <span class="label">Name:</span>
                <div class="value">${data.firstName} ${data.lastName}</div>
              </div>
              
              <div class="field">
                <span class="label">Email:</span>
                <div class="value"><a href="mailto:${data.email}" style="color: #f59e0b; text-decoration: none;">${data.email}</a></div>
              </div>
              
              <div class="field">
                <span class="label">Phone:</span>
                <div class="value"><a href="tel:${data.phone}" style="color: #f59e0b; text-decoration: none;">${data.phone}</a></div>
              </div>
              
              <div class="field">
                <span class="label">Enquiry Type:</span>
                <div class="value">${data.enquiryType}</div>
              </div>
              
              <div class="field">
                <span class="label">Message:</span>
                <div class="value" style="white-space: pre-wrap;">${data.message}</div>
              </div>
              
              <div class="footer">
                <p>This email was sent from the Pride rock property group contact form</p>
                <p>Received on ${new Date().toLocaleString('en-ZA', { timeZone: 'Africa/Johannesburg' })}</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    // Create plain text version
    const textContent = `
New Contact Form Submission - Pride rock property group

Name: ${data.firstName} ${data.lastName}
Email: ${data.email}
Phone: ${data.phone}
Enquiry Type: ${data.enquiryType}

Message:
${data.message}

---
Received on ${new Date().toLocaleString('en-ZA', { timeZone: 'Africa/Johannesburg' })}
    `;

    // Send email to company
    const companyEmail = process.env.BREVO_FROM_EMAIL || "kwanelendaba69@gmail.com";
    await sendMail(
      companyEmail,
      `New Contact Form: ${data.enquiryType} - ${data.firstName} ${data.lastName}`,
      textContent,
      htmlContent
    );

    // Send confirmation email to user
    const confirmationHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #f9fafb;
            }
            .header {
              background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
              color: white;
              padding: 30px;
              text-align: center;
              border-radius: 8px 8px 0 0;
            }
            .content {
              background: white;
              padding: 30px;
              border-radius: 0 0 8px 8px;
            }
            .footer {
              text-align: center;
              margin-top: 20px;
              padding-top: 20px;
              border-top: 1px solid #e2e8f0;
              color: #64748b;
              font-size: 12px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0; font-size: 24px;">Thank You for Contacting Us</h1>
              <p style="margin: 10px 0 0 0; opacity: 0.9;">Pride Rock Property Group</p>
            </div>
            <div class="content">
              <p>Dear ${data.firstName},</p>
              
              <p>Thank you for reaching out to Pride Rock Property Group. We have received your enquiry regarding <strong>${data.enquiryType}</strong>.</p>
              
              <p>Our team will review your message and get back to you within 24-48 hours during business days.</p>
              
              <p><strong>Your enquiry details:</strong></p>
              <ul style="background-color: #f1f5f9; padding: 20px; border-left: 3px solid #f59e0b; border-radius: 4px;">
                <li><strong>Name:</strong> ${data.firstName} ${data.lastName}</li>
                <li><strong>Email:</strong> ${data.email}</li>
                <li><strong>Phone:</strong> ${data.phone}</li>
                <li><strong>Enquiry Type:</strong> ${data.enquiryType}</li>
              </ul>
              
              <p>In the meantime, feel free to explore our website to learn more about our projects and services.</p>
              
              <p>Best regards,<br>
              <strong> Pride Rock Property Group Team</strong></p>
              
              <div class="footer">
                <p><strong>Contact Us:</strong></p>
                <p>Phone: 021 141 2370 | Email: info@priderockpropertygroup.co.za</p>
                <p style="margin-top: 10px;">&copy; ${new Date().getFullYear()} Pride Rock Property Group. All rights reserved.</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    const confirmationText = `
Dear ${data.firstName},

Thank you for reaching out to Pride Rock Property Group. We have received your enquiry regarding ${data.enquiryType}.

Our team will review your message and get back to you within 24-48 hours during business days.

Your enquiry details:
- Name: ${data.firstName} ${data.lastName}
- Email: ${data.email}
- Phone: ${data.phone}
- Enquiry Type: ${data.enquiryType}

In the meantime, feel free to explore our website to learn more about our projects and services.

Best regards,
Pride Rock Property Group

Contact Us:
Phone: 021 141 2370
Email: info@priderockpropertygroup.co.za

© ${new Date().getFullYear()} Pride Rock Property Group. All rights reserved.
    `;

    await sendMail(
      data.email,
      "Thank you for contacting Pride Rock Property Group",
      confirmationText,
      confirmationHtml
    );

    return {
      success: true,
      message: "Your message has been sent successfully! We'll get back to you soon."
    };

  } catch (error) {
    console.error("Contact form error:", error);
    return {
      success: false,
      error: "Failed to send your message. Please try again or contact us directly."
    };
  }
}
