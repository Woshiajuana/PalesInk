
import fs                           from 'fs'
import path                         from 'path'
import emailUtil                    from './../utils/emai.util'
import emailConfig                  from './../config/email.config'
import wowCool                      from './../wow-cool'


class EmailService {

    // 发送验证码
    async send (recipient) {
        // 读取文件
        fs.readFile(path.join(__dirname, '../views/email.html'), "utf-8", async (err, file) => {
            if (err && err.code === 'ENOENT') throw '邮件模板 not find';
            if (err) throw err;
            try {
                let check_code = wowCool.obtainRandomNumber(emailConfig.email.limit);
                let content = file.replace(/{{}}/, check_code);
                return await emailUtil.send(recipient, emailConfig.subject, content);
            } catch (e) {
                throw e;
            }
        });
    }

}

export default new EmailService();