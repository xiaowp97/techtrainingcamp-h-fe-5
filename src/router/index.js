import Vue from 'vue'
import Router from 'vue-router'
import Login from '../views/Login'
import  Home from "../views/Home"
import RoleShow from '../views/RoleShow'
import RankList from '../views/RankList'
import GodControl from '../views/GodControl'
import SelectMVP from "../views/SelectMVP";
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
      path:'/roleshow',
      name:'roleshow',
      component:RoleShow
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
    {
      path:'/selectMVP',
      name:'selectMVP',
      component:SelectMVP
    },
    {
      redirect:'/login',
      path:'/'
    }
  ]
})
