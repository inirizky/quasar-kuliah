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
                class="q-mt-lg"
                v-model="movie.tahun"
                label="Year"
                lazy-rules
                :rules="[
                  (val) =>
                    (val !== null && val !== '') || 'Please type something',
                ]"
              >
              </q-input>
              <div class="flex text-center">
                <span>Rating</span>
                <q-rating
                  class="q-mb-md q-ml-sm"
                  v-model="movie.rating"
                  size="2em"
                  :max="5"
                  color="primary"
                />
              </div>

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
              <q-file
                v-model="image"
                outlined
                dense
                bottom-slots
                accept=".jpg, image/*"
                label="Poster Image"
              >
                <template v-slot:prepend>
                  <q-icon name="attach_file" />
                </template>
              </q-file>
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
const image = ref("");
const movie = ref({
  judul: null,
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

    console.log(movie);

    const formData = new FormData();
    formData.append("judul", movie.value.judul);
    formData.append("tahun", movie.value.tahun);
    formData.append("rating", movie.value.rating);
    formData.append("harga", movie.value.harga);
    formData.append("genre", movie.value.genre);
    formData.append("imgUrl", movie.value.imgUrl);

    const res = await api.put(`/movies/edit/${route.params.id}`, formData);

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

onMounted(() => {
  getMovieById();
  getGenres();
});
</script>
