
import fs                           from 'fs'
import path                         from 'path'
import emailUtil                    from './../utils/emai.util'
import redisUtil                    from './../utils/redis.util'
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
                    let redis_client = await redisUtil.set(recipient, check_code);
                    redis_client.expire(recipient, 30000);
                    let content = file.replace(/{{}}/, check_code);
                    await emailUtil.send(recipient, emailConfig.subject, content);
                    return resolve();
                } catch (err) {
                    reject(err);
                }
            });
        });
    }

    // 验证验证码
    async check (recipient, check_code) {
        return new Promise( async (resolve, reject) => {
            try {
                let redis_code = await redisUtil.get(recipient);
                console.log('取出来的code', redis_code);
                redis_code === check_code ? resolve() : reject('验证失败')
            } catch (err) {
                reject(err);
            }
        })
    }

}

export default new EmailService();