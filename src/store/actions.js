//actions
import ajax from "../api/ajax"
import router from "../router"
import {Dialog} from 'vant';

export default {
  //创建房间
  async createRooms({commit, state}, {personCount, roomID}) {
    const result = await ajax("https://afqg3f.fn.thelarkcloud.com/CreateRoom", {
      PeopleNum: personCount,
      RoomNum: roomID
    }, "post");
    //请求成功
    if (result.status === 1) {
      console.log("创建房间:" + result);
      const data = result.data;
      router.push('/godcontrol/' + personCount);  //把选择的房间人数传给上帝控制页
      commit("CREATE_ROOMS", {data, personCount, roomID});
    }
    //房间号已经存在
    if (result.status === 0) {
      Dialog({message: result.msg});
    }

  },

  //加入房间
  async joinRooms({commit}, {roomID, username}) {
    //ajax请求数据
    const result = await ajax("https://afqg3f.fn.thelarkcloud.com/EnterRoom", {
      Name: username,
      RoomNum: roomID
    }, "post");
    //这里要验证房间号是否存在
    //如果不存在
    if (result.status === 0) {
      Dialog({message: result.msg});
    }
    //如果存在该房间
    if (result.status === 1) {
      console.log("加入房间:" + result);
      const selfData = result.selfData;//包含玩家自己的uuid，id和role_sta
      const othersData = result.othersData; //包含其他玩家的id，name和role_sta
      //跳转roleshow页面
      router.push("/roleshow");
      commit("JOIN_ROOMS", {selfData, othersData})
    }
  },

  //状态刷新
  async refreshStatus({commit, state}, playerId) {
    //刷新角色状态，向服务器发送请求
    const result = await ajax("https://afqg3f.fn.thelarkcloud.com/FreshState", {
      uuid: playerId
    }, "post");
    //请求成功
    if (result.status === 1) {
      console.log("状态刷新" + result);
      const selfData = result.selfData;//包含玩家自己的uuid，id和role_sta
      const othersData = result.othersData; //包含其他玩家的id，name和role_sta
      commit("REFRESH_STATUS", {selfData, othersData})
    }
  },
  //退出房间
  async OutRoom({commit, state}, playerId) {
    const result = await ajax("https://afqg3f.fn.thelarkcloud.com/ExitRoom", {
      uuid: playerId
    }, "post");
    //请求成功
    if (result === 1) {
      console.log("退出房间" + result.status);
      // router.back();
    }
    if (result === 0) {
      Dialog({message: result.msg});
    }
  },
  //轮询
  loopStatus({commit, state}, UUID) {
      const result = ajax("https://afqg3f.fn.thelarkcloud.com/FreshState", {
        uuid: UUID
      }, "post");
      //请求成功
    if (result.status === 1) {
      console.log("轮询" + result);
      if(result.selfData){
        const selfData = result.selfData;//包含玩家自己的uuid，id和role_sta
        const othersData = result.othersData; //包含其他玩家的id，name和role_sta
        commit("ROLE_LOOP_STATUS", {selfData, othersData})
      }else {
        const otherData = result.othersData;
        commit("GOD_LOOP_STATUS",{otherData});
      }


    }
    },

  //上帝改变传送死亡玩家状态
  async changeState({commit, state}, {deathRoles, godUUID}) {
    const result = await ajax("https://afqg3f.fn.thelarkcloud.com/commitState", {
      idArr: deathRoles,
      uuid: godUUID
    }, "post");
    //请求成功
    if (result.status === 1) {
      console.log("上帝更新" + result);
      const playerAllData = result.data;
      commit("CHANGE_STATE", {playerAllData})
    } else if (result.status === 2) {
      Dialog({message: "好人胜利"});
    } else if (result.status === 3) {
      Dialog({message: "狼人胜利"});
    } else {
      Dialog({message: result.msg});
    }
  },
  //开始游戏
  async startGame({commit,state}) {
    const result = await ajax("https://afqg3f.fn.thelarkcloud.com/gameBegin", {
      uuid: state.godID
    }, "post");

    //请求成功
    if (result.status === 1) {
      const startData = result.data;
      commit("START_GAME", {startData});
      console.log("开始游戏" + result);
    }
  },
  //结束游戏
  async gameOver({commit}, godUUID) {
    const result = await ajax("https://afqg3f.fn.thelarkcloud.com/DeleteRoom", {
      uuid: godUUID
    }, "post");
    if (result.status === 1) {
      console.log("结束游戏" + result);
      commit("GAME_OVER");
    }
  }
}
