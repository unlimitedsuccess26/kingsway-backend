"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMessageToParcelReceiver = exports.sendContactUsEmailToAdmin = exports.sendEmail = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const nodemailer_1 = __importDefault(require("nodemailer"));
dotenv_1.default.config();
const smtpSender = process.env.EMAILSENDER;
const smtpPassword = process.env.EMAILSENDERPASSWORD;
const smtpEmailFrom = process.env.EMAILFROM;
const clientUrl = process.env.EMAILFROM;
const adminEmail = (_a = process.env.ADMIN_EMAIL) !== null && _a !== void 0 ? _a : "";
dotenv_1.default.config();
const sendEmail = (input) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const transporter = nodemailer.createTransport({
        //   host: 'smtp-relay.sendinblue.com',
        //   port: 587,
        //   secure: false,
        //   auth: {
        //     user: smtpSender,
        //     pass: smtpPassword,
        //   },
        // });
        // const mailOptions = {
        //   from: `Kingsway <${smtpEmailFrom}>`,
        //   to: input.receiverEmail,
        //   subject: input.subject,
        //   html: input.emailTemplate,
        // };
        const transporter = nodemailer_1.default.createTransport({
            service: "gmail",
            auth: {
                user: smtpSender,
                pass: smtpPassword,
            },
        });
        const mailOptions = {
            from: `Kingsway <${smtpEmailFrom}>`,
            to: input.receiverEmail,
            subject: input.subject,
            html: input.emailTemplate,
        };
        const info = yield transporter.sendMail(mailOptions);
        return info.response;
    }
    catch (error) {
        console.error("Email sending error:", error);
        // throw error;
    }
});
exports.sendEmail = sendEmail;
const sendContactUsEmailToAdmin = (input) => __awaiter(void 0, void 0, void 0, function* () {
    return (0, exports.sendEmail)({
        receiverEmail: adminEmail,
        subject: "Customer Support",
        emailTemplate: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Delivery Update | Kingsway Logistics</title>
    <style>
        /* Global Reset */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: Arial, sans-serif;
            background-color: #f2f2f2;
            color: #333;
            line-height: 1.6;
        }

        .container {
            max-width: 600px;
            margin: 40px auto;
            background-color: #fff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            height: auto;
            box-sizing: border-box;
        }

        .header {
            text-align: center;
            background-color: #FE6C16;
            padding: 20px;
            border-radius: 10px 10px 0 0;
            color: #fff;
        }

        .header img {
            width: 150px;
            margin-bottom: 10px;
        }

        .content {
            padding: 20px;
            color: #333;
        }

        .footer {
            text-align: center;
            background-color: #FE6C16;
            padding: 10px;
            border-radius: 0 0 10px 10px;
            color: #fff;
        }

        h1, h2, h3 {
            color: #333;
        }

        p {
            font-size: 16px;
            margin-bottom: 15px;
        }

        .highlight {
            font-weight: bold;
            color: #FE6C16;
        }

        ul {
            list-style: none;
            margin: 20px 0;
            padding: 0;
            border: 1px solid #FE6C16;
            border-radius: 8px;
        }

        li {
            font-size: 16px;
            padding: 12px 20px;
            border-bottom: 1px solid #ddd;
        }

        li:last-child {
            border-bottom: none;
        }

        .button {
            display: inline-block;
            background-color: #FE6C16;
            color: white;
            padding: 12px 25px;
            border-radius: 5px;
            text-decoration: none;
            font-weight: bold;
            text-align: center;
            margin-top: 20px;
        }

        .button:hover {
            background-color: #e0561a;
        }

        /* Responsive Styles */
        @media (max-width: 600px) {
            .container {
                padding: 15px;
            }

            .header img {
                width: 120px;
            }

            .footer {
                font-size: 14px;
            }

            .button {
                font-size: 14px;
                padding: 10px 20px;
            }
        }
    </style>
</head>
<body>

    <div class="container">
        <div class="header">
            <img src="https://kingways-logistics.vercel.app/images/kingswaylogo.svg" alt="Kingsway Logistics Logo">
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
</html>
	`,
    });
});
exports.sendContactUsEmailToAdmin = sendContactUsEmailToAdmin;
const sendMessageToParcelReceiver = (input) => __awaiter(void 0, void 0, void 0, function* () {
    return (0, exports.sendEmail)({
        receiverEmail: input.receiverEmail,
        subject: "Customer Support",
        emailTemplate: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Parcel Information | Kingsway Logistics</title>
  <style>
    /* Global Reset */
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: Arial, sans-serif;
      background-color: #f2f2f2;
      color: #333;
      line-height: 1.6;
    }

    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .header {
      text-align: center;
      background-color: #FE6C16;
      padding: 20px;
      border-radius: 10px 10px 0 0;
      color: #fff;
    }

    .header img {
      width: 150px;
      margin-bottom: 10px;
    }

    .content {
      padding: 20px;
    }

    .footer {
      text-align: center;
      background-color: #FE6C16;
      padding: 10px;
      border-radius: 0 0 10px 10px;
      color: #fff;
    }

    h1, h2, h3 {
      color: #333;
    }

    p {
      font-size: 14px;
      margin-bottom: 15px;
    }

    ul {
      list-style: none;
      margin: 20px 0;
      padding: 0;
    }

    li {
      font-size: 14px;
      padding-bottom: 8px;
    }

    .highlight {
      font-weight: bold;
      color: #FE6C16;
    }

    .tracking-link {
      color: #FE6C16;
      text-decoration: none;
    }

    .tracking-link:hover {
      text-decoration: underline;
    }

    .details-list {
      border: 1px solid #FE6C16;
      border-radius: 8px;
      padding: 15px;
    }

    .details-list li {
      padding: 8px 0;
    }

    .details-list span {
      font-weight: bold;
      color: #FE6C16;
    }

    .identity-card-info {
      background-color: #f9f9f9;
      border: 1px solid #ddd;
      padding: 20px;
      border-radius: 8px;
    }

    .identity-card-info p {
      font-size: 16px;
      color: #333;
    }

    .button {
      display: inline-block;
      background-color: #FE6C16;
      color: white;
      padding: 12px 25px;
      border-radius: 5px;
      text-decoration: none;
      font-weight: bold;
      text-align: center;
      margin-top: 20px;
    }

    .button:hover {
      background-color: #e0561a;
    }

    /* Responsive Styles */
    @media (max-width: 600px) {
      .container {
        padding: 10px;
      }

      .header img {
        width: 120px;
      }

      .footer {
        font-size: 12px;
      }

      .tracking-link, .button {
        font-size: 14px;
      }
    }

  </style>
</head>
<body>

  <div class="container">
    <div class="header">
      <img src="${clientUrl}/images/kingswaylogo.svg" alt="Kingsway Logistics Logo">
      <h1>Delivery Update</h1>
    </div>

    <div class="content">
      <p>Dear Kelvin,</p>
      <p><strong>Date:</strong> 11-12-2024 10:00:04</p>
      <p><strong>Deposit Delivery Information:</strong> From United Kingdom to 1173 Limer Street, Australia.</p>

      <p>Click on the link or copy the tracking ID below to track your parcel:</p>

      <ul>
        <li><a href="${clientUrl}/trackingdetail.html#${input.trackingId}" class="tracking-link">Track Your Parcel</a></li>
        <li><span class="highlight">Tracking ID:</span> ${input.trackingId}</li>
      </ul>

      <div class="identity-card-info">
        <p>We hope this message finds you well. To proceed with the delivery of your package, we kindly request that you reconfirm your delivery details:</p>
        <p><strong>Below are your details to reconfirm:</strong></p>

        <ul class="details-list">
          <li><span>Name:</span> ${input.receiverName}</li>
          <li><span>Address:</span> ${input.parcelsDesignation}</li>
          <li><span>Email:</span> ${input.receiverEmail}</li>
          <li><span>Phone number:</span> ${input.phoneNumber}</li>
        </ul>

        <p>Please send us a clear picture of a valid government-issued identity card to verify your identity and ensure a smooth delivery process.</p>
        <p>Thank you for your cooperation. We look forward to your prompt response.</p>

   

        <p><strong>Best regards,</strong><br> Kingsway Logistics</p>
      </div>
    </div>

    <div class="footer">
      <p>&copy; 2024 Kingsway Logistics. All rights reserved.</p>
    </div>
  </div>

</body>
</html>`,
    });
});
exports.sendMessageToParcelReceiver = sendMessageToParcelReceiver;
