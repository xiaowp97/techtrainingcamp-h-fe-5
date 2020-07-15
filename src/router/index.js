import Vue from 'vue'
import Router from 'vue-router'
import Login from '../views/Login'
import  Home from "../views/Home"
import RoleShow from '../views/RoleShow'
import GameResult from '../views/GameResult'
import RankList from '../views/RankList'
import GodControl from '../views/GodControl'
import CreateRoom from "../views/CreateRoom";
// import GodControl1 from "../views/GodControl1";
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path:'/home',
      name:'home',
      component:Home
    },
    {
      path:'/createRoom',
      name:'createRoom',
      component:CreateRoom
    },
    {
      path:'/roleshow',
      name:'roleshow',
      component:RoleShow
    },
    {
      path:'/gameresult',
      name:'gameresult',
      component:GameResult
    },
    {
      path:'/ranklist',
      name:'ranklist',
      component:RankList
    },
    {
      path:'/godcontrol/:personCount',
      name:'godcontrol',
      component:GodControl
    },
    // {
    //   path:'/godcontrol1/:personCount',
    //   name:'godcontrol1',
    //   component:GodControl1
    // },
    {
      redirect:'/login',
      path:'/'
    }
  ]
})
