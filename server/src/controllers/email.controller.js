import EmailService                         from './../services/email.service'

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
            await EmailService.send(data.email);
            ctx.pipeDone();
        } catch (err) {
            ctx.pipeFail(err);
        }
    }

}

export default new EmailController();