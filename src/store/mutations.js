//mutations
export default {
  //创建房间
  CREATE_ROOMS(state, {data, personCount, roomID}) {
    state.godID = data.uuid;
    state.personCounts = personCount;
    state.roomID = roomID;
  },
  //加入房间
  JOIN_ROOMS(state, {selfData, othersData}) {
    //this.$cookieStore.setCookie("roleID",selfData.uuid);
    window.localStorage.setItem("roleID", JSON.stringify(selfData.uuid));//本地存储
    state.playerID = selfData.uuid;
    state.playerIndex = selfData.id;
    state.playerStatus = selfData.role_sta;
    state.Players = othersData;
  },
  //角色状态刷新
  REFRESH_STATUS(state, {selfData, othersData}) {
    state.playerIndex = selfData.id; //该角色ID
    state.playerRole = selfData.role_id;//该角色
    state.playerStatus = selfData.role_sta; //该存活状态
    //判断一下之前的状态与更新后的角色状态是否一样
    state.Players.forEach((otherPlayer => {
      for (let i = 0; i < othersData.length; i++) {
        if (otherPlayer.id === othersData.id) {
          if (otherPlayer.role_sta !== othersData.role_sta) {
            otherPlayer.role_sta = othersData.role_sta;
          }
        }
      }
    }))
  },
  //角色页面轮询
  ROLE_LOOP_STATUS(state, {selfData, othersData}) {
    state.playerIndex = selfData.id; //该角色ID
    state.playerRole = selfData.role_id;//该角色
    state.playerStatus = selfData.role_sta; //该存活状态
    //判断一下之前的状态与更新后的角色状态是否一样
    state.Players.forEach((otherPlayer => {
      for (let i = 0; i < othersData.length; i++) {
        if (otherPlayer.id === othersData.id) {
          if (otherPlayer.role_sta !== othersData.role_sta) {
            otherPlayer.role_sta = othersData.role_sta;
          }
        }
      }
    }))
  },
  //上帝页面轮询
  GOD_LOOP_STATUS(state, {otherData}) {
    // window.localStorage.setItem("playerNameAll",otherData);
    state.playersAll = otherData;
  },
  //上帝更新玩家状态
  CHANGE_STATE(state, {playerAllData}) {
    state.playersAll = playerAllData;
  },
  //开始游戏
  START_GAME(state, {startData}) {
    state.playersAll.forEach(player => { //遍历轮询时玩家信息
      startData.forEach(start => {  //遍历才来的开始游戏后玩家信息
        if (player.id === start.id) {
          player[role_sta] = start.role_sta;
          player[role_id] = start.role_id;
        }
      })
    });
  },
  //结束游戏
  GAME_OVER(state) {
    state.personCounts = 0;
    state.godID = "";
    state.playersAll = [];
    state.roomID = ""
  }
}
