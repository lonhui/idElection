<template>
    <div id="DateList">
        <img src="../../assets/DateList_bg_bottom.png" alt="">
        <div class="header"></div>
        <div class="center">
            <div  v-for="item in data" :key="item.id">
                <v-date :data='item'></v-date>
            </div>
        </div>
        <v-Loading v-show="loadingShow"/>
    </div>
</template>

<script>
import Date from './component/Date'
import {getCookie} from '@/util/Cookie'
import Loading from '@/components/Loading'

export default {
    data(){
        return{
            loadingShow:false,
            data:[
                {
                    id:1,
                    date:'10.04.2019',
                    voteStatus:0,//0为未投票，1已投票，2特殊项
                    timeStatus:0,//0为未到投票时间，1已到投票时间
                    text:'HARI 01',
                    vote1NumberPer:null,//1号候选人百分比
                    vote2NumberPer:null,//2号候选人百分比
                    voteAvatarNum:null,//已经投票的目标候选人
                },
                {
                    id:2,
                    date:'11.04.2019',
                    voteStatus:0,
                    timeStatus:0,
                    text:'HARI 02',
                    vote1NumberPer:null,
                    vote2NumberPer:null,
                    voteAvatarNum:null,
                },
                {
                    id:3,
                    date:'12.04.2019',
                    voteStatus:0,
                    timeStatus:0,
                    text:'HARI 03',
                    vote1NumberPer:null,
                    vote2NumberPer:null,
                    voteAvatarNum:null,
                },
                {
                    id:4,
                    date:'13.04.2019',
                    voteStatus:0,
                    timeStatus:0,
                    text:'HARI 04',
                    vote1NumberPer:null,
                    vote2NumberPer:null,
                    voteAvatarNum:null,
                },
                {
                    id:5,
                    date:'14.04.2019',
                    voteStatus:0,
                    timeStatus:0,
                    text:'HARI 05',
                    vote1NumberPer:null,
                    vote2NumberPer:null,
                    voteAvatarNum:null,
                },
                {
                    id:6,
                    date:'15.04.2019',
                    voteStatus:0,
                    timeStatus:0,
                    text:'HARI 06',
                    vote1NumberPer:null,
                    vote2NumberPer:null,
                    voteAvatarNum:null,
                },
                {
                    id:7,
                    date:'16.04.2019',
                    voteStatus:0,
                    timeStatus:0,
                    text:'HARI 07',
                    vote1NumberPer:null,
                    vote2NumberPer:null,
                    voteAvatarNum:null,
                },
                {
                    id:8,
                    date:'17.04.2019',
                    voteStatus:2,
                    timeStatus:0,
                    text:'#CapingersAntiGolput',
                    vote1NumberPer:null,
                    vote2NumberPer:null,
                    voteAvatarNum:null,
                }
            ]
        }
    },
    components:{
        'v-date':Date,
        'v-Loading':Loading,
    },
    mounted(){
        if(getCookie('uid')){
            this.getList(getCookie('uid'))
        }else{
            this.$router.push('/')
        }
    },
    methods:{
        getList(uid){
            this.loadingShow = true
            this.$axios.post(process.env.API_ROOT+'/vote/votes',
            {id:uid},//用户id
            {headers:{'Content-Type':'application/json'}})
            .then(res => {
                console.log(res)
                if(res.data.code==0){
                    let voteInfos = res.data.data.voteInfos
                    for(let i = 0;i < voteInfos.length;i++){
                        for(let j = 0;j < this.data.length;j++){
                            if(voteInfos[i].id === this.data[j].id){
                                // 同步已投票状态
                                if(voteInfos[i].hasVote){
                                    this.data[j].voteStatus = 1
                                }else{
                                    this.data[j].voteStatus= 0 
                                }
                                //同步时间状态
                                this.data[j].timeStatus = voteInfos[i].canSHow 
                                // 
                                if(voteInfos[i].vote1NumberPer){this.data[j].vote1NumberPer=voteInfos[i].vote1NumberPer}
                                if(voteInfos[i].vote2NumberPer){this.data[j].vote2NumberPer=voteInfos[i].vote2NumberPer}
                                if(voteInfos[i].voteAvatarNum){this.data[j].voteAvatarNum=voteInfos[i].voteAvatarNum}
                            }
                        }
                    }
                }
                this.loadingShow = false
            })
            .catch(error => {
                console.log(error)
            })
        }
    }
}
</script>

<style scoped>
#DateList{
    width: 100%;
    background-color: #fff;
    
}
.header{
    width: 100%;
    height: 4.2rem;
    background:url('../../assets/DateList_bg_top.png');
    background-size:100% 100%;
    background-repeat:no-repeat;
}
.center{
    width: 100%;
    position: absolute;
    top:2.2rem;
}
#DateList img{
    width: 100%;
    position: absolute;
    bottom:-2.3rem
}

</style>
