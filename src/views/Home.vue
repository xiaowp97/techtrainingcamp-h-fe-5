<template>
    <div>
      <div class="welcomePart">
        <label class="back" @click="$router.back()">返回</label>
        <h2>狼人杀</h2>
        <div class="userinfo">
          <img src="../assets/people.png" class="imagePeople">
        </div>
      </div>
      <button class="createPart" @click="createRoom">
        <label class="createlabel">创建房间</label>
      </button>
      <button class="joinPart" @click="joinRoom">
        <label class="joinlabel">加入房间</label>
      </button>
      <div class="helpPart" @click="help">
        <label class="helplabel">新手帮助</label>
      </div>
      <joinRoom v-show="showJoin" v-on:closeme="closeme"></joinRoom>
      <Tutorial v-show="showTutorial" v-on:closeme="closeme" :showTutorial = "showTutorial"></Tutorial>
    </div>
</template>

<script>
  import joinRoom from '../components/joinRoom'
  import Tutorial from '../components/BeginnerTutorial'
    export default {
        name: "Home.vue",
        components: {
            joinRoom,
            Tutorial
        },
        data: function () {
            return {
                showJoin: false,   //是否显示加入房间的弹框,
                showTutorial: false,   //是否显示新手教程
            }
        },
        methods: {
            createRoom(){
                this.$router.push('/createRoom')
            },
            joinRoom(){
                this.showJoin = true;
            },
            closeme(){
                this.showJoin = false;
                this.showTutorial = false;
            },
            help(){
                this.showTutorial = true;
            }
        },
        // created() {   //从sessionStorage中获取username
        //     let user = JSON.parse(sessionStorage.getItem('user') || '[]');
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
  .userinfo{
    position: absolute;
    left: 10px;
    top:70px;
    display: flex;
    align-items: center;
  }
  .imagePeople{
    width: 60px;
    height: 60px;
    display: inline-block;
    margin-right: 10px;
  }
  .createPart{
    background-image: url("../assets/create.png");
    background-repeat: no-repeat;
    background-origin: content-box;
    background-position-x: center;
    background-position-y: 10px;
    background-size: 80px 80px;
    background-color: cadetblue;
    border: 2px solid white;
    border-radius: 20px;
    width: 100%;
    height: 155px;
    position: relative;
    display: flex;
    justify-content: center;
  }
  .createlabel{
    position: absolute;
    top: 100px;
    color: white;
    font-size: 16px;
    font-family: "Berlin Sans FB Demi";
  }
  .joinPart{
    background-image: url("../assets/join.png");
    background-repeat: no-repeat;
    background-origin: content-box;
    background-position-x: center;
    background-position-y: 10px;
    background-size: 80px 80px;
    background-color: #87a072;
    border: 2px solid white;
    border-radius: 20px;
    width: 100%;
    height: 155px;
    position: relative;
    display: flex;
    justify-content: center;
  }
  .joinlabel{
    position: absolute;
    top: 100px;
    color: white;
    font-size: 16px;
    font-family: "Berlin Sans FB Demi";
  }
  .helpPart{
    background-image: url("../assets/help.png");
    background-repeat: no-repeat;
    background-origin: content-box;
    background-position-x: center;
    background-position-y: 10px;
    background-size: 80px 80px;
    background-color: #8772a0;
    border: 2px solid white;
    border-radius: 20px;
    width: 100%;
    height: 155px;
    position: relative;
    display: flex;
    justify-content: center;
  }
  .helplabel{
    position: absolute;
    top: 100px;
    color: white;
    font-size: 16px;
    font-family: "Berlin Sans FB Demi";
  }
  .back {
    position: absolute;
    top: 10px;
    left: 10px;
  }
</style>
