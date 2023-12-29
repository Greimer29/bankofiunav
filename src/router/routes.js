const routes = [
  {
    path: "/",
    component: () => import("layouts/LoginLayout.vue"),
    children: [{ path: "", component: () => import("pages/IndexPage.vue") }],
  },
  {
    path: "/main",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/IndexPage.vue") },
      { path: "/counts/:id", component: () => import("pages/CountsPage.vue") },
      { path: "/actions/:id", component: () => import("pages/SoliPage.vue") },
      { path: "/divisas/:id", component: () => import("pages/DiviPage.vue") },
      {
        path: "/bolivares",
        component: () => import("pages/BolivarePage.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
