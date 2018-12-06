import Vue from 'vue'
import Router from 'vue-router'
import Landing from '@/components/Landing';
import WorkoutContainer from '@/components/WorkoutContainer';
import Log from '@/components/Log';


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Landing',
      component: Landing
    },
    {
      path: '/WorkoutContainer',
      name: 'WorkoutContainer',
      component: WorkoutContainer
    },
    {
      path: '/log',
      name: 'Log',
      component: Log
    }
  ]
})
