import mongoose                 from 'mongoose'
import crypto                   from './../utils/crypto.util'
import validator                from './../utils/validator-schema.util'

const UserSchema = new mongoose.Schema({

    // 邮箱
    email: {
        type: String,
        unique: true,
        sparse: true,
        trim: true,
        lowercase: true,
        match: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
    },

    // 密码
    password: {
        type: String,
        set: crypto,
        required: true,
    },

    // 手机
    mobile: {
        type: Number,
        unique: true,
        sparse: true,
        match: /^1[3|4|5|7|8]\d{9}$/,
    },

    // 昵称
    nickname: {
        type: String,
        trim: true,
        minlength: 2,
        maxlength: 20,
    },

    // 头像
    avatar: {
        type: String,
        trim: true,
    },

    // 注册信息
    enroll: {
        // 时间
        date: { type: Date, default: Date.now },
        // 地点
        address: { type: String, trim: true },
        // IP
        ip: { type: String, trim: true, match: /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/ },
        // 平台
        platform: { type: String, trim: true },
        // 其他
        collection: { type: Object },
    },

},{

    // 在schema中设置timestamps为true，
    // schema映射的文档document会自动添加createdAt和updatedAt这两个字段，
    // 代表创建时间和更新时间.
    timestamps: true,

});

UserSchema.plugin(validator);

export default mongoose.model('user', UserSchema);