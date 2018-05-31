
import fs                           from 'fs'
import path                         from 'path'
import EmailUtil                    from './../utils/emai.util'
import RedisUtil                    from './../utils/redis.util'
import EmailConfig                  from './../config/email.config'
import WowCool                      from './../wow-cool'


class EmailService {

    // 发送验证码
    async send ({email}) {
        return new Promise( async (resolve, reject) => {
            fs.readFile(path.join(__dirname, '../views/email.html'), "utf-8", async (err, file) => {
                try {
                    if (err && err.code === 'ENOENT') throw '邮件模板 not find';
                    if (err) throw err;
                    let code = WowCool.obtainRandomNumber(EmailConfig.email.limit);
                    let check_code = {
                        code,
                        expire: new Date().getTime() + EmailConfig.email.expire * 1000,
                    };
                    await RedisUtil.hmset(email, check_code);
                    let content = file.replace(/{{}}/, code);
                    await EmailUtil.send(email, EmailConfig.subject, content);
                    return resolve();
                } catch (err) {
                    reject(err);
                }
            });
        });
    }

    // 验证验证码
    async check ({email, check_code}) {
        try {
            let redis_code = await RedisUtil.hgetall(email);
            if (!redis_code) throw '验证码错误';
            let { code, expire } = redis_code;
            if (expire < new Date().getTime()) throw '验证码超时，请重新验证';
            if (code !== check_code) throw '验证码错误';
            RedisUtil.del(email);
            return true;
        } catch (err) {
            throw(err);
        }
    }

}

export default new EmailService();