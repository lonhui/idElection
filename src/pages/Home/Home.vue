<template>
    <div id="home">
        <div class="zhanWei"></div>
        <P class="eventDate">10 - 17 April 2019</P>
        <div class="candidate">
            <img src="../../assets/img_paslon1@2x.png" alt="">
            <img src="../../assets/img_paslon2@2x.png" alt="">
        </div>
        <div class="button" @click="gotoList">Ikutan</div>
        <div class="rule" @click="gotoRule">Syarat dan Ketentuan</div>
        <v-login v-if='loginShow' @on-close='closeLogin'/>
    </div>
</template>

<script>
import {setCookie,getCookie} from '@/util/Cookie'
import login from '@/components/loginPrompt'

export default {
    data(){
        return{
            userId:null,
            loginShow:false
        }
    },
    mounted(){
        console.log('设备')
        console.log(navigator.userAgent)
        this.getUid()
    },
    components:{
        'v-login':login
    },
    methods:{
        getUid(){
            const url = window.location.href
            let uidArray = url.match(/[^a-zA-Z0-9]u{1,1}=([0-9\-]+)/)//用户id
            let didArray = url.match(/[^a-zA-Z0-9]c{1,1}=([a-z0-9]+)/)//设备id
            if(uidArray){
                let uid = uidArray[1]
                this.userId = uid
                setCookie('uid',uid,1)
            }
        },
        gotoList(){
            if(this.userId || getCookie('uid')){
                this.$router.push('/DateList')
            }else{
                this.loginShow = true
            }
        },
        gotoRule(){
            this.$router.push('/Rule')
        },
        // 验证用户，获取列表
        ValidationUser(){
            this.$axios.post(process.env.API_ROOT+'/vote/votes',
            {id:this.userId},//用户id
            {headers:{'Content-Type':'application/json'}})
            .then(res => {
                console.log(res)
                if(res.data.code==0){
                    this.$router.push({
                        name:'DateList',
                        params:{data:res.data.data.voteInfos}
                    })
                }
            })
            .catch(error => {
                console.log(error)
            })
        },
        // 获取日期和当天候选人图片
        getInfo(){
            this.$axios.get(process.env.API_ROOT+'/vote/todayVote')
            .then(res => {
                console.log(res)
            })
            .catch(error => {
                console.log(error)
            })
        },
        closeLogin(){
            this.loginShow=false
        },
        
    }
}
</script>

<style scoped>
 #home{
    width: 100%;
    height: 6.4rem;
    background:url('../../assets/home_ikutan@2x.png');
    background-size:100% 100%;
    background-repeat:no-repeat;
    position: relative;
 }
 .zhanWei{
     height: 3.0rem;
 }
 .button{
     width: 1rem;
     margin: 0 auto;
     line-height: 0.31rem;
     background-color: #af1919;
     font-size: 0.16rem;
     color: #fff;
     text-align: center;
     border-radius: 1rem;
     -moz-box-shadow:2px 2px 3px #333333; 
     -webkit-box-shadow:2px 2px 3px #333333; 
     box-shadow:2px 2px 3px #333333;
 }
 .rule{
     width: 1.42rem;
     margin: 0 auto;
     line-height: 0.24rem;
     background-color: #e7e7e7;
     font-size: 0.09rem;
     color: #000;
     text-align: center;
     border-radius: 1rem;
     margin-top: 0.16rem;
     padding-left: 0.08rem;
     padding-right: 0.08rem;
     -moz-box-shadow:2px 2px 3px #333333; 
     -webkit-box-shadow:2px 2px 3px #333333; 
     box-shadow:2px 2px 3px #333333;
 }
 .eventDate{
     font-size: 0.22rem;
     text-align: center;
     font-weight: 700;
     margin-bottom: 0.3rem;
     text-shadow: 0.01rem 0.02rem 0.01rem rgba(0,0,0,0.5);
 }
 .candidate{
     text-align: center;
     margin-bottom: 0.1rem;
 }
 .candidate img{
     width: 1.5rem;
 }
</style>
