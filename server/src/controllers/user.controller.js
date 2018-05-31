
import UserService                      from './../services/user.service'

class UserController {

    // 创建用户
    async create (ctx) {
        let expect = {
            email: {
                notEmpty: {
                    options: [true],
                    errorMessage: 'email 不能为空'
                },
                isEmail: { errorMessage: 'email 格式不正确' },
            },
            password: {
                notEmpty: {
                    options: [true],
                    errorMessage: 'password 不能为空'
                },
            },
            code: {
                notEmpty: {
                    options: [true],
                    errorMessage: 'code 不能为空'
                },
            }
        };
        ctx.checkBody(expect);
        if (ctx.validationErrors()) return null;
        try {
            let data = ctx.filterParams(ctx.request.body, expect);
            await UserService.create(data);
            ctx.pipeDone('注册成功');
        } catch (err) {
            ctx.pipeFail(err);
        }
    }

    // 更新用户
    async update (ctx) {
        let expect = {
            _id: {
                notEmpty: {
                    options: [true],
                    errorMessage: 'id 不能为空'
                },
            },
            email: {
                isEmail: { errorMessage: 'email 格式不正确' },
            },
            password: {
                
            }
        }
    }

    // 查询用户
    async find (ctx) {
        console.log(5)
        ctx.body = '查询用户'
        // ctx.pipeDone('查询用户')
    }

    // 用户列表
    async list (ctx) {

        ctx.body = '用户列表'
    }

    // 删除用户
    async delete (ctx) {

        ctx.body = '删除用户'
    }

}

export default new UserController();