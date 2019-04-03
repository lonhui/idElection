<template>
<!-- 不能重复投票提示框 -->
    <div id="notRepeatVote" @touchmove.prevent>
        <div class="img" @click="close">
            <img src="../assets/img_oops@3x.png" alt="loginImg">
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
#notRepeatVote{
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
}
.img img{
    width: 100%;
}
</style>
