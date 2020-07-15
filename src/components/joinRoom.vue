<template>
  <div class="modal-backdrop">
    <div class="modal">
      <div class="modal-header">
        <h3>进入房间</h3>
      </div>
      <div class="modal-body">
        <label style="font-size: 20px">房间号</label>
        <input type="text" id="roomID" v-model="roomID"><br>
        <label style="font-size: 20px">用户名</label>
        <input type="text" id="username" v-model="username">
      </div>
      <div class="modal-footer">
        <label v-show="!isFind" id="errorInfo">该房间不存在</label>
        <button type="button" class="btn-close" @click="closeSelf">关闭</button>
        <button type="button" class="btn-confirm" @click="confirm">确认</button>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'joinRoom',
    props: {},
    data() {
      return {
        isFind: true,   //表示是否找到玩家输入的房间
        roomID: "", //房间号
        username: ""//玩家名称
      }
    },
    methods: {
      //取消加入
      closeSelf() {
        this.$emit("closeme");
      },
      //确认加入房间
      confirm() {
        const roomID = this.roomID;
        const username = this.username;
        // this.$router.push('/roleshow');
        this.$store.dispatch('joinRooms', {roomID, username});
      }
    }
  }
</script>


<style>
  .modal-backdrop {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, .3);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal {
    background-color: #fff;
    box-shadow: 2px 2px 20px 1px;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
    border-radius: 16px;
    width: 80%;
    height: 40%;
    position: relative;
  }

  .modal-header {
    border-bottom: 1px solid #eee;
    color: #313131;
    justify-content: space-between;
    padding: 15px;
    display: flex;
  }

  .modal-footer {
    border-top: 1px solid #eee;
    justify-content: flex-end;
    padding: 15px;
    display: flex;
    position: absolute;
    bottom: 0;
    right: 10px;
  }

  .modal-body {
    position: relative;
    /*padding: 10px 10px;*/
    width: 100%;
    height: 100px;
    top: 30px;
    /*display: flex;*/
    /*align-items: center;*/
    /*justify-content: center;*/
  }

  #roomID {
    height: 20px;
  }

  #errorInfo {
    color: red;
    position: absolute;
    left: 10%;
  }

  .btn-close, .btn-confirm {
    border-radius: 8px;
    margin-left: 16px;
    width: 56px;
    height: 36px;
    border: none;
    cursor: pointer;
  }

  .btn-close {
    color: #313131;
    background-color: transparent;
  }

  .btn-confirm {
    color: #fff;
    background-color: #2d8cf0;
    margin-top: 5px;
  }

  * {
    box-sizing: border-box;
  }

</style>
