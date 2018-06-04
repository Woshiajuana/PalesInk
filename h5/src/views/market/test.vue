<template>
    <wow-view>
        <div class="wrap">
            <text class="text" @click="handleClick">点击我调用MODULE</text>
        </div>
    </wow-view>
</template>
<script>
    import WowView          from 'wow-weex/lib/wow-view'
    const modal = weex.requireModule('modal');
    const loadResource = weex.requireModule('loadResurceModule');
    export default {
        methods: {
            handleClick () {
                modal.toast({message: '调用了loadResurceModule'});
                loadResource.getRoutePath('market_app', (e) => {
                    modal.toast({message: '返回了' + JSON.stringify(e)});
                });
            },
        },
        components: {
            WowView,
        }
    }
</script>
