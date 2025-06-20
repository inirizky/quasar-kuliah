const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    meta: {
      isAdmin: true,
    },
    children: [
      {
        path: "",
        component: () => import("pages/IndexPage.vue"),
        name: "adminDashboard",
      },
      {
        path: "movies",
        component: () => import("pages/admin/movies/MovieListPage.vue"),
        name: "movieList",
      },
      {
        path: "movies/add",
        component: () => import("pages/admin/movies/AddMoviePage.vue"),
        name: "addMovie",
      },
      {
        path: "movies/edit/:id",
        component: () => import("pages/admin/movies/EditMoviePage.vue"),
        name: "editMovie",
      },
      {
        path: "genres",
        component: () => import("pages/admin/genres/GenreListPage.vue"),
        name: "genreList",
      },
      {
        path: "genres/add",
        component: () => import("pages/admin/genres/AddGenrePage.vue"),
        name: "addGenre",
      },
      {
        path: "genres/edit/:id",
        component: () => import("pages/admin/genres/EditGenrePage.vue"),
        name: "editGenre",
      },
      {
        path: "transaction",
        component: () => import("pages/admin/transaction/ListTransaction.vue"),
        name: "listTransaction",
      },
    ],
  },
  {
    path: "/user",
    component: () => import("layouts/UserLayout.vue"),
    meta: {
      isUser: true,
    },
    children: [
      {
        path: "",
        component: () => import("pages/IndexPage.vue"),
        name: "userDashboard",
      },
      {
        path: "history-transaction",
        component: () => import("pages/user/transaction/UserTransaction.vue"),
        name: "historyTransaction",
      },
    ],
  },

  {
    path: "/login",
    component: () => import("pages/auth/LoginPage.vue"),
    name: "login",
  },
  {
    path: "/register",
    component: () => import("pages/auth/RegisterPage.vue"),
    name: "register",
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
