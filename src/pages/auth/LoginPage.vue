<template>
  <q-layout>
    <q-page-container>
      <div class="row">
        <div class="col-4 fixed-center">
          <q-card flat bordered class="my-card">
            <q-card-section>
              <div class="text-h6">Login</div>
              <div class="text-subtitle2">
                Masukkan username dan password anda
              </div>
            </q-card-section>

            <q-separator dark inset />

            <q-card-section>
              <q-form
                @submit="onSubmit"
                @reset="onReset"
                class="q-gutter-xs bg-cacat"
              >
                <q-input
                  outlined
                  autofocus
                  dense
                  v-model="username"
                  label="Username"
                  lazy-rules
                  :rules="[
                    (val) => (val && val.length > 0) || 'Please type something',
                  ]"
                >
                  <!-- <template v-slot:prepend>
                    <q-icon name="person" />
                  </template> -->
                </q-input>
                <q-input
                  v-model="password"
                  outlined
                  dense
                  label="Password"
                  :type="isPwd ? 'password' : 'text'"
                  lazy-rules
                  :rules="[
                    (val) => (val && val.length > 0) || 'Please type something',
                  ]"
                >
                  <template v-slot:append>
                    <q-icon
                      :name="isPwd ? 'visibility_off' : 'visibility'"
                      class="cursor-pointer"
                      @click="isPwd = !isPwd"
                    />
                  </template>
                </q-input>
                <!-- <q-input filled type="number" v-model="age" label="Your age *" lazy-rules :rules="[
                      val => val !== null && val !== '' || 'Please type your age',
                      val => val > 0 && val < 100 || 'Please type a real age'
                      ]" /> -->

                <!-- <q-toggle v-model="accept" label="I accept the license and terms" /> -->

                <div class="">
                  <q-btn
                    label="Login"
                    type="submit"
                    unelevated
                    no-caps
                    class="full-width"
                    color="primary"
                  />
                  <!-- <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" /> -->
                </div>
              </q-form>
              <q-btn
                :to="{
                  name: 'register',
                }"
                label="Register"
                type="button"
                unelevated
                no-caps
                class="full-width q-mt-md"
                outline
              />
            </q-card-section>
          </q-card>
        </div>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { LocalStorage, Notify } from "quasar";
import { api } from "src/boot/axios";
import { ref } from "vue";
import { useRouter } from "vue-router";

const username = ref("");
const password = ref("");

const router = useRouter();

const isPwd = ref(true);
const onSubmit = async () => {
  try {
    const res = (
      await api.post("/users/login", {
        username: username.value,
        password: password.value,
      })
    ).data;

    console.log(res);

    if (res.status === 200) {
      LocalStorage.set("auth", res.data);

      Notify.create({
        message: res.message,
        type: "positive",
        position: "top",
      });
      if (res.data.role === 1) {
        router.push({ name: "adminDashboard" });
      } else {
        router.push({ name: "userDashboard" });
      }
    }
  } catch (error) {
    Notify.create({
      message: error?.response?.data?.message,
      type: "negative",
      position: "top",
    });
    console.log("Catch the", error);
  }
};
</script>
