"use strict";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const smtpSender = process.env.EMAILSENDER;
const smtpPassword = process.env.EMAILSENDERPASSWORD;
const smtpEmailFrom = process.env.EMAILFROM;
const clientUrl = process.env.CLIENT_URL;
const adminEmail = process.env.ADMIN_EMAIL ?? "";

// --------------------------------------------------
// Core sendEmail function using Axios API
// --------------------------------------------------
export const sendEmail = async (input) => {
  try {
    console.log("Sending email via API to:", input.receiverEmail);

    const response = await axios.post(
      process.env.EMAIL_API_ENDPOINT || "https://kingsway-backend-1.onrender.com/send-email",
      {
        from: `"Kingsway Team" <${smtpEmailFrom}>`,
        to: input.receiverEmail,
        subject: input.subject,
        html: input.emailTemplate,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.EMAIL_API_KEY || ""}`,
        },
      },
    );

    console.log("Email sent successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Email sending error:",
      error.response?.data || error.message,
    );
    throw error;
  }
};

// --------------------------------------------------
// Contact Us email to admin
// --------------------------------------------------
export const sendContactUsEmailToAdmin = async (input) => {
  return sendEmail({
    receiverEmail: adminEmail,
    subject: "Customer Support",
    emailTemplate: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Delivery Update | Kingsway Logistics</title>
<style>
/* ... your existing styles ... */
</style>
</head>
<body>
<div class="container">
  <div class="header">
      <img src="${clientUrl}/images/kingsway.png" alt="Kingsway Logistics Logo">
      <h1>Delivery Update</h1>
  </div>
  <div class="content">
      <p style="font-size: 24px; font-weight: bold;">${input.name}</p>
      <p><strong>Date:</strong> 11-12-2026 10:00:04</p>
      <p style="font-size: 16px; line-height: 1.5"><span class="highlight">Description:</span> ${input.description}</p>
      <div style="background-color: #f9f9f9; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
          <ul>
              <li><span class="highlight">Name:</span> ${input.name}</li>
              <li><span class="highlight">Issue Type:</span> ${input.issueType}</li>
              <li><span class="highlight">Email:</span> ${input.email}</li>
          </ul>
      </div>
  </div>
  <div class="footer">
      <p>&copy; ${new Date().getFullYear()} Kingsway Logistics. All rights reserved.</p>
  </div>
</div>
</body>
</html>`,
  });
};

// --------------------------------------------------
// Reach Out email to admin
// --------------------------------------------------
export const sendReachOutEmailToAdmin = async (input) => {
  const now = new Date();
  const humanReadableDate = now.toLocaleString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return sendEmail({
    receiverEmail: adminEmail,
    subject: "Customer Support",
    emailTemplate: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Delivery Update | Kingsway Logistics</title>
<style>
/* ... your existing styles ... */
</style>
</head>
<body>
<div class="container">
  <div class="header">
      <img src="${clientUrl}/images/kingsway.png">
      <h1>Need a hand</h1>
  </div>
  <div class="content">
      <p style="font-size: 24px; font-weight: bold;">${input.name}</p>
      <p><strong>Date:</strong> ${humanReadableDate}</p>
      <p style="font-size: 16px; line-height: 1.5"><span class="highlight">Description:</span> ${input.description}</p>
      <div style="background-color: #f9f9f9; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
          <ul>
              <li><span class="highlight">Name:</span> ${input.name}</li>
              <li><span class="highlight">Department:</span> ${input.departmentToEmail}</li>
              <li><span class="highlight">Email:</span> ${input.email}</li>
          </ul>
      </div>
  </div>
  <div class="footer">
      <p>&copy; ${new Date().getFullYear()} Kingsway Logistics. All rights reserved.</p>
  </div>
</div>
</body>
</html>`,
  });
};

// --------------------------------------------------
// Parcel email to sender/receiver
// --------------------------------------------------
export const sendMessageToParcelReceiverOrSender = async (input) => {
  const now = new Date();
  const humanReadableDate = now.toLocaleString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return sendEmail({
    receiverEmail: input.isSender ? input.senderEmail : input.receiverEmail,
    subject: "Customer Support",
    emailTemplate: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Delivery Update | Kingsway Logistics</title>
<style>
/* ... your existing styles ... */
</style>
</head>
<body>
<div class="container">
  <div class="header">
      <img src="${clientUrl}/images/kingsway.png" alt="Kingsway Logistics Logo">
      <h1>Delivery Update</h1>
  </div>
  <div class="content">
      <p>Dear ${input.receiverName},</p>
      <p><strong>Date:</strong> ${humanReadableDate}</p>
      <p><strong>Deposit Delivery Information:</strong> From ${input.senderLocation} to ${input.parcelsDesignation}.</p>
      <p>Click on the link or copy the tracking ID below to track your parcel:</p>
      <ul>
          <li><a href="${clientUrl}/trackingdetail.html#${input.trackingId}" class="tracking-link">Track Your Parcel</a></li>
          <li><span class="highlight">Tracking ID:</span> ${input.trackingId}</li>
      </ul>
      <div class="identity-card-info">
          <p>We received a freight deposit in your name. To proceed with the delivery of your package, we kindly request that you reconfirm your delivery details:</p>
          <ul class="details-list">
              <li><span>Name:</span> ${input.receiverName}</li>
              <li><span>Address:</span> ${input.parcelsDesignation}</li>
              <li><span>Email:</span> ${input.receiverEmail}</li>
              <li><span>Phone Number:</span> ${input.phoneNumber}</li>
          </ul>
          <a href="#" class="button">Reconfirm Details</a>
          <p><strong>Best regards,</strong><br> Kingsway Logistics</p>
      </div>
  </div>
  <div class="footer">
      <p>&copy; 2026 Kingsway Logistics. All rights reserved.</p>
  </div>
</div>
</body>
</html>`,
  });
};
