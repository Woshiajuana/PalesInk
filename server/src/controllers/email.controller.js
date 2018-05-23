

class EmailController {

    // 发送邮件
    async send (ctx, next) {
        console.log('进入控制器，即将验证参数')
        ctx.checkBody({
            email: {
                optional: true,
                isEmail: { errorMessage: 'email 格式不正确' },
            },
        });
        // if (ctx.validationErrors()) return null;
        console.log(ctx.validationErrors())
        console.log('验证参数完成')
        return null;
        try {
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