<template>
  <div class="main">
    <div class="welcomePart">
      <label class="back" @click="$router.back()">返回</label>
      <h2>上帝操控</h2>
      <h4 class="numlabel">当前房间里有{{currentNum}}位玩家</h4>
    </div>
    <div class="playerinfo">
      <ul>
        <li v-for="player in players">
          <span id="name">{{player.username}}是<span id="rolename">{{player.rolename}}</span></span><!--
          --><span :class="{isShowColor: player.rolestatus=='被刀'}" id="beKill">{{updateState}}</span><!--
          --><span :class="{isShowColor: player.rolestatus=='猎杀'}" id="hunt">{{updateState}}</span><!--
          --><span v-if="player.rolename!=='女巫'" :class="{isShowColor: player.rolestatus=='毒死'}" id="poison">{{updateState}}</span>
        </li>
      </ul>
      <div class="operatBtn">
        <!--        当房间已有人数等于既定人数时，显示开始游戏按钮-->
        <button v-if="currentNum==$route.params.personCount" @click="gameStart">开始游戏</button>
        <button v-else @click="forcedEnd">强行结束</button>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "GodControl1.vue",
        data() {
            return {
                players: [
                    {
                        username: 'aaa',
                        rolename: '村民',
                        rolestatus: '猎杀'
                    },
                    {
                        username: 'bbb',
                        rolename: '女巫',
                        rolestatus: '猎杀'
                    },
                    {
                        username: 'ccc',
                        rolename: '预言家',
                        rolestatus: '被刀'
                    },
                    {
                        username: 'ddd',
                        rolename: '猎人',
                        rolestatus: '猎杀'
                    },
                    {
                        username: 'eee',
                        rolename: '狼人',
                        rolestatus: '毒死'
                    },
                    {
                        username: 'eee',
                        rolename: '狼人',
                        rolestatus: '毒死'
                    }
                ],
            }
        },
        methods:{
            forcedEnd: function () {  //强制结束游戏
                this.$router.push('/login');
            },
            gameStart(){
                //游戏开始，向服务器发送消息
            },
          fetchUserState() {
              this.$http.get('https://afqg3f.fn.thelarkcloud.com/BroadcastState:1234')
          }
        },
        computed: {
            currentNum: function () {   //房间里已经有多少位玩家进入
                return this.players.length;
            },
          updateState: function (user_id) {
            this.players.rolestatus = this.$store.state.users.role_sta;
            return this.players.rolestatus;
          }
        },
    }
</script>

<style scoped>
  html,body{
    margin: 0;
    padding: 0;
  }
  h2{
    text-align: center;
    margin: 0;
    padding: 0;
    font-family: "Berlin Sans FB Demi";
  }
  h4{
    position: absolute;
    left: 10px;
    bottom: 10px;
  }
  .main{
    height: 600px;
  }
  .welcomePart{
    background-image: url("../assets/wolf.jpg");
    background-repeat: no-repeat;
    background-position: right bottom;
    background-size: 120px 120px;
    color: white;
    background-color: rgb(0, 33, 66);
    width: 100%;
    height: 170px;
    margin-bottom: 5px;
    position: relative;
  }
  .back {
    position: absolute;
    top: 10px;
    left: 10px;
  }
  .numlabel{
    position: absolute;
    left: 10px;
    bottom: 10px;
  }
  .playerinfo{
    height: 300px;
    width: 400px;
    margin-top: 50px;
    margin-left: -40px;
  }
  li{
    list-style: none;
    text-align: left;
    margin-top: 5px;
    left: 20%;
  }
  #rolename{
    color: red;
  }
  #name{
    width: 140px;
    border: 1px solid black;
    border-right: none;
    text-align: center;
  }
  li>span{
    display: inline-block;
    width: 40px;
  }
  #beKill{
    width: 50px;
    text-align: center;
    border: 1px solid black;
    border-right: none;
  }
  #hunt{
    width: 50px;
    text-align: center;
    border: 1px solid black;
  }
  #poison{
    width: 50px;
    text-align: center;
    border: 1px solid black;
    border-left: none;
  }
  .isShowColor{
    background-color: skyblue;
  }
  .operatBtn{
    margin-top: 40px;
    margin-left: 40px;
  }
  button{
    border-radius: 8px;
    color: #fff;
    background-color: rgba(0, 33, 66,0.8);
    width:80px;
    height: 36px;
    border:none;
    cursor: pointer;
  }
</style>
