import emailService                         from './../services/email.service'

class EmailController {

    // 发送邮件
    async send (ctx, next) {
        ctx.checkBody({
            email: {
                optional: true,
                isEmail: { errorMessage: 'email 格式不正确' },
            },
        });
        if (ctx.validationErrors()) return null;
        try {
            await emailService.send(ctx.request.body.email);
            ctx.pipeDone();
        } catch (e) {
            ctx.pipeFail(e);
        }
    }

    // 验证邮箱
    async check (ctx, next) {

    }

}

export default new EmailController();