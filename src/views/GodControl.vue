<template>
  <div class="main">
    <div class="container">
      <div class="header">
        <h3>房间号：{{ room_id }}</h3>
      </div>
      <div
        class="group-item"
        v-for="(item, index) in players"
        v-bind:index="index"
        v-bind:key="item.id"
      >
        <table class="userbanner">
          <tr>
            <td style="height: 60px;width:90px">
              <img
                :class="{ avatar: item.role_sta === 2 }"
                class="useravatar"
                src="../assets/people.png"
                alt="player"
              />
            </td>
          </tr>
          <tr>
            <td>
              <span class="username" style="word-break: break-all;"
              >{{ item.role_name }}{{ item.name }}
              </span>
            </td>
          </tr>
        </table>
        <div class="contol_bar"
            :class="{ deathStyle : item.role_sta === 2 }" 
             @click="clickToChangeStyle">
          <van-button round
                      class="control_button"
                      color="linear-gradient(to right, #4bb0ff, #6149f6)"
                      @click="changeState(item)"

          >被刀
          </van-button>
          <van-button round
                      class="control_button"
                      color="linear-gradient(to right, #4bb0ff, #6149f6)"
                      @click="changeState(item)"
          >猎杀
          </van-button>
          <van-button round
                      class="control_button"
                      color="linear-gradient(to right, #4bb0ff, #6149f6)"
                      @click="changeState(item)"
          >毒杀
          </van-button>
          <van-button round
                      class="control_button"
                      color="linear-gradient(to right, #4bb0ff, #6149f6)"
                      @click="changeState(item)"
                      style="margin-right: 15px"
          >放逐
          </van-button>
        </div>
      </div>
    </div>

    <div class="footer">
      <span v-if="isShow">
        <van-button
          v-if="players.length == personCounts"
          round
          class="button_left"
          color="linear-gradient(to right, #4bb0ff, #6149f6)"
          @click="startGame"
        >开始</van-button
        >
        <van-button
          round
          class="button_right"
          color="linear-gradient(to right, #4bb0ff, #6149f6)"
          @click="out"
        >退出</van-button
        >
      </span>
      <span v-if="!isShow">
        <van-button
          round
          class="button_left"
          color="linear-gradient(to right, #4bb0ff, #6149f6)"
          @click="changeUpdate"
        >更新</van-button
        >
        <van-button
          round
          class="button_right"
          color="linear-gradient(to right, #4bb0ff, #6149f6)"
          @click="gameOver"
        >结束</van-button
        >
      </span>
    </div>
  </div>
</template>


<script>
  import {Dialog} from 'vant';

  export default {
    data() {
      return {
        // playersAllName: this.$store.state.playerData, //轮询时所有玩家信息
        timer: "",
        isShow: true,
        room_id: this.$store.state.roomID, //房间号
        deathRoles: [],//存放死亡玩家的数组
        personCounts : this.$store.state.personCounts,
      };
    },
    computed: {
      players() {
        return this.$store.state.playersAll
      },
      godUUID() {
        return this.$store.state.godID
      }
    },
    methods: {
      clickToChangeStyle(e) {
        if(e.target.nodeName == "BUTTON") {
          e.target.classList.toggle('clickStyle');
        }
      },
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
        //value.role_sta = 2;
        const index = this.deathRoles.indexOf(value.id);
        if (index == -1) this.deathRoles.push(value.id);
        else {
          this.deathRoles.splice(index, 1);
        }
      },
      //上帝更新状态
      changeUpdate() {
        // 异步请求修改玩家状态
        const deathRoles = this.deathRoles;
        this.$store.dispatch("changeState", deathRoles);
        //this.deathRoles = []; //清空死亡玩家
        setTimeout(() => {
          this.deathRoles = [];
        }, 1000)
      },
      //开始游戏
      startGame() {
          //清除上帝页轮询
          clearInterval(this.timer);
          this.isShow = false;
          this.$store.dispatch("startGame");
      },
      //结束游戏
      gameOver() {
        this.isShow = true;
        this.$store.dispatch("gameOver")
      },
      //上帝退出房间
      out() {
        Dialog.confirm({
          title: "",
          message: "确定退出吗"
        }).then(() => {
          this.$store.dispatch("gameOver");
          this.$router.back();
        })
      },
      //轮询
      loop() {
        if (this.$route.path === "/godcontrol/" + this.$store.state.personCounts) {
          this.timer = setInterval(() => {
            this.$store.dispatch("loopStatus");
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
  .main {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: -1;
  }
  .container {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 45px;
    left: 0;
    z-index: -1;
    scrollbar-width: none; /* firefox */
    -ms-overflow-style: none; /* IE 10+ */
    overflow-x: hidden;
    overflow-y: scroll;
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
    height: 80px;
    margin: 30px 0px 50px 0px;
  }

  .userbanner {
    margin-left: 5%;
  }

  .useravatar {
    height: 100%;
  }
  .avatar {
    filter: grayscale(100%);
    pointer-events:none;
  }

  .username {
    left: 0px;
  }

  .contol_bar {
    width: 100%;
    padding-bottom: 5%;
  }

  .control_button {
    flex: 1 1 auto;
    margin-left: 0;
    margin-right: 0;
    margin-left: 2px;
    width: 20%;
  }
  .footer {
    position: absolute;
    right: 0;
    left: 0;
    height: 36px;
    bottom: 5%;
  }

  .button_left {
    width: 30%;
    min-width: 110px;
    height: 36px;
    cursor: pointer;
    position: absolute;
    bottom: 5%;
    left: 10%;
    font-family: "Berlin Sans FB Demi";
    font-size: 16px;
  }

  .button_right {
    width: 30%;
    min-width: 110px;
    height: 36px;
    cursor: pointer;
    position: absolute;
    bottom: 5%;
    right: 10%;
    font-family: "Berlin Sans FB Demi";
    font-size: 16px;
  }
  .clickStyle {
    background: rgb(136, 0, 0) !important;
  }
  .deathStyle {
    pointer-events: none;
  }
</style>
