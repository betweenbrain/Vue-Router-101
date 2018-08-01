import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import NotFound from './views/404.vue';

Vue.use(Router);

const router = new Router({
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
    {
      path: '/404',
      name: 'PageNotFound',
      component: NotFound,
    },
    {
      path: '*',
      redirect: '/404',
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    if (!savedPosition) {
      return { x: 0, y: 0 };
    }
  },
});

router.beforeEach((to, from, next) => {
  if ('foo' === 'bar') {
    return false;
  }
  console.log(from);
  console.log(to);

  next();
});

export default router;
