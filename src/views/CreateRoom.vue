<template>
  <div>
    <div class="welcomePart">
      <label class="back" @click="$router.back()">返回</label>
      <h2>创建房间</h2>
      <h4>您的角色是：上帝</h4>
    </div>
    <div class="roomNum">
      <div class="roomNumIn">
        <span class="room">房间号</span><input v-model="roomID" maxlength="6">
      </div>
    </div>
    <div class="personSum" :class="{on:personCount===6}" @click="personCount=6">
      <label class="countlabel">6人房</label>
    </div>
    <div class="personSum" :class="{on:personCount===8}" @click="personCount=8">
      <label class="countlabel">8人房</label>
    </div>
    <div class="personSum" :class="{on:personCount===10}" @click="personCount=10">
      <label class="countlabel">10人房</label>
    </div>
    <button @click="confirmCreate" id="confirm">创建</button>
<!--    <button @click="cancelCreate" id="cancel">取消</button>-->
  </div>
</template>

<script>
  export default {
    name: "createRoom.vue",
    data: function () {
      return {
        personCount: this.$store.state.personCounts,     //房间人数，6/8/10
        roomID: "",
      }
    },
    methods: {
      confirmCreate() {   //创建房间时将房间人数传给上帝控制页面
        //判断创建房间号是否为空
        if (this.roomID === "") {
          alert("房间号不能为空");
          return;
        } else if (isNaN(this.roomID)) {//判断创建房间号是否为数字
          alert("房间号只能为数字");
          return;
        }
        const personCount = this.personCount;
        const roomID = this.roomID;
        if (personCount === 0) return;   //用户必须选择房间人数
        this.$store.dispatch("createRooms", {personCount, roomID});
      },
      // cancelCreate() {
      //   this.personCount = 0;
      // }
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

  .roomNum {
    height: 80px;
    font-size: 24px;
    position: relative;
    background-color: #9999FF;
    border-radius: 20px;
  }

  .roomNumIn {
    width: 400px;
    position: absolute;
    top: 20px;
    left: 50%;
    transform: translateX(-200px);
  }

  .room {
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

  .personSum {
    background-position-x: center;
    background-position-y: 10px;
    background-size: 80px 80px;
    background-color: cadetblue;
    border: 2px solid white;
    border-radius: 20px;
    width: 100%;
    height: 100px;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .countlabel {
    color: white;
    font-size: 20px;
    font-family: "Berlin Sans FB Demi";
  }

  button {
    margin-top: 30px;
    border-radius: 8px;
    color: #fff;
    background-color: rgba(0, 33, 66, 0.8);
    width: 120px;
    height: 36px;
    border: none;
    cursor: pointer;

  }

  #comfirm {
    margin-right: 10px;
  }

  #cancel {
    margin-right: 10px;
  }

  .on {
    background-color: red;
  }

  input {
    height: 24px;
    margin-bottom: 5px;
    width: 150px;
  }
</style>
