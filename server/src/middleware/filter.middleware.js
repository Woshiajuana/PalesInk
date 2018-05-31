
export default () => async (ctx, next) => {
    try {
        ctx.filterParams = (org_params, expect_params) => {
            let result_params = {};
            for ( let key in expect_params ) {
                result_params[key] = org_params[key];
            }
            return result_params;
        };
        await next();
    } catch (err) {
        ctx.app.emit('error', err, ctx);
    }
}