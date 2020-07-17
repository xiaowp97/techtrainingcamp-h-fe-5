<template>
  <div style='width:10rem'>
    <div class="welcomePart">
      <label class="back" @click="$router.back()">返回</label>
      <h2 style='font-size:0.8rem'>创建房间</h2>
      <h4 style='font-size:0.5rem'>您的角色是：上帝</h4>
    </div>
    <div class="roomNum">
      <div class="roomNumIn">
        <span class="room">房间号</span><input style="width:8rem" v-model="roomID">
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
    <button @click="cancelCreate" id="cancel">取消</button>
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
      cancelCreate() {
        this.personCount = 0;
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

  .roomNum {
    width:10rem;
    height: 3.5rem;
    font-size: 1rem;
    position: relative;
    background-color: #9999FF;
    border-radius: 0.5rem;
  }

  .roomNumIn {
    width: 8rem;
    position: absolute;
    top: 0.2rem;
    left: 50%;
    transform: translateX(-50%);
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
    background-size: 4rem;
    color: white;
    background-color: rgb(0, 33, 66);
    width: 100%;
    height: 6rem;
    margin-bottom: 5px;
    position: relative;
  }

  .personSum {
    background-position-x: center;
    background-position-y: 10px;
    background-size: 80px 80px;
    background-color: cadetblue;
    border: 2px solid white;
    border-radius: 0.5rem;
    width: 100%;
    height: 3.5rem;
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
    width: 80px;
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
  }
</style>
