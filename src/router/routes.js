const routes = [
  {
    path: '/',
    component: () => import("layouts/PublicLayout.vue"),
    children: [
      {
        path: '',
        component: () => import("pages/public/Index.vue")
      },
      {
        path: 'registro',
        component: () => import("pages/public/Register.vue")
      },
      {
        path: 'faq',
        component: () => import("pages/public/PreguntasFrecuentes.vue")
      }
    ]
  },
  {
    path: '/user',
    component: () => import("layouts/PrivateLayout.vue"),
    children: [
      {
        path: 'home',
        component: () => import("pages/private/Home.vue")
      },
      {
        path: 'playlist',
        component: () => import("pages/private/Playlist.vue")
      },
      {
        path: 'playlists',
        component: () => import("pages/private/Playlists.vue")
      },
      {
        path: 'descubrir',
        component: () => import("pages/private/Descubrir.vue")
      },
      {
        path: 'cancion',
        component: () => import("pages/private/Cancion.vue")
      },
      {
        path: 'buscador',
        component: () => import("pages/private/Buscador.vue")
      },
      {
        path: 'opciones',
        component: () => import("pages/private/Opciones.vue")
      }
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
