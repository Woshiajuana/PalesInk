
import UserModel                        from './../models/user.model'
import EmailService                     from './email.service'

class UserService {

    async create (email, password, code) {
        try {
            await EmailService.check(email, code);
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