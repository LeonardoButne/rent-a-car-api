"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendEmailAdapter = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
class SendEmailAdapter {
    send(subject, email, user, pass, body) {
        const transporter = nodemailer_1.default.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            secure: false,
            auth: {
                user,
                pass,
            }
        });
        transporter.verify((error, success) => {
            if (error) {
                console.log(error);
            }
            else {
                console.log(`Email ${user} conected:`, success);
            }
        });
        const mail = {
            from: user,
            to: email,
            subject,
            html: body,
        };
        transporter.sendMail(mail, (err, info) => {
            if (err) {
                console.log(err);
            }
            console.log(info);
            console.log("Preview URL:", nodemailer_1.default.getTestMessageUrl(info));
        });
    }
}
exports.SendEmailAdapter = SendEmailAdapter;
//# sourceMappingURL=send-email.js.map