import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
    {
      path: '/user/:name',
      name: 'user',
      component: () => import(/* webpackChunkName: "user" */ './views/User.vue'),
      props: route => ({ name: route.params.name }),
    },
    {
      path: '/settings',
      // You could also have named views at the top
      component: () => import(/* webpackChunkName: "Settings" */ './views/Settings.vue'),
      children: [
        {
          path: 'email',
          component: () => import(/* webpackChunkName: "Email" */ './views/nested/Email.vue'),
        },
        {
          path: 'profile',
          components: {
            default: () => import(/* webpackChunkName: "Profile" */ './views/nested/Profile.vue'),
            helper: () => import(/* webpackChunkName: "Preview" */ './views/helpers/Preview.vue'),
          },
        },
      ],
    },
  ],
});
