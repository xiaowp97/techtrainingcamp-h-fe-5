//mutations
export default {

  //创建房间
  CREATE_ROOMS(state,{data,personCount,roomID}){
    state.godID = data.uuid;
    state.personCounts = personCount;
    state.roomID = roomID;
  },
  //加入房间
  JOIN_ROOMS(state,{data}){
    state.playerID = data.uuid;
    state.playerIndex = data.id;
  },
  //角色状态刷新
  REFRESH_STATE(state,{data}){
    state.playerData = data;
  }
}
