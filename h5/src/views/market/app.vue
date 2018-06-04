<template>
    <wow-view
        view_header_center_txt="APP入口">
        <div class="wrap">
            <text class="entry-item" @click="handleJump('market_merchant')">案例入口一</text>
            <text class="entry-item" @click="handleJump('market_merchant_result')">案例入口二</text>
            <text class="entry-item" @click="handleJump('market_merchant_contract')">案例入口三</text>
            <text class="entry-item" @click="handleJump('market_test')">案例入口四</text>
        </div>
    </wow-view>
</template>
<script>
    import WowView                  from 'wow-weex/lib/wow-view'
    import Router                   from 'plugins/router.plugin'
    export default {
        methods: {
            handleJump (page) {
                Router.push(page);
            }
        },
        components: {
            WowView,
        }
    }
</script>
<style>
    .wrap{
        flex: 1;
        justify-content: center;
        align-items: center;
    }
    .entry-item{
        font-size: 32px;
        line-height: 60px;
    }
</style>
