import dotenv from "dotenv";
import axios from "axios";

import { ISendEmail } from "./interface";
import { IContactUsUserInput } from "../contact_us/interface";
import { IParcelSendEmail } from "../parcel/interface";
import { IReachOutUserInput } from "../reach_out/interface";



dotenv.config();

const ZEPTO_TOKEN = process.env.ZEPTO_API_KEY;
const FROM_EMAIL = process.env.EMAILFROM;
const clientUrl = process.env.CLIENT_URL;
const API_URL = process.env.EMAIL_API_ENDPOINT;
const adminEmail = process.env.ADMIN_EMAIL ?? "";

// Generic function to send email via ZeptoMail API
export const sendEmail = async (input: ISendEmail) => {
  if (!ZEPTO_TOKEN || !FROM_EMAIL) {
    throw new Error("Missing ZeptoMail API key or FROM_EMAIL");
  }
  if (!API_URL) throw new Error("Missing EMAIL_API_ENDPOINT");

  try {
    const response = await axios.post(
      API_URL,
      {
        from: {
          address: FROM_EMAIL,
          name: "Kingsway Team",
        },
        to: [
          {
            email_address: {
              address: input.receiverEmail,
              name: input.receiverEmail || "",
            },
          },
        ],
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
  } catch (error: any) {
    console.error("❌ ZeptoMail API error:", error.response?.data || error.message);
    throw error;
  }
};

// Contact Us email to admin
export const sendContactUsEmailToAdmin = async (input: IContactUsUserInput) => {
  return sendEmail({
    receiverEmail: adminEmail,
    subject: "Customer Support",
    emailTemplate: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Customer Support | Kingsway Logistics</title>
<style>
  body { font-family: Arial, sans-serif; background: #f2f2f2; color: #333; line-height: 1.6; }
  .container { max-width: 600px; margin: 40px auto; background: #fff; padding: 20px; border-radius: 10px; }
  .header { text-align: center; background: #FE6C16; padding: 20px; border-radius: 10px 10px 0 0; color: #fff; }
  .header img { width: 150px; margin-bottom: 10px; }
  .content { padding: 20px; }
  .footer { text-align: center; background: #FE6C16; padding: 10px; border-radius: 0 0 10px 10px; color: #fff; }
  .highlight { font-weight: bold; color: #FE6C16; }
  ul { list-style: none; margin: 20px 0; padding: 0; border: 1px solid #FE6C16; border-radius: 8px; }
  li { padding: 12px 20px; border-bottom: 1px solid #ddd; }
  li:last-child { border-bottom: none; }
</style>
</head>
<body>
<div class="container">
  <div class="header">
    <img src="${clientUrl}/images/kingsway.png" alt="Kingsway Logistics Logo">
    <h1>Customer Support Request</h1>
  </div>
  <div class="content">
    <p style="font-size: 20px; font-weight: bold;">${input.name}</p>
    <p><span class="highlight">Issue Type:</span> ${input.issueType}</p>
    <p><span class="highlight">Email:</span> ${input.email}</p>
    <p><span class="highlight">Description:</span> ${input.description}</p>
  </div>
  <div class="footer">
    <p>&copy; ${new Date().getFullYear()} Kingsway Logistics. All rights reserved.</p>
  </div>
</div>
</body>
</html>`
  });
};

// Reach Out email to admin
export const sendReachOutEmailToAdmin = async (input: IReachOutUserInput) => {
  const now = new Date();
  const humanReadableDate = now.toLocaleString("en-US", {
    weekday: "long", year: "numeric", month: "long", day: "numeric"
  });

  return sendEmail({
    receiverEmail: adminEmail,
    subject: "Customer Support",
    emailTemplate: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Reach Out | Kingsway Logistics</title>
<style>
  body { font-family: Arial, sans-serif; background: #f2f2f2; color: #333; line-height: 1.6; }
  .container { max-width: 600px; margin: 40px auto; background: #fff; padding: 20px; border-radius: 10px; }
  .header { text-align: center; background: #FE6C16; padding: 20px; border-radius: 10px 10px 0 0; color: #fff; }
  .header img { width: 150px; margin-bottom: 10px; }
  .content { padding: 20px; }
  .footer { text-align: center; background: #FE6C16; padding: 10px; border-radius: 0 0 10px 10px; color: #fff; }
  .highlight { font-weight: bold; color: #FE6C16; }
  ul { list-style: none; margin: 20px 0; padding: 0; border: 1px solid #FE6C16; border-radius: 8px; }
  li { padding: 12px 20px; border-bottom: 1px solid #ddd; }
  li:last-child { border-bottom: none; }
</style>
</head>
<body>
<div class="container">
  <div class="header">
    <img src="${clientUrl}/images/kingsway.png">
    <h1>Need a hand</h1>
  </div>
  <div class="content">
    <p style="font-size: 20px; font-weight: bold;">${input.name}</p>
    <p><strong>Date:</strong> ${humanReadableDate}</p>
    <p><span class="highlight">Department:</span> ${input.departmentToEmail}</p>
    <p><span class="highlight">Email:</span> ${input.email}</p>
    <p><span class="highlight">Description:</span> ${input.description}</p>
  </div>
  <div class="footer">
    <p>&copy; ${new Date().getFullYear()} Kingsway Logistics. All rights reserved.</p>
  </div>
</div>
</body>
</html>`
  });
};

// Parcel message to sender or receiver
export const sendMessageToParcelReceiverOrSender = async (input: IParcelSendEmail) => {
  const now = new Date();
  const humanReadableDate = now.toLocaleString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" });

  return sendEmail({
    receiverEmail: input.isSender ? input.senderEmail : input.receiverEmail,
    subject: "Delivery Update",
    emailTemplate: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Delivery Update | Kingsway Logistics</title>
<style>
  body { font-family: Arial, sans-serif; background: #f2f2f2; color: #333; line-height: 1.6; }
  .container { max-width: 600px; margin: 0 auto; background: #fff; padding: 20px; border-radius: 10px; }
  .header { text-align: center; background: #FE6C16; padding: 20px; border-radius: 10px 10px 0 0; color: #fff; }
  .header img { width: 150px; margin-bottom: 10px; }
  .content { padding: 20px; }
  .footer { text-align: center; background: #FE6C16; padding: 10px; border-radius: 0 0 10px 10px; color: #fff; }
  .highlight { font-weight: bold; color: #FE6C16; }
  .tracking-link { color: #FE6C16; text-decoration: none; }
  .tracking-link:hover { text-decoration: underline; }
  .details-list { border: 1px solid #FE6C16; border-radius: 8px; padding: 15px; }
  .details-list li { padding: 8px 0; }
  .details-list span { font-weight: bold; color: #FE6C16; }
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
    <p><strong>Deposit Delivery Info:</strong> From ${input.senderLocation} to ${input.parcelsDesignation}</p>
    <ul>
      <li><a href="${clientUrl}/trackingdetail.html#${input.trackingId}" class="tracking-link">Track Your Parcel</a></li>
      <li><span class="highlight">Tracking ID:</span> ${input.trackingId}</li>
    </ul>
    <div class="details-list">
      <ul>
        <li><span>Name:</span> ${input.receiverName}</li>
        <li><span>Address:</span> ${input.parcelsDesignation}</li>
        <li><span>Email:</span> ${input.receiverEmail}</li>
        <li><span>Phone Number:</span> ${input.phoneNumber}</li>
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
