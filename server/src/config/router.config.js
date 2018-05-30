export default {
    // app接口
    '/app': {
        // 用户
        '/user': {
            // 创建
            '/create': {
                post: 'user.create'
            },
            // 查询
            '/find': {
                get: 'user.find'
            },
            // 更新
            'update': {
                put: 'user.update'
            },
        },
        // 邮箱
        '/email': {
            // 发送
            '/send': {
                post: 'email.send'
            },
        }
    }
}