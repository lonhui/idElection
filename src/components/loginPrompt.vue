<template>
<!-- 登录提示框 -->
    <div id="login" @touchmove.prevent>
        <div class="img">
            <div class="zhanWei"></div>
            <p class="message">Untuk bisa ikutan event ini kamu harus log in dahulu.</p>
            <div @click="close" class="button">Log In Disini</div>
        </div>
    </div>
</template>

<script>
export default {
    methods:{
        close(){
            this.$emit('on-close')
        }
    }
}
</script>

<style scoped>
#login{
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
}
.img{
    width: 80%;
    height: 3rem;
    background:url('../assets/bg_polling@2x.png');
    background-size:100% 100%;
    background-repeat:no-repeat;
    margin: 0 auto;
    margin-top: 1.0rem;
}
.button{
    width: 1.3rem;
    height: 0.35rem;
    margin: 0 auto;
    background: -webkit-linear-gradient(#E90000, #890C0C); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(#E90000, #890C0C); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(#E90000, #890C0C); /* Firefox 3.6 - 15 */
    background: linear-gradient(#E90000, #890C0C); /* 标准的语法 */
    border-radius: 0.17rem;
    font-size: 0.16rem;
    color: #fff;
    text-align: center;
    line-height: 0.34rem;
    position: relative;
    top:0.53rem;
}
.zhanWei{
    height: 1.8rem;
}
.message{
    font-size: 0.16rem;
    text-align: center;
    padding-left: 0.4rem;
    padding-right: 0.4rem;
    font-weight: 600;
}
</style>
