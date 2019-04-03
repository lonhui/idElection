<template>
    <div class="loading" :style="{backgroundColor:backStyle}" @touchmove.prevent>
        <div id="loading">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </div>
    </div>
    
</template>

<script>
export default {
    props:["count"],
    data(){
        return {
            backStyle:this.count?'#020031':'rgba(0,0,0,0.6)'
        }
    }
}
</script>

<style scoped>
 .loadingImg{
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #020031;
}
.loading{
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.6);
}

#loading{
            width: 1.49rem;
            height: 1.2rem;
            margin: 0 auto;
            margin-top: 2.4rem;
        }
        #loading span{
            display: inline-block;
            width: 0.06rem;
            height: 100%;
            border-radius: 0.03rem;
            background: lightgreen;
            -webkit-animation: load 1s ease infinite;
        }
        @-webkit-keyframes load{
            0%,100%{
                height: 0.4rem;
                background: lightgreen;
            }
            50%{
                height: 0.70rem;
                margin: -0.15rem 0;
                background: lightblue;
            }
        }
        #loading span:nth-child(2){
            -webkit-animation-delay:0.2s;
        }
        #loading span:nth-child(3){
            -webkit-animation-delay:0.4s;
        }
        #loading span:nth-child(4){
            -webkit-animation-delay:0.6s;
        }
       #loading span:nth-child(5){
            -webkit-animation-delay:0.8s;
        }
</style>
