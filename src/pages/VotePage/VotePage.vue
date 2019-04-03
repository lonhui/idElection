<template>
    <div id="VotePage" @scroll="scroll">
        <div class="header">
            <div class="topic">
                <p class="date">{{dateTime}}</p>
                <div class="topic_text">
                    <p>{{this.topic}}</p>
                </div>
            </div>
        </div>
        <div class="vote">
            <p class="vote_title">Kamu Hanya Bisa Memilih Sekali. </p>
            <div class="vote_box">
                <div class="left">
                    <div v-show="this.redCss.height !== '0%'" :style="redCss" class="progress_red">
                        <p>{{vote1NumberPer * 100 + '%'}}</p>
                    </div>
                    <img @click="select(1)" :src="vote1Img" alt="leftImg">
                </div>
                <div class="right">
                    <div v-show="this.buleCss.height !== '0%'" :style="buleCss" class="progress_blue">
                        <p>{{vote2NumberPer * 100 + '%'}}</p>
                    </div>
                    <img @click="select(2)" :src="vote2Img" alt="rightImg">
                </div>
            </div>
        </div>

        <!-- 评论 -->
        <div class="footer">
            <div class="footer_centent">
                <img class="expression" src="../../assets/img_smiley@3x.png" @click="expression" alt="表情">
                <input type="text" placeholder='Apa pendapat kamu?' v-on:keyup.enter='doComment' v-model="commentText" @focus='getFocus'>
                <img class="share" src="../../assets/ico_share_on@3x.png" @click="share" alt="分享">
                <img class="commentList" src="../../assets/ic_commentbar@3x.png" @click="commentList" alt="评论">
            </div>
        </div>
        <!-- 表情插件 -->
        <VEmojiPicker :pack="pack" @select="selectEmoji" :showCategory ="false" v-show='emojiShow'/>
        <!-- 评论列表 -->
        <v-comment v-if="commentShow" :dateId='dateId'/>
        <v-notRepeatVote v-if='NotVoteShow' @on-close='closeNotVote'/>
        <v-Loading v-show="loadingShow"/>
    </div>
</template>

<script>
import notRepeatVote from '@/components/notRepeatVote'
import comment from '@/components/comment'
import {getCookie} from '@/util/Cookie'
import VEmojiPicker from 'v-emoji-picker';
import packData from 'v-emoji-picker/data/emojis.json';
import Loading from '@/components/Loading'

