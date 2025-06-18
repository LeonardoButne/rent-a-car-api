import { SendEmail } from "../../apresentation/protocols/send-email"

import nodemailer from 'nodemailer'
import type SMTPTransport from 'nodemailer/lib/smtp-transport'


export class SendEmailAdapter implements SendEmail {
    send(
        subject: string,
        email: string,
        user: string,
        pass: string,
        body?: string,
    ): void {
        const transporter = nodemailer.createTransport({
            host: 'smtp.zoho.com',
            // host: 'depro11.fcomet.com',
            port: 465,
            secure: true,
            auth: {
                user,
                pass,
            },
            tls: {
                rejectUnauthorized: false
            }
        } as SMTPTransport.Options)

        transporter.verify((error: Error, success: boolean) => {
            if (error) {
                console.log(error)
            } else {
                console.log(`Email ${user} conected:`, success)
            }
        })

        const mail = {
            from: user,
            to: email,
            subject,
            html: body,
        }

        transporter.sendMail(mail, (err: Error, info: any) => {
            if (err) {
                console.log(err)
            }
            console.log(info)
        })
    }
}
