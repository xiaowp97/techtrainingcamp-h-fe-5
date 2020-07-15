<template>
  <div>
    <div class="welcomePart">
      <label class="back" @click="$router.back()">返回</label>
      <h2>角色信息</h2>
      <h4>您的角色是：<span style="color: red">{{players[0].roleName}}</span></h4>
    </div>
    <div class="roleIntroduction">
      <p v-html="roleIntro">
        <!--          {{roleIntro}}-->
      </p>
    </div>
    <div class="gameState">
      <span>游戏状态：</span><span id="state">{{playerState}}</span>
    </div>
    <div class="operatBtn">
      <!--        根据玩家状态显示可执行的操作-->
      <button v-if="gameState=='2'" @click="refresh">状态刷新</button>
      <button v-if="gameState=='0'" @click="lookResult">查看结果</button>
      <button @click="outRoom">退出房间</button>
    </div>
  </div>
</template>

<script>
  import { MessageBox } from 'mint-ui';
  export default {
    data: function () {
      return {
        players: this.$store.state.Players, //玩家信息
        gameState: this.$store.state.playerData.role_sta || 0, //玩家游戏状态
        roleIntro: '',
        playerState: "未开始",
        roleName:"村民"
      }
    },
    methods: {
      //状态更新
      refresh() {
        //刷新角色状态，向服务器发送请求
        this.$store.dispatch('refreshState');
        if (this.gameState === 2) {
          this.playerState = "存活"
        } else if (this.gameState === 3) {
          this.playerState = "死亡"
        }else if (this.gameState === 0){
          this.playerState = "未开始"
        }else if (this.gameState === 1) {
          this.playerState = "已结束"
        }
      },
      //查看结果
      lookResult() {
        this.$router.push('/gameresult')
      },
      //退出房间
      outRoom(){
        MessageBox.confirm("确定退出吗").then(action =>{
          this.$router.back();
        }).catch(e =>{
        })
      }
    },
    created() {   //根据角色展示技能
      if (this.roleName === '女巫') {
        this.roleIntro = '你有一瓶毒药和解药，解药可以救人，毒药可以杀人；</br>你一天晚上可以用两瓶药，用过解药过后就再也不知道今晚谁死了；</br>\n' +
          '          被你毒死的玩家白天没有遗言，且毒死的猎人无法发动技能；';
      } else if (this.roleName === '预言家') {
        this.roleIntro = '你每天晚上可以询问上帝任意一张活人的身份，上帝会通过手势告诉你这个人是好人还是坏人。'
      } else if (this.roleName === '猎人') {
        this.roleIntro = "如果你不是被女巫毒死的话，你在死后可以选择发动技能带走场上任何一个人。"
      } else if (this.roleName === '狼人') {
        this.roleIntro = '你和你的伙伴晚上需要统一意见杀死任意一名玩家。</br>你可以在游戏的任何阶段选择自爆，自爆后，游戏将立刻中止并且直接进入天黑。</br>利用你的智慧与你的同伴一起取得胜利吧!!!'
      } else { // 村民
        this.roleIntro = '你只是一名普通的村民，没有任何技能。</br>利用你的智慧找出狼人吧!!！'
      }
    }
  }
</script>

<style scoped>
  html, body {
    margin: 0;
    padding: 0;
  }

  h2 {
    text-align: center;
    margin: 0;
    padding: 0;
    font-family: "Berlin Sans FB Demi";
  }

  .back {
    position: absolute;
    top: 10px;
    left: 10px;
  }

  h4 {
    position: absolute;
    left: 10px;
    bottom: 10px;
  }

  .welcomePart {
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

  .roleIntroduction {
    margin-top: 40px;
    border: 1px solid black;
    border-radius: 5px;
    margin-bottom: 6px;
    margin-bottom: 40px;
  }

  .gameState {
    border: 1px solid black;
    border-radius: 5px;
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  #state {
    color: red;
  }

  .operatBtn {
    margin-top: 40px;
  }

  button {
    border-radius: 8px;
    color: #fff;
    background-color: rgba(0, 33, 66, 0.8);
    width: 80px;
    height: 36px;
    border: none;
    cursor: pointer;
  }
</style>