export default {
    data(){
        return{
            dateTime:null,
            dateId:null,
            commentShow:false,
            commentText:'',
            focusState:false,
            redCss:{height:'0%'},//控制百分比进度条
            buleCss:{height:'0%'},//控制百分比进度条
            NotVoteShow:false,
            vote1NumberPer:0,//1号所占百分比
            vote2NumberPer:0,//2号所占百分比
            voteNumber:0,//投票编号，0未投票，1投票1号，2投票2号
            topic:null,//问题
            vote1Img:null,//候选人1
            vote2Img :null,//候选人2
            pack: packData,
            emojiShow:false,
            loadingShow:false
        }
    },
    created(){
        window.shareSucceed = this.shareSucceed;
    },
    components:{
        'v-notRepeatVote':notRepeatVote,
        'v-comment':comment,
        'v-Loading':Loading,
        VEmojiPicker
    },
    mounted(){
        
        document.getElementById("EmojiPicker").style.width='100%'
        document.getElementsByClassName("container-search")[0].style.height=0
        document.getElementById("Emojis").style.backgroundColor="#f0f0f0"
        if(getCookie('dateId')){
            this.dateId = getCookie('dateId')
        }
        this.topicAndImg(this.dateId)

        console.log(this.$route.params.data)
        if(this.$route.params.data){
            this.vote1NumberPer = this.$route.params.data.vote1NumberPer?this.$route.params.data.vote1NumberPer.toFixed(2):0
            this.vote2NumberPer = this.$route.params.data.vote2NumberPer?this.$route.params.data.vote2NumberPer.toFixed(2):0
            this.voteNumber = this.$route.params.data.voteAvatarNum?this.$route.params.data.voteAvatarNum:0

            this.redCss.height = this.$route.params.data.vote1NumberPer?this.$route.params.data.vote1NumberPer * 100+'%':'0%'
            this.buleCss.height = this.$route.params.data.vote2NumberPer?this.$route.params.data.vote2NumberPer * 100+'%':'0%'
        }else{  
            this.$router.push('/DateList')
        }
    },
    directives: {
        focus: {
            update: function (el, {value}) {
                if (value) {
                    el.focus()
                }
            }
        }
    },
    methods:{
        scroll(event) {
             this.pos = event.target.scrollTop
             console.log('scroll', event.target.scrollTop)
        },
        selectEmoji(emoji) {
            console.log(emoji.emoji)
            this.commentText =this.commentText + emoji.emoji
        },
        shareSucceed(){this.closeShare()},
        share(){
            let content = ''
            content='Aku sudah vote untuk paslon pilihanku di event "Polling Pilpres" Caping. Siapa paslon pilihanmu? Yuk, vote di Caping sekarang!'
            let title = content
            let pic = null
            var url ='https://app.appsflyer.com/com.engloryintertech.caping?pid=Download'
            CapingJs.share(title,content,url,pic)
        },
        commentList(){
            // alert('展开评论')
            this.commentShow = !this.commentShow
        },
        expression(){
            // alert('表情')
            this.emojiShow = !this.emojiShow
        },
        closeNotVote(){
            this.NotVoteShow=false
        },
        // 投票
        select(id){
            this.loadingShow = true
            this.$axios.post(process.env.API_ROOT+'/vote/doVote',
            {
              uid:Number(getCookie('uid')),//用户id
              voteId:Number(this.dateId),//日期id
              avatarNum:id//后选人id  
            },
            {headers:{'Content-Type':'application/json'}})
            .then(res => {
                console.log(res)
                if(res.data.code===0){
                    console.log(res.data.data)
                    this.vote1NumberPer = res.data.data.vote1NumberPer.toFixed(2)
                    this.vote2NumberPer = res.data.data.vote2NumberPer.toFixed(2)

                    this.redCss.height = res.data.data.vote1NumberPer * 100+'%'
                    this.buleCss.height = res.data.data.vote2NumberPer * 100+'%'
                }else if(res.data.code===1003){
                    this.NotVoteShow = true
                }
                 this.loadingShow = false
            })
            .catch(error => {
                console.log(error)
            })
        },
        // input获取焦点事件
        getFocus(){
            this.emojiShow = false
        },
        // 评论  回车键触发
        doComment(){
            if(this.commentText && this.commentText.length>0 && this.commentText != ''){
                 this.$axios.post(process.env.API_ROOT+'/vote/doComment',
                {
                uid:Number(getCookie('uid')),//用户id
                voteId:Number(this.dateId),//日期id
                content:this.commentText
                },
                {headers:{'Content-Type':'application/json'}})
                .then(res => {
                    console.log(res.data)
                    if(res.data.code===0){
                        this.commentText = ''
                        this.emojiShow = false
                    }
                })
                .catch(error => {
                    console.log(error.data)
                })
            }
        },
        topicAndImg(dateId){
            console.log(dateId)
            switch(Number(dateId)){
                case 1:
                    this.topic = 'Paslon Mana Yang Visi & Misinya Keren?'
                    this.vote1Img = require('../../assets/img_paslon1@2x.png')
                    this.vote2Img = require('../../assets/img_paslon2@2x.png')
                    this.dateTime = '10 April 2019'
                    document.getElementsByTagName("title")[0].innerText = 'Polling Hari 01';
                    break;
                case 2:
                    this.topic = 'Capres Mana Yang Menurutmu Lebih Tegas?'
                    this.vote1Img = require('../../assets/img_polingpilpres_ui_jokowi@2x.png')
                    this.vote2Img = require('../../assets/img_polingpilpres_ui_prabowo@2x.png')
                    document.getElementsByTagName("title")[0].innerText = 'Polling Hari 02';
                    this.dateTime = '11 April 2019'
                case 3:
                    this.topic = 'Tugas Wapres adalah menjalankan roda koordinasi dan komunikasi antara lembaga-lembaga di pemerintahan. Menurutmu, Cawapres Mana Yang Lebih Bisa Menjalankan Tugas Tersebut?'
                    this.vote1Img = require('../../assets/img_polingpilpres_ui_amin@2x.png')
                    this.vote2Img = require('../../assets/img_polingpilpres_ui_sandi@2x.png')
                    document.getElementsByTagName("title")[0].innerText = 'Polling Hari 03';
                    this.dateTime = '12 April 2019'
                    break;
                case 4:
                    this.topic = 'Paslon Mana Yang Menurutmu Paling Dibutuhkan Rakyat Indonesia Saat ini?'
                    this.vote1Img = require('../../assets/img_paslon1@2x.png')
                    this.vote2Img = require('../../assets/img_paslon2@2x.png')
                    document.getElementsByTagName("title")[0].innerText = 'Polling Hari 04';
                    this.dateTime = '13 April 2019'
                    break;
                case 5:
                    this.topic = 'Pendukung Mana Yang Lebih Kreatif Dalam Mendukung Paslonnya?'
                    this.vote1Img = require('../../assets/img_paslon1@2x.png')
                    this.vote2Img = require('../../assets/img_paslon2@2x.png')
                    document.getElementsByTagName("title")[0].innerText = 'Polling Hari 05';
                    this.dateTime = '14 April 2019'
                    break;
                case 6:
                    this.topic = 'Capres Mana Yang Menurutmu Paling Nasionalis dan Merakyat?'
                    this.vote1Img = require('../../assets/img_polingpilpres_ui_jokowi@2x.png')
                    this.vote2Img = require('../../assets/img_polingpilpres_ui_prabowo@2x.png')
                    document.getElementsByTagName("title")[0].innerText = 'Polling Hari 06';
                    this.dateTime = '15 April 2019'
                    break;
                case 7:
                    this.topic = 'Siapa Paslon Yang Menurutmu Paling Pantas Memimpin Indonesia Di Periode 2019-2024?'
                    this.vote1Img = require('../../assets/img_paslon1@2x.png')
                    this.vote2Img = require('../../assets/img_paslon2@2x.png')
                    document.getElementsByTagName("title")[0].innerText = 'Polling Hari 07';
                    this.dateTime = '16 April 2019'
                    break;
            }
            console.log(
                 this.topic
                   
            )
        }
    }
}
</script>

