<template>
<!-- 不能重复投票提示框 -->
    <div id="timeOut" @touchmove.prevent>
        <div class="img" @click="close">
            <img src="../assets/img_oops@2x(1).png" alt="loginImg">
            <div class="text">投票、评论、点赞功能只有在投票当天才有效</div>
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
#timeOut{
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
    font-size: 0.16rem;
    position: absolute;
    top:0.5rem;
}
</style>
