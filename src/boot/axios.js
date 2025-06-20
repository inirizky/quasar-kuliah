import { defineBoot } from "#q-app/wrappers";
import axios from "axios";
import { LocalStorage } from "quasar";

export const baseURL = process.env.BASE_URL;

const api = axios.create({ baseURL });

export default defineBoot(async ({ app, router }) => {
  app.config.globalProperties.$axios = axios;
  app.config.globalProperties.$api = api;

  router.beforeEach(async (to, from, next) => {
    const auth = LocalStorage.getItem("auth");
    const isAdminRoute = to.matched.some((record) => record.meta.isAdmin);
    const isUserRoute = to.matched.some((record) => record.meta.isUser);

    // Cegah akses ke halaman login jika sudah login
    if (to.name === "login" && auth !== null && auth !== undefined) {
      if (auth?.role === 1) return next({ name: "adminDashboard" });
      if (auth?.role === 2) return next({ name: "userDashboard" });
    }

    if (isAdminRoute && (!auth || auth.role !== 1)) {
      return next({ name: "login" });
    }

    if (isUserRoute && (!auth || auth.role !== 2)) {
      return next({ name: "login" });
    }

    return next();
  });
});

export { api };
