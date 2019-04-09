<template>
    <div id="comment">
        <p class="title">Suara Capingers</p>
        
        <div class="center" v-for="item in commentList" :key="item.id">
            <div class="comment">
                <div class="avatar">
                    <img :src="item.imageUrl?item.imageUrl:'../assets/member_img_avatar@2x.png'" alt="avatar">
                </div>
                <div class="comment_text">
                    <div class="text">
                        <p class="name">{{item.userNickName}}</p>
                        <p class="text_content">{{item.content}}</p>
                    </div>
                    <div class="info">
                       <span>{{item.commentTime}}</span>
                       <!-- <span :style="{color:'#6fb52d',margin:'0 0 0 0.1rem'}">· 12 Balasan</span> -->
                       <div class="awesome">
                           <!-- 赞 -->
                           <img :src="item.likeComment===1?awesome_y:awesome_n" @click="awesome(item.id,1)" alt="awesome">
                           <span>{{item.likeCount}}</span>
                           <!-- 踩 -->
                           <img :src="item.likeComment===0?Step_on_y:Step_on_n" @click="awesome(item.id,0)" :style="{margin:'0 0 0 0.15rem'}" alt="stepOn">
                           <span>{{item.dislikeCount}}</span>
                       </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="loading" v-if="loagdingShow">
            <span></span>
            <span></span>
            <span></span>
        </div>

        <div class="more" @click="more">Tampilkan Lebih Banyak</div>

    </div>
</template>

<script>
import {getCookie} from '../util/Cookie'

export default {
    props:['dateId','timeStatus'],
    data(){
        return{
            loagdingShow:false,
            commentList:[],
            pageNo:1,
            count:0,
            awesome_y:require('../assets/awesome_y.png'),
            awesome_n:require('../assets/awesome_n.png'),
            Step_on_y:require('../assets/Step_on_y.png'),
            Step_on_n:require('../assets/Step_on_n.png'),
        }
    },
    mounted(){
        this.getCommentList()
    },
    methods:{
        childClick() {
            if(this.pageNo === 1 ){
                this.getCommentList()
            }
        },
        // 点赞、踩（评论id,赞或踩）赞1，踩0
        awesome(commentId,likeComment){
            if(this.timeStatus === 1){
                this.$axios.post(process.env.API_ROOT+'/vote/doCommentLikeOrDislike',
                {
                uid:Number(getCookie('uid')),//用户id
                commentId:commentId,
                likeComment:likeComment
                },
                {headers:{'Content-Type':'application/json'}})
                .then(res => {
                    if(res && res.data.code === 0){
                    this.commentList.map(item => {
                        if(item.id === commentId){
                                if(item.likeComment === likeComment){
                                        switch(item.likeComment){
                                            case 0: --item.dislikeCount;break;
                                            case 1: --item.likeCount;break;
                                        }
                                        item.likeComment = -1
                                }else{
                                    if(likeComment === 0){
                                        switch(item.likeComment){
                                                case -1: item.dislikeCount += 1
                                                        break
                                                case 0: item.dislikeCount -= 1
                                                        break
                                                case 1: item.likeCount -= 1
                                                        item.dislikeCount += 1
                                                        break
                                            }
                                    }else{
                                        switch(item.likeComment){
                                                case -1: item.likeCount += 1
                                                        break
                                                case 0: item.dislikeCount -= 1
                                                        item.likeCount += 1
                                                        break
                                                case 1: item.likeCount -= 1
                                                        break
                                            }
                                    }
                                    item.likeComment = likeComment
                                }
                            }
                        })
                    }
                })
                .catch(error => {
                    console.log(error)
                })
            }else{
                this.$emit('on-open')
            }
        },
        more(){
            this.loagdingShow = true
            this.$axios.post(process.env.API_ROOT+'/vote/voteComments',
            {
              uid:Number(getCookie('uid')),//用户id
              voteId:Number(this.dateId),//日期id
              pageNO:++this.pageNo,  
              pageSize:7
            },
            {headers:{'Content-Type':'application/json'}})
            .then(res => {
                if(res.data.code === 0){
                    res.data.data.commentList.map((item)=>{
                        let date = new Date(item.createTime)+''
                        let dateArr = date.split(' ')
                        item.commentTime = dateArr[2]+' '+dateArr[1]+' '+dateArr[3]+' | '+dateArr[4]
                    })
                    this.commentList = this.commentList.concat(res.data.data.commentList)
                    this.count = res.data.data.count
                }
                console.log(res)
                this.loagdingShow = false
            })
            .catch(error => {
                console.log(error)
                this.loagdingShow = false
            })
        },
        getCommentList(){
            this.loagdingShow = true
            this.$axios.post(process.env.API_ROOT+'/vote/voteComments',
            {
              uid:Number(getCookie('uid')),//用户id
              voteId:this.dateId?Number(this.dateId):Number(getCookie('dateId')),//日期id
              pageNO:1,  
              pageSize:7
            },
            {headers:{'Content-Type':'application/json'}})
            .then(res => {
                if(res.data.code === 0){
                    res.data.data.commentList.map((item)=>{
                        let date = new Date(item.createTime)+''
                        let dateArr = date.split(' ')
                        item.commentTime = dateArr[2]+' '+dateArr[1]+' '+dateArr[3]+' | '+dateArr[4]
                    })
                    this.commentList = res.data.data.commentList
                    this.count = res.data.data.count
                }
                console.log(res)
                this.loagdingShow = false
            })
            .catch(error => {
                console.log(error)
                this.loagdingShow = false
            })
        },
    }
}
</script>

