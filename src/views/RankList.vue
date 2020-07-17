<template>
    <div>
      <van-nav-bar
        title="排行榜"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
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
            <span class="username">{{ item.name}} </span><span class="score">{{item.score}}</span>
          </div>
        </van-cell>
      </van-list>
    </div>
</template>

<script>
    export default {
        name: "RankList",
        data: function () {
            return {
                players:this.$store.state.Players, //玩家信息
                //该局游戏里所有玩家的排行榜
                scorelist:[
                    {"name":"12","score":40},
                    {"name":"111","score":0},
                    {"name":"121","score":20},
                    {"name":"1d1","score":0},
                    {"name":"1222b1","score":0},
                    {"name":"1b1","score":0}
                ]
            }
        },
        methods:{
            onClickLeft() {  //头部的返回
                this.$router.back();
            },
        }
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
  ul{
    list-style-type: none;
  }
  li{
    width: 280px;
    padding-top: 10px;
  }
  .showAPlayer{
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
    font-size: 1rem;
  }
  .score{
    position: absolute;
    left: 75%;
    font-size: 1rem;
  }
  p{
    display: inline-block;
  }
  .list-header{
    position: relative;
  }
  .username-header{
    position: relative;
    left: 35%;
    font-size: 1rem;
  }
  .score-header{
    position: relative;
    left: 60%;
    font-size: 1rem;
  }
</style>
