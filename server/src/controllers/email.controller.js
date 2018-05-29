import emailService                         from './../services/email.service'

class EmailController {

    // 发送邮件
    async send (ctx, next) {
        ctx.checkBody({
            email: {
                notEmpty: {
                    options: [true],
                    errorMessage: 'email 不能为空'
                },
                isEmail: { errorMessage: 'email 格式不正确' },
            },
        });
        if (ctx.validationErrors()) return null;
        try {
            let data = ctx.request.body;
            await emailService.send(data.email);
            ctx.pipeDone();
        } catch (err) {
            ctx.pipeFail(err);
        }
    }

    // 验证邮箱
    async check (ctx, next) {
        ctx.checkBody({
            email: {
                notEmpty: {
                    options: [true],
                    errorMessage: 'email 不能为空'
                },
                isEmail: { errorMessage: 'email 格式不正确' },
            },
            code: {
                notEmpty: {
                    options: [true],
                    errorMessage: 'code 不能为空'
                },
            }
        });
        if (ctx.validationErrors()) return null;
        try {
            let data = ctx.request.body;
            await emailService.check(data.email, data.code);
            ctx.pipeDone();
        } catch (err) {
            ctx.pipeFail(err);
        }
    }

}

export default new EmailController();