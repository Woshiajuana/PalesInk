import UserModel                 from './../models/user.model'

class UserController {

    // 创建用户
    async create (ctx) {
        // ctx.body = '创建成功';
        ctx.pipeDone('创建成功')
    }

    // 更新用户
    async update (ctx) {

        ctx.body = '更新用户'
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