<style scoped>
#VotePage{
    position: relative;
}
.header{
    width: 100%;
    padding-top: 0.1rem;
    padding-bottom: 0.14rem;
    background-color: #f6f6f6;
}
.topic{
    width: 94%;
    margin: 0 auto;
    background-color: #fff;
    border-radius: 0.06rem;
    -moz-box-shadow:2px 2px 5px #333333; -webkit-box-shadow:2px 2px 5px #333333; box-shadow:2px 2px 5px #333333;
}
.date{
    font-size: 0.17rem;
    color: #fff;
    line-height: 0.5rem;
    background-color: #af1919;
    padding-left: 0.2rem;
    border-top-left-radius: 0.06rem;
    border-top-right-radius: 0.06rem;
}
.topic_text{
    margin: 0 auto;
    font-size: 0.15rem;
    color: #000;
    line-height: 0.22rem;
    padding-top:0.15rem;
    padding-bottom: 0.2rem;
    padding-left: 0.2rem;
    padding-right: 0.2rem;
}
/* ************ */
.vote {
    height: 4.37rem;
    background:url('../../assets/vote_bg.png');
    background-size:100% 100%;
    background-repeat:no-repeat;
}
.vote_title{
    font-size: 0.12rem;
    text-align: center;
    margin-top: 0.22rem; 
}
.vote_box{
    width: 90%;
    margin: 0 auto;
    height: 2.0rem;
    margin-top: 0.6rem;
}
.vote_box .left{
    width: 1.46rem;
    height: 100%;
    float: left;
    text-align: center;
    position: relative;
}
.vote_box .right{
    width: 1.46rem;
    height: 100%;
    float: right;
    text-align: center;
    position: relative;
}
.vote_box img{
    width: 1.46rem;
    height: 1.22rem;
    position:absolute;
    bottom:-0.50rem;
    left: 0;
}
.progress_red{
    width: 0.5rem;
    background-color: #af1919;
    padding-top: 0.05rem;
    position:absolute;
    bottom: 0.15rem;
    left: 0.48rem;
}
.progress_blue{
    width: 0.5rem;
    background-color: #2119af;
    padding-top: 0.05rem;
    position:absolute;
    bottom: 0.15rem;
    left: 0.48rem;
}
.progress_blue p,.progress_red p{
    font-size: 0.16rem;
    color: #fff;
}

/* ************ */
.footer{
    height: 0.5rem;
    width: 100%;
    margin: 0 auto;
    background: #fff;
    margin-bottom: 0;
    border-top: 0.005rem #f2f2f2 solid;
    border-bottom: 0.005rem #f2f2f2 solid;
    display: flex;
    align-items: center;
    -moz-box-shadow:2px 2px 5px #333333; -webkit-box-shadow:2px 2px 5px #333333; box-shadow:2px 2px 5px #333333;
}
.footer_centent{
    width: 95%;
    margin: 0 auto;
    margin-bottom: 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}
.expression,.share,.commentList{
    width: 0.3rem;
    height: 0.3rem;
}
input{
    height: 0.28rem;
    width: 2rem;
    border-radius: 0.14rem;
    background-color: #f2f2f2;
    padding-left: 0.1rem;
    padding-right:0.1rem; 
    outline:none;
    float: left;
}
</style>
