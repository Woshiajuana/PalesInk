
import fs                           from 'fs'
import path                         from 'path'
import EmailUtil                    from './../utils/emai.util'
import RedisUtil                    from './../utils/redis.util'
import EmailConfig                  from './../config/email.config'
import WowCool                      from './../wow-cool'


class EmailService {

    // 发送验证码
    async send (recipient) {
        return new Promise( async (resolve, reject) => {
            fs.readFile(path.join(__dirname, '../views/email.html'), "utf-8", async (err, file) => {
                try {
                    if (err && err.code === 'ENOENT') throw '邮件模板 not find';
                    if (err) throw err;
                    let check_code = WowCool.obtainRandomNumber(EmailConfig.email.limit);
                    let redis_client = await RedisUtil.set(recipient, check_code);
                    redis_client.expire(recipient, 30);
                    let content = file.replace(/{{}}/, check_code);
                    await EmailUtil.send(recipient, EmailConfig.subject, content);
                    return resolve();
                } catch (err) {
                    reject(err);
                }
            });
        });
    }

    // 验证验证码
    async check (recipient, check_code) {
        try {
            let redis_code = await RedisUtil.get(recipient);
            if (redis_code !== check_code) return ('验证失败');
        } catch (err) {
            throw(err);
        }
    }

}

export default new EmailService();