//actions
import ajax from "../api/ajax"
import router from "../router"
export default {
  //创建房间
  async createRooms({commit, state}, {personCount, roomID}) {
    const result = await ajax("https://afqg3f.fn.thelarkcloud.com/CreateRoom", {
      PeopleNum: personCount,
      RoomNum: roomID
    }, "post");
    //请求成功
    if (result.status === 1) {
      const data = result.data;
      router.push('/godcontrol/' + personCount);  //把选择的房间人数传给上帝控制页
      commit("CREATE_ROOMS", {data,personCount,roomID})
    }
    //房间号已经存在
    if (result.status === 0) {
      alert(result.msg);
    }
    console.log("创建房间:"+result);

  },

  //加入房间
  async joinRooms({commit}, {roomID, username}) {
    //ajax请求数据
    const result = await ajax("https://afqg3f.fn.thelarkcloud.com/EnterRoom", {
      Name: username,
      RoomNum: roomID
    }, "post");
    console.log("加入房间:"+result);
    //这里要验证房间号是否存在
    //如果不存在
    if (result.status === 0) {
      alert(result.msg);
    }
    //如果存在该房间
    if (result.status === 1) {
      const data = result.data;
      //跳转roleshow页面
      router.push("/roleshow");
      commit("JOIN_ROOMS",{data})
    }
  },

  //状态刷新
  async refreshState({commit,state}) {
    //刷新角色状态，向服务器发送请求
    const result = await ajax("https://afqg3f.fn.thelarkcloud.com/FreshState", {
      uuid:state.playerID
    }, "post");
    console.log(result);
    if (result.status === 1 ){
      const data = result.data;
      commit("REFRESH_STATE",{data})
    }
  }
}
