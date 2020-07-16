<template>
  <div class="main">
    <div class="header">
      <h2 class="roleinfo">角色展示</h2>
    </div>
    <div class="showotherplayer">
      <div v-for="player in otherPlayers" :key="player.username" class="singlePlayer">
        <img src="../assets/people.png" :class="{died: player.rolestatus===1}">
        <label>{{player.username}}</label>
      </div>
    </div>
    <div class="showcurrentplayer" v-if="currentPlayer.rolestatus==0 || currentPlayer.rolestatus==1">
      <img :src="currentPlayer.playerimage">
      <div class="right">
        <span>你的身份:<label class="rolename">【 {{ currentPlayer.rolename }} 】</label></span>
        <div>
          <div class="status">
            <van-divider :style="{ color: '#14aea3', borderColor: '#ffffff', marginTop: '10px', marginBottom: '10px'}">游戏状态</van-divider>
            <label v-if="currentPlayer.rolestatus===0">游戏中</label>
            <label v-else>已死亡</label>
          </div>
          <van-divider :style="{ color: '#26c622', borderColor: '#ffffff', marginTop: '10px', marginBottom: '10px'}">角色技能</van-divider>
          <div>
            <span class="skill">【技能】：{{currentPlayer.playerskill}}</span>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="preparing">
      <van-loading type="spinner" size="50">等待其他玩家进入</van-loading>
    </div>
    <div class="bottom">
      <van-button color="linear-gradient(to right, #6149f6, #4bb0ff)">刷新状态</van-button>
      <van-button color="linear-gradient(to right, #4bb0ff, #6149f6)">退出房间</van-button>
    </div>
  </div>
</template>

<script>
    export default {
        name: "RoleShow.vue",
        data: function () {
            return {
                currentPlayer: {
                    rolestatus: 3,
                    rolename: '预言家',
                    playerimage: '',
                    playerskill: ''
                },
                otherPlayers: [
                    { username: 'aaa', rolestatus: 0},
                    { username: 'bbb', rolestatus: 0},
                    { username: 'eee', rolestatus: 1},
                    { username: 'aaa', rolestatus: 0},
                    { username: 'bbb', rolestatus: 0},
                    { username: 'eee', rolestatus: 1}
                ]
            }
        },
        created(){
            let currPlayer = this.currentPlayer;
            console.log(currPlayer);
            if(currPlayer.rolename === '狼人'){
                currPlayer.playerimage = `/static/img/langren.jpg`;
                currPlayer.playerskill = '';
            }
            else if(currPlayer.rolename === '平民'){
                currPlayer.playerimage = `/static/img/pingming.jpg`;
                currPlayer.playerskill = '无特殊技能，一觉睡到天亮。';
            }
            else if(currPlayer.rolename === '预言家'){
                currPlayer.playerimage = `/static/img/yuyanjia.jpg`;
                currPlayer.playerskill = '每天晚上可以查验一名玩家的身份是好人还是狼人。';
            }
            else if(currPlayer.rolename === '女巫'){
                currPlayer.playerimage = `/static/img/nvwu.jpg`;
                currPlayer.playerskill = '女巫有两瓶药，解药可以救人，毒药可以杀人.';
            }
            else if(currPlayer.rolename === '猎人'){
                currPlayer.playerimage = `/static/img/lieren.jpg`;
                currPlayer.playerskill = '猎人死的时候可以带走场上任意一名玩家';
            }
        }
    }
</script>

<style scoped>
  .main{
    position: relative;
    width: 100%;
    height: 100%;
  }
  .header{
    background-color: #9999FF;
  }
  .died{
    -webkit-filter: grayscale(100%);
    -moz-filter: grayscale(100%);
    -o-filter: grayscale(100%);
    filter: grayscale(100%);
  }
  .showotherplayer {
    width: auto;
    height: auto;
    background-color: #fff;
    border-radius: 8px;
    border: 2px solid transparent;
    border-image: linear-gradient(to top,#F80,#2ED);
    border-image-slice: 10;
    margin-bottom: 1%;
  }
  .showcurrentplayer{
    height: auto;
    width: 100%;
    color: white;
    background-color: rgba(0,0,0,0.7);
  }
  .right{
    width: 50%;
    float: right;
    font-size: 1rem;
    padding-top: 15%;
  }
  img{
    width: 50%;
  }
  .preparing{
    height: 30%;
    padding-top: 10%;
  }
  .status{
    height: 15%;
  }
  .rolename{
    color: red;
  }
  .status>label{
    height: 5%;
    color: red;
  }
  .bottom{
    position: absolute;
    bottom: 0;
    padding-left: 10%;
  }
  button{
    border-radius: 8px;
    background-color: #87CEFA;
    color: white;
  }
  .otherPlayers {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
  .singlePlayer{
    width: 20%;
    height: 15%;
    display: inline-block;
    margin: 5%;
  }
  .singlePlayer>img{
    width:100%;
    height: 100%;
  }
  .skill{
    font-size: 0.8rem;
  }
</style>
