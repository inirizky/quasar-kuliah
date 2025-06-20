<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="bg-grey-9 text-white">
        <!-- <q-btn flat round dense @click="toggleLeftDrawer">
          <q-icon name="menu" />
        </q-btn> -->
        <q-toolbar-title> Movie App </q-toolbar-title>
        <q-btn outline :label="userName">
          <q-menu>
            <q-list style="min-width: 200px">
              <q-separator />
              <q-item
                clickable
                v-close-popup
                :to="{
                  name: 'historyTransaction',
                }"
              >
                <q-item-section>History Transaction</q-item-section>
              </q-item>
              <q-separator />
              <q-item clickable v-close-popup @click="logout">
                <q-item-section>Logout </q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { LocalStorage } from "quasar";
import { useRouter } from "vue-router";

const router = useRouter();
const auth = LocalStorage.getItem("auth");

const userName = auth.name;
console.log(userName);

function logout() {
  LocalStorage.clear();
  router.push("/login");
}
</script>
