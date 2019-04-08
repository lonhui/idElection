<template>
    <div id="PEMILU">
        <img class="titleImg" src="../../assets/bg_polingcapres_8@3x.png" alt="titleImg">
        <div class="center">
            <div class="box">
                <div class="left">
                    <img src="../../assets/Box.png" alt="box">
                </div>
                <div class="right">
                        Yuk, saatnya berbondong-bondong ke TPS untuk mengikuti pesta demokrasi 5 tahun sekali ini. Gunakan hak suara kamu dengan cara memilih Capres & Wapres pilihanmu demi Indonesia yang lebih baik.
                </div>
            </div>
            <div class="hand">
                <div class="left">
                    <img src="../../assets/img_kelingking@3x.png" alt="hand">
                </div>
                <div class="right">
                    Setelah ke TPS, share bukti kamu sudah memilih dengan cara foto jarimu dan posting di kolom komen di bawah ini dengan menceritakan suasana TPS di tempatmu.
                </div>
            </div>
            <div class="giftBox">
                <div class="left">
                    <img src="../../assets/img_screenshot 2019-03-26at10.06.56@3x.png" alt="giftBox">
                </div>
                <div class="right">
                    Akan ada hadiah menarik dari Caping untuk Capingers yang berpatisipasi!
                </div>
            </div>
        </div>

        <!-- 表情，评论，分享，展开评论列表 -->
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
        <v-comment v-if="commentShow" :dateId='dateId' :timeStatus = '1'/>
        <v-Loading v-show="loadingShow"/>
    </div>
</template>

<script>
import comment from '@/components/comment'
import {getCookie} from '@/util/Cookie'
import VEmojiPicker from 'v-emoji-picker';
import packData from 'v-emoji-picker/data/emojis.json';
import Loading from '@/components/Loading'

export default {
    data(){
        return{
            commentShow:false,
            commentText:'',
             pack: packData,
            emojiShow:false,
            loadingShow:false
        }
    },
    created(){
        window.shareSucceed = this.shareSucceed;
        
    },
    mounted(){
        document.getElementById("EmojiPicker").style.width='100%'
        document.getElementsByClassName("container-search")[0].style.height=0
        document.getElementById("Emojis").style.backgroundColor="#f0f0f0"
        if(getCookie('dateId')){
            this.dateId = getCookie('dateId')
        }
    },
    components:{
        'v-comment':comment,
        'v-Loading':Loading,
        VEmojiPicker
    },
     methods:{
        //  选择表情
        selectEmoji(emoji) {
            console.log(emoji.emoji)
            this.commentText =this.commentText + emoji.emoji
        },
        // 关闭分享
        shareSucceed(){this.closeShare()},
        // 分享
        share(){
            let content = ''
            content='Aku sudah vote untuk paslon pilihanku di event "Polling Pilpres" Caping. Siapa paslon pilihanmu? Yuk, vote di Caping sekarang!'
            let title = content
            let pic = null
            var url ='https://app.appsflyer.com/com.engloryintertech.caping?pid=Download'
            CapingJs.share(title,content,url,pic)
        },
        // 展开评论
        commentList(){
            this.commentShow = !this.commentShow
        },
        // 展开表情
        expression(){
            // alert('表情')
            this.emojiShow = !this.emojiShow
        },
        getFocus(){
            this.emojiShow = false
        },
        // input获取焦点事件
        // 评论  回车键触发
        doComment(){
            this.loadingShow = true
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
                    this.loadingShow = false
                })
                .catch(error => {
                    console.log(error.data)
                })
            }
        },
    }
}
</script>

<style scoped>
#PEMILU{
    background-color: #f6f6f6
}
.titleImg{
    width: 100%;
    height: 4.41rem;
}
.box,.hand,.giftBox{
    width: 95%;
    height: 1.85rem;
    margin: 0 auto;
    border-radius: 0.05rem;
    background-color: #fff;
    margin-bottom: 0.1rem;
    -moz-box-shadow:2px 2px 2px #333333; 
    -webkit-box-shadow:2px 2px 2px #333333; 
    box-shadow:2px 2px 2px #333333;
}
.left{
    height: 100%;
    width: 1.14rem;
    background-color:#af1919;
    border-top-left-radius: 0.05rem;
    border-bottom-left-radius: 0.05rem;
    text-align: center;
    float: left;
}
.left img{
    width: 0.95rem;
    height: 1.1rem;
    margin-top: 0.375rem;
}
.right{
    width: 2.0rem;
    height: 90%;
    border-top-right-radius: 0.05rem;
    border-bottom-right-radius: 0.05rem;
    text-align: center;
    padding: 0.1rem;
    font-size: 0.12rem;
    color: #000;
    line-height: 0.21rem;
    float: right;
    display: flex;
    justify-content:center;
    align-items:Center;
}
.giftBox .right{
    font-size: 0.15rem;
    font-weight: 600
}
.giftBox .left{
    background-color:#bc863d;
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
    -moz-box-shadow:2px 2px 5px #333333; 
    -webkit-box-shadow:2px 2px 5px #333333; 
    box-shadow:2px 2px 5px #333333;
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
    margin-top: 0.08rem;
    margin-left: 0.1rem;
    border-radius: 0.14rem;
    background-color: #f2f2f2;
    padding-left: 0.1rem;
    padding-right:0.1rem; 
    outline:none;
    float: left;
}
</style>
