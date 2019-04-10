<template>
<!-- 不能重复投票提示框 -->
    <div id="INError" @touchmove.prevent>
        <div class="img" @click="close">
            <img src="../assets/img_oops@2x(1).png" alt="loginImg">
            <div class="text">Koneksi kamu tidak stabil,Periksa jaringan internet kamu！</div>
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
#INError{
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
    margin: 0 auto;
    margin-top: 2.0rem;
    position: relative;
}
.img img{
    width: 100%;
}
.text{
    padding: 0.5rem;
    text-align: center;
    line-height: 0.21rem;
    font-size: 0.16rem;
    position: absolute;
    top:0.5rem;
    left: 0;
}
</style>
