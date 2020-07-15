//state
export default {
  personCounts: 0,//创建房间时的人数
  godID:'',//上帝ID ---(上帝的uuid)
  playerID:"" ,//玩家ID ---(uuid)
  playerIndex:"", //玩家索引---(id)
  roomID:"",
  Players: [//玩家游戏中信息
    {
      userID:"", //玩家ID
      userName: 'ccc', //玩家名称
      roleName: '预言家', //玩家角色
      roleStatus: '被刀',  //玩家死法
      win:5 //赢的场数
    },
    {
      userID:"",
      userName: 'aaa',
      roleName: '村民',
      roleStatus: '猎杀',
      win:3
    },
    {
      userID:"",
      userName: 'bbb',
      roleName: '女巫',
      roleStatus: '猎杀',
      win:8
    },
    {
      userID:"",
      userName: 'ddd',
      roleName: '猎人',
      roleStatus: '猎杀',
      win:2
    },
    {
      userID:"",
      userName: 'eee',
      roleName: '狼人',
      roleStatus: '毒死',
      win:0
    },
    {
      userID:"",
      userName: 'eee',
      roleName: '狼人',
      roleStatus: '毒死',
      win:5
    }
  ],
  playerData:[]//玩家信息
}
