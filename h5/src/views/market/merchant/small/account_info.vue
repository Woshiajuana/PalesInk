<template>
    <wow-view
        :view_header_right_txt="!is_type ? '提交' : is_disabled ? '修改' : '提交'"
        @rightItemClick="handleRight('market_merchant_result')"
        view_header_center_txt="小微商户">
        <step-cue :step_arr="arr_step" v-if="!is_type"></step-cue>
        <wow-input-cell
            v-for="(item, key) in obj_input"
            :input_value="item.value"
            :input_placeholder="item.placeholder"
            :input_label_txt="item.label"
            :input_type="item.type"
            :input_disabled="is_disabled"
            :key="key"
            :input_use="item.use_input"
            @input="handleInput(item, $event)">
            <arrow-tip slot="input_unit" v-if="item.is_arrow && !is_disabled"></arrow-tip>
        </wow-input-cell>
        <image-upload :image_arr="arr_image"></image-upload>
    </wow-view>
</template>
<script>
    import WowView                  from 'wow-weex/lib/wow-view'
    import WowInputCell             from 'wow-weex/lib/wow-input-cell'
    import StepCue                  from 'components/step-cue'
    import Router                   from 'plugins/router.plugin'
    import ArrowTip                 from 'components/arrow-tip'
    import ImageUpload              from 'components/image-upload'
    export default {
        data () {
            return {
                is_type: false,
                is_disabled: false,
                arr_step: [
                    { text: '法人身份信息', is_current: true},
                    { text: '商户经营信息', is_current: true},
                    { text: '结算账户信息', is_current: true},
                ],
                obj_input: {
                    account_name: {
                        value: '张启明',
                        label: '账户名称',
                        placeholder: '',
                        use_input: true,
                    },
                    bank_id: {
                        value: '',
                        label: '银行账号',
                        placeholder: 'Ⅰ类户借记卡号(柜面开立)',
                        use_input: true,
                    },
                    open_bank: {
                        value: '',
                        label: '开户银行',
                        placeholder: '选择/查看支持银行',
                        is_arrow: true,
                        use_input: false,
                    },
                    open_area: {
                        value: '',
                        label: '开户地区',
                        placeholder: '请选择省/市',
                        is_arrow: true,
                        use_input: false,
                    },
                    open_branch_bank: {
                        value: '',
                        label: '开户支行',
                        placeholder: '选择分支行',
                        is_arrow: true,
                        use_input: false,
                    },
                    phone: {
                        value: '',
                        label: '预留手机号',
                        placeholder: '开户预留手机号',
                        use_input: true,
                    },
                },
                arr_image: [
                    { text: '银行卡正面照' },
                ],
            }
        },
        created () {
            this.is_type = !!Router.getParams(this).is_type;
            this.is_disabled = this.is_type;
        },
        methods: {
            handleInput (item, event) {
                item.value = event.value;
            },

            // 下一步点击事件
            handleRight (page) {
                if (!this.is_type) return Router.push(page);
                this.is_disabled = !this.is_disabled;
//                return Router.pop();
            }
        },
        components: {
            WowView,
            WowInputCell,
            StepCue,
            ArrowTip,
            ImageUpload,
        }
    }
</script>
<style>

</style>
