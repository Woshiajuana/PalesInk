<template>
    <div class="image-wrap">
        <div class="image-item"
             v-for="(item, index) in image_arr"
             :key="index">
            <div class="image-box">
                <image class="image"
                       :style="{width: image_size[0],
                       height: image_size[1]}"
                       :src="item.src || handleSrc(item.text)"
                       autoBitmapRecycle="false">
                </image>
            </div>
            <text class="text">{{item.text}}</text>
        </div>
    </div>
</template>
<script>
    import Source                   from 'utils/source.util'
    export default {
        props:{
            image_num: {default: 3},
            image_size: {default: [196, 196]},
            image_arr: {default: []},
            image_disabled: {default: false,}
        },
        methods: {
            handleSrc (text) {
                switch (text) {
                    case '身份证正面照':
                        return Source('market_sfz_f_photo.png');
                    case '身份证背面照':
                        return Source('market_sfz_b_photo.png');
                    case '手持身份证+银行卡照':
                        return Source('market_sfz_sc_photo.png');
                    case '银行卡正面照':
                        return Source('market_yhk_f_photo.png');
                    case '开户许可证照':
                        return Source('market_khxk_photo.png');
                    case '营业执照':
                        return Source('market_yyzz_photo.png');
                    case '门店照':
                        return Source('market_mdz_photo.png');
                    case '收银台照':
                        return Source('market_syt_photo.png');
                    case '店内照':
                        return Source('market_dnz_photo.png');
                }
            }
        }
    }
</script>
<style>
    .image-wrap{
        padding-left: 40px;
        padding-right: 40px;
        flex-direction: row;
        align-items: center;
        flex-wrap: wrap;
        justify-content: space-between;
        margin-top: 32px;
    }
    .image-item{
        margin-bottom: 20px;
        align-items: center;
    }
    .image-box{
        background-color: #029BDD;
    }
    .text{
        margin-top: 20px;
        font-size: 24px;
        color: #333;
    }
</style>
