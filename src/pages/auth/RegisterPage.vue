<template>
  <q-layout>
    <q-page-container>
      <q-page>
        <div class="row">
          <div class="col-4 fixed-center">
            <q-card flat bordered class="my-card">
              <q-card-section>
                <div class="text-h6">Register</div>
                <div class="text-subtitle2">You can register here</div>
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
                    autofocus=""
                    dense
                    v-model="namaLengkap"
                    label="Nama Lengkap *"
                    lazy-rules
                    :rules="[
                      (val) =>
                        (val && val.length > 0) || 'Please type something',
                    ]"
                  >
                  </q-input>
                  <q-input
                    outlined
                    dense
                    v-model="username"
                    label="Username *"
                    lazy-rules
                    :rules="[
                      (val) =>
                        (val && val.length > 0) || 'Please type something',
                    ]"
                  >
                  </q-input>
                  <q-input
                    outlined
                    dense
                    v-model="email"
                    label="Email *"
                    lazy-rules
                    :rules="[
                      (val) =>
                        (val && val.length > 0) || 'Please type something',
                    ]"
                  >
                  </q-input>
                  <q-input
                    outlined
                    dense
                    v-model="noTelp"
                    label="Nomor Telp *"
                    lazy-rules
                    :rules="[
                      (val) =>
                        (val && val.length > 0) || 'Please type something',
                    ]"
                  >
                  </q-input>
                  <q-input
                    outlined
                    dense
                    v-model="password"
                    type="password"
                    label="Password"
                    lazy-rules
                    :rules="[
                      (val) =>
                        (val && val.length > 0) || 'Please type something',
                    ]"
                  >
                  </q-input>
                  <q-input
                    outlined
                    dense
                    v-model="confirmPassword"
                    type="password"
                    label="Confirm Password *"
                    lazy-rules
                    :rules="[
                      (val) =>
                        (val && val.length > 0) || 'Please type something',
                    ]"
                  >
                  </q-input>

                  <div>
                    <q-btn
                      label="Register"
                      type="submit"
                      unelevated
                      no-caps
                      class="full-width"
                      color="primary"
                    />
                  </div>
                </q-form>
                <q-btn
                  :to="{
                    name: 'login',
                  }"
                  label="Login"
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
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from "vue";
// import axios from 'axios'
import { api } from "src/boot/axios";
import { Notify } from "quasar";
import { useRouter } from "vue-router";
const namaLengkap = ref("");
const email = ref("");
const noTelp = ref("");
const username = ref("");
const password = ref("");
const confirmPassword = ref("");

const router = useRouter();

const onSubmit = async () => {
  try {
    const res = await api.post("/users/register", {
      username: username.value,
      password: password.value,
      nama: namaLengkap.value,
      notelp: noTelp.value,
      email: email.value,
    });

    console.log(res);

    if (res.status === 200) {
      Notify.create({
        message: res.data.message,
        type: "positive",
        position: "top",
      });
      router.push("/login");
    }
  } catch (error) {
    Notify.create({
      message: error.response.data.message,
      type: "negative",
      position: "top",
    });
    console.log("Catch the", error);
    console.log("Message", error.response.data.message);
  }
};
</script>
