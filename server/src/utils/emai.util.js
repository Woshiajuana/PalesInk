import nodemailer                   from 'nodemailer'
import nodemailer_smtp_transport    from 'nodemailer-smtp-transport'
import config                       from './../config/email.config'

const nodemailer_smtp = nodemailer.createTransport(nodemailer_smtp_transport({
    host: "smtp.mxhichina.com", // 主机
    secureConnection: true, // 使用 SSL
    port: 465, // SMTP 端口
    auth: {
        user: config.email.user,
        pass: config.email.pass
    }
}));

export default {
    // recipient 收件人
    // subject 发送的主题
    // html 发送的html内容
    send: async (recipient, subject, html) => new Promise((resolve, reject) => {
        nodemailer_smtp.sendMail({
            from: config.email.user,
            to: recipient,
            subject: subject,
            html: html
        }, (err, res) => {
            return err ? reject(err) : resolve(res);
        });
    })
}