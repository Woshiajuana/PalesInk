export default {
    '/test': {
        '/test': {
            get: 'test.hello'
        }
    },

    // app接口
    '/app': {
        '/user': {
            '/create': {
                post: 'user.create'
            },
            '/find': {
                get: 'user.find'
            },
            'update': {
                put: 'user.update'
            }
        }
    }
}