"use strict";

import axios from "axios";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

const ZEPTO_TOKEN = process.env.ZEPTO_API_KEY;
const FROM_EMAIL = process.env.EMAILFROM;
const clientUrl = process.env.CLIENT_URL;
const API_URL = process.env.EMAIL_API_ENDPOINT;
const adminEmail = process.env.ADMIN_EMAIL ?? "";

// sendEmail function
export const sendEmail = async (input) => {
  try {
    if (!ZEPTO_TOKEN || !FROM_EMAIL) {
      throw new Error("Missing ZeptoMail environment variables");
    }

    const response = await axios.post(
      API_URL,
      {
        from: { address: FROM_EMAIL, name: "Kingsway Team" },
        to: [{ email_address: { address: input.receiverEmail, name: input.receiverName || "" } }],
        subject: input.subject,
        htmlbody: input.emailTemplate,
      },
      {
        headers: {
          Authorization: `Zoho-enczapikey ${ZEPTO_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("✅ Email sent via ZeptoMail API");
    return response.data;
  } catch (error) {
    console.error("❌ ZeptoMail API error:", error.response?.data || error.message);
    throw error;
  }
};

// sendContactUsEmailToAdmin
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
        /* ...all your CSS stays exactly the same... */
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
            <p><strong>Date:</strong> 11-12-2024 10:00:04</p>
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
</html>`
  });
};

// sendReachOutEmailToAdmin
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
      /* ...all your CSS stays exactly the same... */
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
</html>`
  });
};

// sendMessageToParcelReceiverOrSender
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
    /* ...all your CSS stays exactly the same... */
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
              <p>we received a freight deposit in your name. To proceed with the delivery of your package, we kindly request that you reconfirm your delivery details:</p>
              <p><strong>Below are your details to reconfirm:</strong></p>
              <ul class="details-list">
                  <li><span>Name:</span> ${input.receiverName}</li>
                  <li><span>Address:</span> ${input.parcelsDesignation}</li>
                  <li><span>Email:</span> ${input.receiverEmail}</li>
                  <li><span>Phone Number:</span> ${input.phoneNumber}</li>
              </ul>
              <p>Please send us a clear picture of a valid government-issued identity card to verify your identity and ensure a smooth delivery process.</p>
              <p>Thank you for your cooperation. We look forward to your prompt response.</p>
              <a href="#" class="button">Reconfirm Details</a>
              <p><strong>Best regards,</strong><br> Kingsway Logistics</p>
          </div>
      </div>
      <div class="footer">
          <p>&copy; 2024 Kingsway Logistics. All rights reserved.</p>
      </div>
  </div>
</body>
</html>`
  });
};
