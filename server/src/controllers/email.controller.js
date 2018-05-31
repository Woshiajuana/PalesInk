
import EmailService                         from './../services/email.service'

class EmailController {

    // 发送邮件
    async send (ctx, next) {
        let expect = {
            email: {
                notEmpty: {
                    options: [true],
                    errorMessage: 'email 不能为空'
                },
                isEmail: { errorMessage: 'email 格式不正确' },
            },
        };
        ctx.checkBody(expect);
        if (ctx.validationErrors()) return null;
        try {
            let data = ctx.filterParams(ctx.request.body, expect);
            await EmailService.send(data);
            ctx.pipeDone('验证码已发送，十分钟内有效');
        } catch (err) {
            ctx.pipeFail(err);
        }
    }

}

export default new EmailController();