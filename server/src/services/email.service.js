
import fs                           from 'fs'
import path                         from 'path'
import emailUtil                    from './../utils/emai.util'
import emailConfig                  from './../config/email.config'
import wowCool                      from './../wow-cool'


class EmailService {

    // 发送验证码
    async send (recipient) {
        return new Promise( async (resolve, reject) => {
            fs.readFile(path.join(__dirname, '../views/email.html'), "utf-8", async (err, file) => {
                try {
                    if (err && err.code === 'ENOENT') throw('邮件模板 not find');
                    if (err) throw err;
                    let check_code = wowCool.obtainRandomNumber(emailConfig.email.limit);
                    let content = file.replace(/{{}}/, check_code);
                    return await emailUtil.send(recipient, emailConfig.subject, content);
                } catch (err) {
                    reject(err);
                }
            });
        });

    }

}

export default new EmailService();