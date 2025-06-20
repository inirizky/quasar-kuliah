<template>
  <q-layout>
    <q-page-container>
      <q-page>
        <q-card flat class="my-card">
          <q-card-section>
            <div class="text-h6">Add Genre</div>
            <div class="text-subtitle2">You can add a genre here</div>
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
                v-model="genre.name"
                label="Genre Name"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Please type something',
                ]"
              >
              </q-input>

              <div>
                <q-btn
                  label="Add Genre"
                  type="submit"
                  unelevated
                  no-caps
                  class="full-width"
                  color="primary"
                />
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from "vue";
import { api } from "src/boot/axios";
import { LocalStorage, Notify } from "quasar";
import { useRouter } from "vue-router";

const auth = LocalStorage.getItem("auth");
const genre = ref({
  name: "",
});

const router = useRouter();

const onSubmit = async () => {
  try {
    if (auth.role !== 1) {
      Notify.create({
        message: "You can't add a movie because you're not an admin",
        type: "negative",
        position: "top",
      });
      router.back();
      return;
    }

    const res = await api.post("/genres/new", {
      namaGenre: genre.value.name,
    });

    console.log(res);

    if (res.status === 200) {
      Notify.create({
        message: res.data.message,
        type: "positive",
        position: "top",
      });
      router.push({ name: "genreList" });
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
