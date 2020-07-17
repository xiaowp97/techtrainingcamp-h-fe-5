//state
export default {
  playersAll:[],//所有玩家信息:===>//游戏中阶段---{"id":0,"role_id":0,"role_sta":0},
                                  // 轮询阶段 --- {"id":1,"name":"12","role_sta":1},
  personCounts: 0,//创建房间时的人数
  godID: '',//上帝ID ---(上帝的uuid)

  playerID: "",//该玩家ID ---(uuid)
  playerStatus: 1, //该玩家角色状态---(role_sta) ---初始值为1(存活)
  playerIndex: "", //该玩家索引---(id)
  playerName: "",  //该玩家姓名---(name)
  playerRole: "", //该玩家角色

  roomID: "",  //房间号
  Players: [],//其他玩家信息{ "id":1,"name":"2221","role_sta":0 },

  // Players: [//其他玩家游戏中信息
  //   {
  //     userID:"", //其他玩家ID
  //     userName: 'ccc', //其他玩家名称
  //     roleStatus: '被刀',  //其他玩家死法
  //   },
  //   {
  //     userID:"",
  //     userName: 'aaa',
  //     roleName: '村民',
  //     roleStatus: '猎杀',
  //     win:3
  //   },
  //   {
  //     userID:"",
  //     userName: 'bbb',
  //     roleName: '女巫',
  //     roleStatus: '猎杀',
  //     win:8
  //   },
  //   {
  //     userID:"",
  //     userName: 'ddd',
  //     roleName: '猎人',
  //     roleStatus: '猎杀',
  //     win:2
  //   },
  //   {
  //     userID:"",
  //     userName: 'eee',
  //     roleName: '狼人',
  //     roleStatus: '毒死',
  //     win:0
  //   },
  //   {
  //     userID:"",
  //     userName: 'eee',
  //     roleName: '狼人',
  //     roleStatus: '存活',
  //     win:5
  //   }
  // ],
  playerData: []//轮询时所有玩家信息 {"id":1,"name":"12","role_sta":1},
}
