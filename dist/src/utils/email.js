import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const smtpEmailFrom = process.env.EMAILFROM;
const clientUrl = process.env.CLIENT_URL;
const adminEmail = process.env.ADMIN_EMAIL || "";

// Core sendEmail function
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
      }
    );

    console.log("Email sent successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Email sending error:", error.response?.data || error.message);
    throw error;
  }
};

// Contact Us email to admin
export const sendContactUsEmailToAdmin = async (input) => {
  return sendEmail({
    receiverEmail: adminEmail,
    subject: "Customer Support",
    emailTemplate: `
      <html>
        <body>
          <h1>Contact Request</h1>
          <p>Name: ${input.name}</p>
          <p>Email: ${input.email}</p>
          <p>Issue Type: ${input.issueType}</p>
          <p>Description: ${input.description}</p>
          <footer>&copy; ${new Date().getFullYear()} Kingsway Logistics</footer>
        </body>
      </html>
    `,
  });
};

// Reach Out email to admin
export const sendReachOutEmailToAdmin = async (input) => {
  const now = new Date();
  const humanReadableDate = now.toLocaleString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" });

  return sendEmail({
    receiverEmail: adminEmail,
    subject: "Customer Support",
    emailTemplate: `
      <html>
        <body>
          <h1>Need a hand</h1>
          <p>Name: ${input.name}</p>
          <p>Email: ${input.email}</p>
          <p>Department: ${input.departmentToEmail}</p>
          <p>Description: ${input.description}</p>
          <p>Date: ${humanReadableDate}</p>
          <footer>&copy; ${new Date().getFullYear()} Kingsway Logistics</footer>
        </body>
      </html>
    `,
  });
};

// Parcel email to sender/receiver
export const sendMessageToParcelReceiverOrSender = async (input) => {
  const now = new Date();
  const humanReadableDate = now.toLocaleString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" });

  const receiverEmail = input.isSender ? input.senderEmail : input.receiverEmail;

  return sendEmail({
    receiverEmail,
    subject: "Parcel Delivery Update",
    emailTemplate: `
      <html>
        <body>
          <h1>Delivery Update</h1>
          <p>Dear ${input.receiverName},</p>
          <p>Date: ${humanReadableDate}</p>
          <p>Deposit Delivery Info: From ${input.senderLocation} to ${input.parcelsDesignation}</p>
          <p>Track your parcel: <a href="${clientUrl}/trackingdetail.html#${input.trackingId}">Click here</a></p>
          <p>Tracking ID: ${input.trackingId}</p>
          <h3>Delivery Details Confirmation</h3>
          <ul>
            <li>Name: ${input.receiverName}</li>
            <li>Address: ${input.parcelsDesignation}</li>
            <li>Email: ${input.receiverEmail}</li>
            <li>Phone: ${input.phoneNumber}</li>
          </ul>
          <p>Please reconfirm your details to proceed with delivery.</p>
          <footer>&copy; ${new Date().getFullYear()} Kingsway Logistics</footer>
        </body>
      </html>
    `,
  });
};
