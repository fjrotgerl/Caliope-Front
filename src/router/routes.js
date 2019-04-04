const routes = [
  {
    path: '/hello',
    component: () => import("layouts/PublicLayout.vue"),
    children: [
      {
        path: 'login',
        component: () => import("pages/public/Index.vue"),
      },
      {
        path: 'registro',
        component: () => import("pages/public/Register.vue"),
      },
      {
        path: 'faq',
        component: () => import("pages/public/PreguntasFrecuentes.vue"),
      }
    ]
  },
  {
    path: '/',
    component: () => import("layouts/PrivateLayout.vue"),
    children: [
      {
        path: 'home',
        component: () => import("pages/private/Home.vue"),
      },
    ]
  }
];

// Always leave this as last one
if (process.env.MODE !== "ssr") {
  routes.push({
    path: "*",
    component: () => import("pages/Error404.vue")
  });
}

export default routes;
