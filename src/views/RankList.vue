<template>
    <div>
      <div class="welcomePart">
        <label class="back" @click="$router.back()">返回</label>
        <h2>排行榜</h2>
        <div class="userinfo">
          <img src="../assets/people.png" class="imagePeople">
        </div>
      </div>
      <ul>
        <li v-for="(player,index) in players" :key="index">
          <span>玩家ID---{{player.userID}}</span>
          <span>赢{{player.win}}局</span>
        </li>
      </ul>
    </div>
</template>

<script>
    export default {
        name: "RankList",
        data: function () {
            return {
                players:this.$store.state.Players //玩家信息
            }
        },
        // created() {
        //     let user = JSON.parse(sessionStorage.getItem('user') || '[]');
        //     console.log("user:"+user);
        //     this.username = user.username;
        // }
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
  .userinfo{
    position: absolute;
    left: 10px;
    top:70px;
    display: flex;
    align-items: center;
  }
  .back {
    position: absolute;
    top: 10px;
    left: 10px;
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
  .imagePeople{
    width: 60px;
    height: 60px;
    display: inline-block;
    margin-right: 10px;
  }
  ul{
    list-style-type: none;
  }
  li{
    width: 280px;
    padding-top: 10px;
  }
</style>
