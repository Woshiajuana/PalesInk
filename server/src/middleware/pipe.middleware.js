
import _                    from 'lodash'
import logger               from './../utils/logger.util'
import {logger_type}        from './../config/logger.config'

export default () => async (ctx, next) => {
    try {
        ctx._pipeDoneData = {};
        ctx._pipeFailData = {};
        ctx.pipeDone = (result) => {
            ctx._pipeDoneData = { code: '0000', result };
        };
        ctx.pipeFail = (input, code = '9999') => {
            const message = _.get(input, 'message') || input;
            const stack = _.get(input, 'stack') || undefined;
            ctx._pipeFailData = { code, message };
            const errorType = _.includes(logger_type, _.get(input, 'type')) ? input.type : 'system';
            logger[errorType]().error(__dirname, '失败原因: ', stack || message)
        };
        await next();
        // 拦截错误验证
        const validationErrors = ctx.validationErrors();
        if (validationErrors) {
            ctx.body = {
                code: 'VD99',
                message: '参数验证失败',
                stack: validationErrors,
            };
            return logger.system().error(__filename, '参数验证失败', validationErrors)
        }
        // 拦截返回
        if (!_.isEmpty(ctx._pipeFailData)) {
            ctx.body = ctx._pipeFailData;
            return null
        }
        if (!_.isEmpty(ctx._pipeDoneData)) {
            ctx.body = ctx._pipeDoneData;
            return null
        }
    } catch (err) {
        ctx.app.emit('error', err, ctx);
    }
}