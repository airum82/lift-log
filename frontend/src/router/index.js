import Vue from 'vue'
import Router from 'vue-router'
import Landing from '@/components/Landing';
import WorkoutContainer from '@/components/WorkoutContainer';
import Log from '@/components/Log';
import Login from '@/components/Login';


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Landing',
      props: true,
      component: Landing
    },
    {
      path: '/WorkoutContainer',
      name: 'WorkoutContainer',
      props: true,
      component: WorkoutContainer
    },
    {
      path: '/log',
      name: 'Log',
      props: true,
      component: Log
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})
