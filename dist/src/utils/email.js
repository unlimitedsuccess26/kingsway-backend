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
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendContactUsEmailToAdmin = exports.sendEmail = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const nodemailer_1 = __importDefault(require("nodemailer"));
dotenv_1.default.config();
const smtpSender = process.env.EMAILSENDER;
const smtpPassword = process.env.EMAILSENDERPASSWORD;
const smtpEmailFrom = process.env.EMAILFROM;
const adminEmail = "tceeservices@gmail.com";
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
        console.error('Email sending error:', error);
        // throw error;
    }
});
exports.sendEmail = sendEmail;
const sendContactUsEmailToAdmin = (input) => __awaiter(void 0, void 0, void 0, function* () {
    return (0, exports.sendEmail)({
        receiverEmail: adminEmail,
        subject: "Customer Support",
        emailTemplate: `<!DOCTYPE html>
<html>
<head>
	<title>Delivery Update | {Company Name}</title>
	<style>
		body {
			font-family: Arial, sans-serif;
			margin: 0;
			padding: 0;
			background-color: #f2f2f2;
		}
		.container {
			max-width: 600px;
			margin: 40px auto;
			background-color: #fff;
			padding: 20px;
			border: 1px solid #ddd;
			border-radius: 10px;
			box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
		}
		.header {
			color: #fff;
			padding: 10px;
			border-radius: 10px 10px 0 0;
		}
		.footer {
			background-color: #FE6C16;
			color: #fff;
			padding: 10px;
			border-radius: 0 0 10px 10px;
			text-align: center;
		}
		ul{
			padding: 0;
			margin: 0;
			padding: 10px;
            border: 1px solid #FE6C16;
            width: 90%;
            margin: auto;
		}
		li{
			font-size: 18px;
			padding-bottom: 8px;
			list-style: none;
			padding-left: 0;
			margin-left: 0;
		}
		span{
			font-weight: bold;
		}
        p{
            padding-bottom: 10px;
        }
        li{
            padding-bottom: 10px;
        }
	</style>
</head>
<body>
	<div class="container">
		<div class="header">
			<img src="https://kingways-logistics.vercel.app/images/Logo2.svg" alt="" style="width: 150px;">
		</div>
		<div style="padding: 20px;">
			<p style="font-size: 24px; font-weight: bold;">kelvin smith</p>
			<p>date: 11-12-2024 10:00:04</p>
			<p style="font-size: 16px; line-height: 1.5"><span>Description:</span> ${input.description} </p>
			<div style="background-color: #f9f9f9; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
				<ul>
					<li><span>Name:</span> ${input.name}</li>
					<li><span>Issue Type:</span> ${input.issueType}</li>
					<li><span>Email:</span> ${input.email}</li>
				</ul>
            </div>
		</div>
		<div class="footer">
			<p style="color: #fff;">&copy; ${new Date().getFullYear()} Kingsway logistics. All rights reserved.</p>
		</div>
	</div>
</body>
</html>`,
    });
});
exports.sendContactUsEmailToAdmin = sendContactUsEmailToAdmin;
