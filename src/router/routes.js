const routes = [
  {
    path: "/",
    component: () => import('layouts/IndexLayout'),
    children: [
      { path: "/home", component: () => import('pages/Index') }
      ]
  },
  {
    path: "/login",
    component: () => import('layouts/EmptyLayout'),
    children: [
      { path: "", component: () => import('pages/Login') }
    ]
  },
];

// Always leave this as last one
if (process.env.MODE !== "ssr") {
  routes.push({
    path: "*",
    component: () => import("pages/Error404.vue")
  });
}

export default routes;
