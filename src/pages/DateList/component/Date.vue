<template>
    <div id="Date">
        <!-- 已经开始投票的组件 -->
        <div :class="{'Date':data.voteStatus!==2,'Date_y':data.voteStatus===2,}" v-if="data.timeStatus!=0">
            <div class="top">
                <p>{{data.date}}</p>
            </div>
            <div class="bottom">
                <p>
                    {{data.text}} 
                    <!-- span部分已投票状态显示 -->
                    <span class="segmentation" v-if="data.voteStatus===1">|</span> 
                    <span class="Voted" v-if="data.voteStatus===1">Hasil Polling</span>
                </p>
                <div class="button" v-if="data.voteStatus!==2" @click="gotoVote(data.id)">lihat</div>
            </div>
            <img v-if="data.id===8" src="../../../assets/Box.png" alt="">
        </div>

        <!-- 未开始投票的组件 -->
        <div class="Date_N" v-else>
            <div class="top_N">
                <p>{{data.date}}</p>
            </div>
            <div class="bottom_N">
                <p>
                    {{data.text}}
                </p>
                <div class="button_N" v-if="data.voteStatus!==2">lihat</div>
            </div>
            <img v-if="data.id===8" src="../../../assets/Box.png" alt="">
        </div>
    </div>
</template>

<script>
import {setCookie} from '@/util/Cookie'

export default {
    props:['data'],
    data(){
        return{

        }
    },
    methods:{
        gotoVote(id){
            setCookie('dateId',this.data.id,1)
            if(Number(id)==8){
                this.$router.push({name:'PEMILU',params:{data:this.data}})
            }else{
                this.$router.push({name:'VotePage',params:{data:this.data}})
            }
        }
    }
    
    
}
</script>

<style scoped>
.Date{
    width: 3.25rem;
    height: 0.67rem;
    margin: 0 auto;
    background-color: #af1919;
    border-radius: 0.08rem;
    margin-bottom: 0.15rem;
    -moz-box-shadow:1px 3px 10px #333333;
    -webkit-box-shadow:1px 3px 10px #333333;
    box-shadow:1px 3px 10px #333333;
    position: relative;
}
.Date img{
    width: 0.52rem;
    height: 0.60rem;
    position:absolute;
    top:0.05rem;
    left: 0.1rem;
}
.Date_y{
    width: 3.25rem;
    height: 0.67rem;
    margin: 0 auto;
    background-color: #f5a623;
    border-radius: 0.08rem;
    margin-bottom: 0.15rem;
    -moz-box-shadow:1px 3px 10px #333333;
    -webkit-box-shadow:1px 3px 10px #333333;
    box-shadow:1px 3px 10px #333333;
    position: relative;
}
.Date_y img{
    width: 0.52rem;
    height: 0.60rem;
    position:absolute;
    top:0.05rem;
    left: 0.1rem;
}
/* ******************** */
.top{
    width: 100%;
    height: 50%;
}
.top p{
    font-size: 0.18rem;
    color: #fff;
    text-align: center;
    line-height: 0.335rem;
}
/* ******************** */
.bottom{
    width: 100%;
    height: 50%;
    background-color: #fff;
    border-bottom-right-radius: 0.07rem;
    border-bottom-left-radius: 0.07rem;
    position: relative;
}
.bottom p{
    font-size: 0.18rem;
    color: #af1919;
    text-align: center;
    line-height: 0.335rem;
}
.bottom p .Voted{
    font-size: 0.14rem;
    color: #000;
}
.bottom p .segmentation{
    color: #000;
}
.bottom .button{
    width: 0.47rem;
    line-height: 0.15rem;
    font-size: 0.10rem;
    color: #fff;
    background-color: #af1919;
    border-radius: 0.04rem;
    text-align: center;
    position: absolute;
    top:0.092rem;
    right:0.092rem
}
/* ####################################################################################### */

.Date_N{
    width: 3.25rem;
    height: 0.67rem;
    margin: 0 auto;
    background-color: #eeeeee;
    border-radius: 0.08rem;
    margin-bottom: 0.15rem;
    -moz-box-shadow:1px 3px 10px #333333;
    -webkit-box-shadow:1px 3px 10px #333333;
    box-shadow:1px 3px 10px #333333;
    position: relative;
}
.Date_N img{
    width: 0.52rem;
    height: 0.60rem;
    position:absolute;
    top:0.05rem;
    left: 0.1rem;
}
/* ******************** */
.top_N{
    width: 100%;
    height: 50%;
}
.top_N p{
    font-size: 0.18rem;
    color: rgba(0, 0, 0, 0.5);
    text-align: center;
    line-height: 0.335rem;
}
/* ******************** */
.bottom_N{
    width: 100%;
    height: 50%;
    background-color: #fff;
    border-bottom-right-radius: 0.07rem;
    border-bottom-left-radius: 0.07rem;
    position: relative;
}
.bottom_N p{
    font-size: 0.18rem;
    color: rgba(0, 0, 0, 0.5);
    text-align: center;
    line-height: 0.335rem;
}
.bottom_N p .Voted_N{
    font-size: 0.14rem;
    color: #000;
}
.bottom_N p .segmentation_N{
    color: #000;
}
.bottom_N .button_N{
    width: 0.47rem;
    line-height: 0.15rem;
    font-size: 0.10rem;
    color:  rgba(0, 0, 0, 0.3);
    background-color: #cfcfcf;
    border-radius: 0.04rem;
    text-align: center;
    position: absolute;
    top:0.092rem;
    right:0.092rem
}
</style>
