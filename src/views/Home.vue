<template>
  <div class="main">
    <van-nav-bar
      title="首页"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="selectOpera">
      <van-tabs v-model="operation">
        <van-tab title="加入房间" name="joinRoom" :style="{marginTop: '50px'}">
          <div class="joinRoominfo">
            <van-field
              v-model="username"
              rows="1"
              autosize
              label="用户名"
              type="textarea"
              placeholder="请输入用户名"
              :style="{ marginBottom: '20px'}"
            />
            <van-field
              v-model="joinroomID"
              maxlength = 6
              rows="1"
              autosize
              label="房间号"
              type="number"
              placeholder="请输入6位房间号"
              :style="{ marginTop: '20px', marginBottom: '20px'}"
            />
          </div>
          <van-button round
            color="linear-gradient(to right, #4bb0ff, #6149f6)"
            :style="{ marginTop: '20px', marginBottom: '20px'}" @click="confirmJoinRoom">
            加入房间
          </van-button>
        </van-tab>
        <van-tab title="创建房间" name="createRoom">
          <div class="roomNum">
            <p class="roomIDspan">请输入房间号：</p>
            <van-password-input
              :value="createdroomID"
              :mask="false"
              :focused="showKeyboard"
              @focus="showKeyboard = true"
            />
            <van-number-keyboard
              :show="showKeyboard"
              @input="onInput"
              @delete="onDelete"
              @blur="showKeyboard = false"
            />
          </div>
          <div class="personCount">
            <van-picker
              title="选择房间人数"
              show-toolbar
              :columns="columns"
              @confirm="onConfirmCreate"
              @cancel="oncancelCreate"
              @change="onChangeCount"
              :default-index="1"
              :style="{ marginTop: '20px', marginBottom: '20px'}"
            >
            </van-picker>
          </div>

        </van-tab>
        <van-tab title="新手教程" name="beginnerHelper">
          <div class="ruleIn">
            <div>
              <h4>角色</h4>
              <p>预言家、猎人、女巫、村民、狼人</p>
            </div>
            <div>
              <h3>胜利条件</h3>
              <p>场上一共分为：神牌(好人)、平民（好人）、狼人（坏人）</p>
              <p>好人胜利条件：场上不存在任何一只狼人，并且保证场上既有神牌存在也有平民存在。</p>
              <p>狼人胜利条件：场上平民全死或者神全死，如果是在天黑阶段平民全死或者神全死，那么天亮后不管狼人是否还存活都判断狼人胜利。</p>
            </div>
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
  import {Dialog} from 'vant';
  export default {
    name: "HomePage.vue",
    data() {
      return {
        joinroomID: '',
        username: '',
        activeKey: 0,
        operation: 'joinRoom',   //导航栏的操作，加入房间、创建房间、新手帮助
        showKeyboard: true,
        columns: ['6', '9'],
        personCount: this.$store.state.personCounts,     //房间人数，6/8/10
        createdroomID: '',
      };
    },
    methods: {
      onChange(index) {
      },
      onClickLeft() {  //头部的返回
        this.$router.push("/login");
      },
      onInput(key) {  //键盘输入要创建的房间号
        this.createdroomID = (this.createdroomID + key).slice(0, 6);
      },
      onDelete() {   //键盘删除要创建的房间号
        this.createdroomID = this.createdroomID.slice(0, this.createdroomID.length - 1);
      },
      onConfirmCreate(value, index) {   //确定创建房间
        if (this.createdroomID === "") {
          Dialog({ message: '房间号不能为空' });
          return;
        } else if (isNaN(this.createdroomID)) {//判断创建房间号是否为数字
          Dialog({ message: '房间号只能为数字' });
          return;
        }else if(this.createdroomID.length!== 6 ){
          Dialog({ message: '房间号为6位数字' });
          return;
        }
        const personCount = `${value}`;
        const roomID = this.createdroomID;
        if (personCount === 0) return;   //用户必须选择房间人数
        this.$store.dispatch("createRooms", {personCount, roomID});
      },
      onChangeCount(picker, value, index) {
      },
      oncancelCreate() {
        this.personCount = 0;
      },
      confirmJoinRoom(){
        const roomID = this.joinroomID;
        const username = this.username;
        this.$store.dispatch('joinRooms', {roomID, username});
      }
    },
  }
</script>

<style scoped>
  .main{
    background-color: rgba(0,0,0,0.03);
    height: 100%;
  }
  .selectOpera{
    margin-top: 10%;
    height: 40%;
  }
  .roomIDspan{
    width: 120px;
    margin-left: 16px;
    font-size: 14px;
  }
  .ruleIn {
    margin-top: 3px;
    width: 100%;
    position: absolute;
    left: 0;
  }
  .ruleIn>div{
    border: 1px solid rgb(0, 33, 66);;
    margin-top: 3px;
    border-radius: 8px;
  }
  h4{
    padding: 0;
    margin: 0;
  }
  .enterAnimation {
    display: flex;
    background-image:url("../assets/game.jpg");
    background-size: 225px 225px;
    background-position: center;
    transition: all .1s ease-in-out;
  }
</style>
