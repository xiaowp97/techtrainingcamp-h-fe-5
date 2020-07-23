<template>
    <div>
      <van-nav-bar
        left-text="返回"
        left-arrow
        @click-left="outRank"
      />
      <van-nav-bar
        title="积分榜"
      />
      <van-list>
        <van-cell>
          <div class="list-header">
            <span class="username-header">名&nbsp;&nbsp;&nbsp;称</span><span class="score-header">分&nbsp;&nbsp;&nbsp;数</span>
          </div>
        </van-cell>
        <van-cell v-for="item in scorelist" :key="item.name">
          <div class="showAPlayer">
            <img src="../assets/people.png">
<!--            如果item.name == currentPlayerName,表示是当前玩家，字体变红色-->
            <span class="username" :class="{currentPlayer: item.name == currentPlayerName}">{{ item.name}} </span>
            <span class="score" :class="{currentPlayer: item.name == currentPlayerName}">{{item.score}}</span>
          </div>
        </van-cell>
      </van-list>
    </div>
</template>

<script>
  export default {
    playerId: JSON.parse(window.localStorage.getItem("roleID")),//该房间当前玩家uuid
    name: "RankList",
    data: function () {
      return {}
    },
    computed: {
      scorelist () {
        return this.$store.state.playerScore
      },
      currentPlayerName () {
        return this.$store.state.playerName
      }
    },
    methods:{
      outRank(){
        clearInterval(this.$store.state.timer);
        this.$store.dispatch("OutRoom",this.playerId);
        this.$router.push("/home");
      }
    }
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
  ul{
    list-style-type: none;
  }
  li{
    width: 280px;
    padding-top: 10px;
  }
  .showAPlayer{
    font-size: 16px;
    position: relative;
  }
  img{
    width: 10%;
    height: 10%;
    position: relative;
    left: 10%;
  }
  .username{
    position: absolute;
    left: 40%;
    font-size: 16px;/*原来 1rem */
  }
  .score{
    position: absolute;
    left: 75%;
    font-size: 16px; /* 原来1rem */
  }
  p{
    display: inline-block;
  }
  .list-header{
    font-size: 16px;
    position: relative;
  }
  .username-header{
    position: relative;
    left: 35%;
    font-size: 16px;/*原来 1rem */
  }
  .score-header{
    position: relative;
    left: 60%;
    font-size: 16px;/*原来 1rem */
  }
  .currentPlayer{
    color: red;
  }
</style>
