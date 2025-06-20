<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="bg-grey-9 text-white">
        <q-btn flat round dense @click="toggleLeftDrawer">
          <q-icon name="menu" />
        </q-btn>
        <q-toolbar-title> Movie App </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above>
      <q-list class="q-px-md q-mt-lg q-gutter-xs">
        <!-- <q-item-label header> Essential Links </q-item-label> -->

        <q-item
          clickable
          unelevated
          exact
          class=""
          :to="{
            name: 'adminDashboard',
          }"
          :class="[
            {
              'bg-primary text-white':
                $route.name === 'adminDashboard' && !$q.dark.isActive,
              'bg-grey-9 text-white':
                $route.name === 'adminDashboard' && $q.dark.isActive,
            },
          ]"
        >
          <q-item-section avatar>
            <q-icon name="home" />
          </q-item-section>

          <q-item-section>
            <q-item-label>Home</q-item-label>
          </q-item-section>
        </q-item>
        <q-item
          clickable
          unelevated
          exact
          class=""
          :to="{
            name: 'listTransaction',
          }"
          :class="[
            {
              'bg-primary text-white':
                $route.name === 'listTransaction' && !$q.dark.isActive,
              'bg-grey-9 text-white':
                $route.name === 'listTransaction' && $q.dark.isActive,
            },
          ]"
        >
          <q-item-section avatar>
            <q-icon name="list" />
          </q-item-section>

          <q-item-section>
            <q-item-label>Transaction</q-item-label>
          </q-item-section>
        </q-item>

        <q-expansion-item icon="movie" label="Movies" default-opened>
          <EssentialLink
            v-for="link in movieLink"
            :key="link.title"
            v-bind="link"
          />
        </q-expansion-item>
        <q-expansion-item icon="more" label="Genres">
          <EssentialLink
            v-for="link in genreLink"
            :key="link.title"
            v-bind="link"
          />
        </q-expansion-item>
        <q-item clickable unelevated exact class="" @click="logout">
          <q-item-section avatar>
            <q-icon name="logout" />
          </q-item-section>

          <q-item-section>
            <q-item-label>Logout</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from "vue";
import EssentialLink from "components/EssentialLink.vue";
import { useRouter } from "vue-router";
import { LocalStorage } from "quasar";

const router = useRouter();

const movieLink = [
  {
    title: "Movie List",
    // caption: "github.com/quasarframework",
    icon: "chevron_right",
    link: "movieList",
  },
  {
    title: "Add Movie",
    // caption: "github.com/quasarframework",
    icon: "chevron_right",
    link: "addMovie",
  },
];
const genreLink = [
  {
    title: "Genre List",
    // caption: "github.com/quasarframework",
    icon: "chevron_right",
    link: "genreList",
  },
  {
    title: "Add Genre",
    // caption: "github.com/quasarframework",
    icon: "chevron_right",
    link: "addGenre",
  },
];

const leftDrawerOpen = ref(false);

function logout() {
  LocalStorage.clear();
  router.push("/login");
}

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>
