
export default {

    /**
     * 查询数组序列
     * @param  arr      [Array]                         需要查询的数组
     * @param  filter   [Function, String, Number]      过滤条件
     * */
    findFirstIndexForArr (arr = [], filter = () => {}) {
        if (!this.isArray(arr)) throw Error('arr must is array');
        let index = -1;
        arr.forEach((item, i) => {
            if(typeof filter === 'function' && filter(item)) return index = i;
            if(typeof filter !== 'function' && item === filter) return index = i;
        });
        return index;
    },

    /**
     * 查询数组序列
     * @param  arr      [Array]                         需要查询的数组
     * @param  filter   [Function, String, Number]      过滤条件
     * */
    findLastIndexForArr (arr = [], filter = () => {}) {
        if (!this.isArray(arr)) throw Error('arr must is array');
        arr = arr.reverse();
        return this.findFirstIndexForArr(arr, filter);
    },

    /**
     * 判断是否是数组的方法
     * @param  obj      [Array]         需要查询的对象
     * */
    isArray(obj = '') {
        return Object.prototype.toString.call(obj) === '[object Array]';
    },

    /**
     * 获取随机数
     * @param   range_length    [Number]    随机数长度
     * @param   range_size_arr  [Array]     随机数范围
     * */
    obtainRandomNumber (range_length = 1, range_size_arr = []) {
        if (!this.isArray(range_size_arr)) throw Error('range_size_arr must is array');
        let random_num = '';
        !range_size_arr.length && (range_size_arr = [0,1,2,3,4,5,6,7,8,9]);
        for (let index = 0; index < range_length; index++) {
            random_num += range_size_arr[Math.floor(Math.random() * range_size_arr.length)] + '';
        }
        return random_num;
    }

}