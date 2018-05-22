import _                from 'lodash'
import validator        from 'validator'
import koaValidator     from 'koa-middle-validator'

/**
 * 自定义验证
 */
export default () => koaValidator({
    errorFormatters: (param, message, value) => {
        return {
            param,
            message,
            value,
        }
    },
    customValidators: {
        isEmail: value => /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value),
        isMobile: value => /^1[3|4|5|7|8]\d{9}$/.test(value),
        isString: value => _.isString(value),
        isNumber: value => !isNaN(Number(value)),
        isObject: value => _.isObject(value),
        isJson: value => Object.prototype.toString.call(value).toLowerCase() === '[object object]',
        // isVersion: value => version.check(value),
        isArray: value => _.isArray(value),
        inArray: (param, ...args) => {
            const validatorName = args[0]
            return _.every(param, (item) => {
                switch (validatorName) {
                    case 'isEmail': return /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(item)
                    case 'isMobile': return /^1[3|4|5|7|8]\d{9}$/.test(item)
                    case 'isString': return _.isString(item)
                    case 'isNumber': return _.isNumber(item)
                    case 'isObject': return _.isObject(item)
                    case 'isJson': return Object.prototype.toString.call(item).toLowerCase() === '[object object]'
                    case 'isArray': return _.isArray(item)
                    case 'isBoolean':
                        switch (typeof item) {
                            case 'string': return item === 'true' || item === 'false'
                            case 'boolean': return item === true || item === false
                            default: return false
                        }
                    default:
                        return validator[validatorName].call(this, item)
                }
            })
        },
        isBoolean: (value) => {
            switch (typeof value) {
                case 'string':
                    return value === 'true' || value === 'false'
                case 'boolean':
                    return value === true || value === false
                default:
                    return false
            }
        },
        custom: (value, callback) => {
            if (typeof value !== 'undefined') {
                return callback(value)
            }
            return false
        },
    },
    customSanitizers: {
        toArray: value => (_.isArray(value) ? value : eval(`(${value})`)),
        eval: value => eval(`(${value})`),
    },
})
