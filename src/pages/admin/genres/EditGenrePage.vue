<template>
  <q-layout>
    <q-page-container>
      <q-page>
        <q-card flat class="my-card">
          <q-card-section>
            <div class="text-h6">Edit Movie</div>
            <div class="text-subtitle2">You can add movie here</div>
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
                v-model="movie.judul"
                label="Title"
                lazy-rules
                :rules="[
                  (val) =>
                    (val !== null && val !== '') || 'Please type something',
                ]"
              >
              </q-input>
              <q-select
                outlined
                dense
                v-model="movie.genre"
                :options="genreOptions"
                label="Genre"
                option-label="label"
                option-value="value"
                map-options
                emit-value
              />
              <q-input
                outlined
                dense
                v-model="movie.tahun"
                label="Year"
                lazy-rules
                :rules="[
                  (val) =>
                    (val !== null && val !== '') || 'Please type something',
                ]"
              >
              </q-input>
              <q-input
                outlined
                dense
                v-model="movie.rating"
                label="Rating"
                lazy-rules
                :rules="[
                  (val) =>
                    (val !== null && val !== '') || 'Please type something',
                ]"
              >
              </q-input>
              <q-input
                outlined
                dense
                v-model="movie.harga"
                label="Harga"
                type="number"
                lazy-rules
                :rules="[
                  (val) =>
                    (val !== null && val !== '') || 'Please type something',
                ]"
              >
              </q-input>
              <div>
                <q-btn
                  label="Add movie"
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
import { useRoute, useRouter } from "vue-router";
import { onMounted } from "vue";

const auth = LocalStorage.getItem("auth");
const router = useRouter();
const route = useRoute();
const movie = ref({
  judul: "",
  tahun: null,
  genre: null,
  harga: null,
  rating: null,
});
const genreOptions = ref([]);

const getMovieById = async () => {
  try {
    const res = (await api.get(`/movies/get/${route.params.id}`)).data.data;

    movie.value = {
      judul: res.judul,
      tahun: res.tahun,
      genre: res.Genre.idGenre,
      harga: res.harga,
      rating: res.rating,
    };
    // console.log(res);
  } catch (error) {
    console.log(error);
  }
};
const getGenres = async () => {
  try {
    const res = (await api.get("/genres/get")).data.data;

    genreOptions.value = res.map((genre) => {
      return {
        label: genre.namaGenre, // Teks yang akan tampil (misal: "Action")
        value: genre.idGenre, // Nilai yang akan disimpan (misal: 1)
      };
    });
  } catch (error) {
    console.log(error);
  }
};

onMounted(() => {
  getMovieById();
  getGenres();
});

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

    const res = await api.put(`/movies/edit/${route.params.id}`, {
      judul: movie.value.judul,
      tahun: movie.value.tahun,
      genre: movie.value.genre.value,
      harga: movie.value.harga,
      rating: movie.value.rating,
    });

    console.log(res);

    if (res.status === 200) {
      Notify.create({
        message: res.data.message,
        type: "positive",
        position: "top",
      });
      router.push({ name: "movieList" });
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
