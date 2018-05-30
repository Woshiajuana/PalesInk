
import UserModel                        from './../models/user.model'
import EmailService                     from './email.service'

class UserService {

    async create (email, password, code) {
        try {
            await EmailService.check(email, code);
            let result = await UserModel.findOne({email});
            if (!result) throw '该邮箱已注册';
            let user = {
                email,
                password,
            };
            await UserModel.create(user);
        } catch (err) {
            throw err;
        }
    }

}

export default new UserService();