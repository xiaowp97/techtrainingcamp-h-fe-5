<template>
  <div class="container">
    <div class="header">
      <h3>房间号：{{room_id}}</h3>
    </div>
    <div class="group-item"
         v-for="(item, index) in players"
         v-bind:index="index"
         v-bind:key="item.id">
      <span><img :class="{avatar:item.role_sta === 2}" src="../assets/people.png"
                 alt="player"/>玩家:{{item.name}}</span>
      <van-button class="van-button" color="linear-gradient(to right, #4bb0ff, #6149f6)" @click="changeState(item)">被刀
      </van-button>
      <van-button class="van-button" color="linear-gradient(to right, #4bb0ff, #6149f6)" @click="changeState(item)">猎杀
      </van-button>
      <van-button class="van-button" color="linear-gradient(to right, #4bb0ff, #6149f6)" @click="changeState(item)">毒杀
      </van-button>
      <van-button class="van-button" color="linear-gradient(to right, #4bb0ff, #6149f6)" @click="changeState(item)">放逐
      </van-button>
    </div>

    <div class="footer">
      <span v-if="isShow">
        <van-button color="linear-gradient(to right, #4bb0ff, #6149f6)" @click="startGame">开始</van-button>
        <van-button color="linear-gradient(to right, #4bb0ff, #6149f6)" @click="out">退出</van-button>
      </span>
      <span v-if="!isShow">
        <van-button color="linear-gradient(to right, #4bb0ff, #6149f6)" @click="changeUpdate">更新</van-button>
        <van-button color="linear-gradient(to right, #4bb0ff, #6149f6)" @click="gameOver">结束</van-button>
      </span>


    </div>

  </div>
</template>

<script>
  import {Toast} from 'vant';
  import {Dialog} from 'vant';

  export default {
    data() {
      return {
        // playersAllName: this.$store.state.playerData, //轮询时所有玩家信息
        timer: "",
        isShow: true,
        room_id: this.$store.state.roomID, //房间号
        deathRoles: [],//存放死亡玩家的数组
        godUUID: this.$store.state.godID, //获取上帝的uuid
        players:this.$store.state.playersAll,
        // players: [ //动态获取所有玩家信息(state中的playersAll)
        //   {
        //     id: "0", //玩家ID  ---------
        //     role_id: 3, //玩家角色(1--村民、2--女巫、3--预言家、4--猎人、6--狼人)----------
        //     role_sta: 1,  //玩家状态(死--2/活--1)------------
        //   //name:""
        //   },
        //   {
        //     id: "1",
        //     role_id: 1,
        //     role_sta: 1,
        //
        //   },
        //   {
        //     id: "2",
        //     role_id: 2,
        //     role_sta: 1,
        //
        //   },
        //   {
        //     id: "3",
        //     role_id: 4,
        //     role_sta: 1,
        //
        //   },
        //   {
        //     id: "4",
        //     role_id: 6,
        //     role_sta: 1,
        //   },
        //   {
        //     id: "5",
        //     role_id: 6,
        //     role_sta: 1,
        //   }
        // ],
      };
    },
    methods: {
      //返回玩家名称
      // playerNames(item){
      //   this.$store.state.Players.forEach(player => {
      //     if (player.id == item.userID) {
      //       return player.name;
      //     }
      //   })
      // },
      //改变玩家存活状态
      changeState(value) {
        value.role_sta = 2;
        this.deathRoles.push(value.id);
      },
      //上帝更新状态
      changeUpdate() {
        // 异步请求修改玩家状态
        const deathRoles = this.deathRoles;
        const godUUID = this.godUUID;
        this.$store.dispatch("changeState", {deathRoles, godUUID});
        //this.deathRoles = []; //清空死亡玩家
        setTimeout(() => {
          this.deathRoles = [];
        }, 1000)
      },
      //开始游戏
      startGame() {

        clearInterval(this.timer);
        this.isShow = false;
        this.$store.dispatch("startGame");
      },
      //结束游戏
      gameOver() {
        this.isShow = true;
        this.$store.dispatch("gameOver", this.godUUID)
      },
      //上帝退出房间
      out() {
        Dialog.confirm({
          title: "",
          message: "确定退出吗"
        }).then(() => {
          this.$store.dispatch("gameOver", this.godUUID);
          this.$router.back();
        })

      },
      //轮询
      loop() {
        if (this.$route.path === "/godcontrol/" + this.$store.state.personCounts) {
          this.timer = setInterval(() => {
            this.$store.dispatch("loopStatus", this.godUUID);
          }, 3000);
        }
      }
    },
    created() {
      this.loop();
    }
  }
</script>

<style scoped>
  /*.container {*/
  /*  overflow: scroll;*/
  /*  display: -webkit-flex;*/
  /*  display: flex;*/
  /*  flex-direction: column;*/
  /*  -webkit-flex-direction: column;*/
  /*  justify-content: center;*/
  /*  -webkit-justify-content: center;*/
  /*  width: 100%;*/
  /*  height: 667px;*/
  /*}*/
  .container {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: scroll;
    display: -webkit-flex;
    display: flex;
    flex-direction: column;
    -webkit-flex-direction: column;
    justify-content: center;
    -webkit-justify-content: center;
  }

  .header {
    /*flex: 1 1 auto;*/
    font-size: 16px;
    margin-bottom: -20px;
    background-color: #4bb0ff;
  }

  img {
    flex: 1 1 auto;
    max-width: 50%;
    height: auto;
  }

  .van-button {
    width: 15%;
    flex: 1 1 auto;
    border-radius: 10%;
    margin-left: 5px;
  }

  .group-item {
    flex: 1 1 auto;
    vertical-align: middle;
    display: -webkit-flex;
    display: flex;
    flex-direction: row;
    -webkit-flex-direction: row;
    align-items: center;
    -webkit-align-items: center;
    width: 100%;
    height: 100%;
    margin: 5px 5px;
  }

  .footer {
    margin-top: 10px;
    margin-bottom: 5%;
  }

  .avatar {
    filter: grayscale(100%);
  }

  img {
    width: 100px;
    height: 50px;
  }
</style>