<style scoped>
#comment{
    padding: 0.1rem;
    background-color: #fff;
    padding-bottom: 0;
}
.title{
    font-size: 0.14rem;
    color: #3a3a3a;
    border-left: 0.02rem #6fb52d solid;
    padding-left: 0.1rem;
}

/* ******* */
.center{
    margin-top: 0.1rem;
}
.comment{
    display: flex;
    flex-direction: row;
}
.avatar{
    width: 0.4rem;
    margin-right: 0.1rem;
}
.avatar img{
    width: 0.4rem;
    border-radius: 0.2rem;
    float: left;
}

.comment_text{
    width: 90%;
    font-size: 0.1rem;
    line-height: 0.19rem;
    color: rgba(0, 0, 0, 0.5);
}
.comment_text .text{
    padding: 0.05rem;
    background-color: #f2f2f2;
    border-radius: 0.08rem;
}
.comment_text .text .name{
    font-weight: 600
}
.info{
    margin-top: 0.05rem
}
.awesome{
    line-height: 0.18rem;
    float: right;
}
.awesome img{
    width: 0.18rem;
    height: 0.18rem;
}
.awesome span{
    position: relative;
    top:-0.05rem;
}
/* ********** */
.more{
    border-top: 0.005rem #f2f2f2 solid;
    border-bottom: 0.005rem #f2f2f2 solid;
    font-size: 0.12rem;
    color: #6fb52d;
    text-align: center;
    line-height: 0.4rem;
    margin-top: 0.1rem;
}
.text_content{
    word-break:break-all;
}
/* ************* */
.loading{
    width: 0.8rem;
    height: 1.2rem;
    margin: 0 auto;
}
.loading span{
    display: inline-block;
    width: 0.06rem;
    height: 100%;
    border-radius: 0.03rem;
    background: lightgreen;
    -webkit-animation: load 1s ease infinite;
}
@-webkit-keyframes load{
    0%,100%{
        height: 0.2rem;
        background: lightgreen;
    }
    50%{
        height: 0.60rem;
        margin: -0.15rem 0;
        background: lightblue;
    }
}
.loading span:nth-child(2){
    -webkit-animation-delay:0.2s;
}
.loading span:nth-child(3){
    -webkit-animation-delay:0.4s;
}
.loading span:nth-child(4){
    -webkit-animation-delay:0.6s;
}
.loading span:nth-child(5){
    -webkit-animation-delay:0.8s;
}
</style>
