<template>
  <q-layout>
    <q-page class="">
      <div class="">
        <q-carousel
          animated
          style="height: 500px"
          v-model="slide"
          navigation
          infinite
          :autoplay="autoplay"
          arrows
          transition-prev="slide-right"
          transition-next="slide-left"
          @mouseenter="autoplay = false"
          @mouseleave="autoplay = true"
        >
          <q-carousel-slide
            :name="1"
            img-src="https://image.tmdb.org/t/p/original/5DUqsUZPLdDRzthR08vvQCXoyfJ.jpg"
          />
          <q-carousel-slide
            :name="2"
            img-src="https://cdn.quasar.dev/img/parallax1.jpg"
          />
          <q-carousel-slide
            :name="3"
            img-src="https://cdn.quasar.dev/img/parallax2.jpg"
          />
          <q-carousel-slide
            :name="4"
            img-src="https://cdn.quasar.dev/img/quasar.jpg"
          />
        </q-carousel>
      </div>
      <div class="flex q-gutter-lg q-pa-lg">
        <MovieCard v-for="movie in movies" :key="movie.id" v-bind="movie" />
      </div>
    </q-page>
  </q-layout>
</template>

<script setup>
import { ref, onMounted } from "vue";
import MovieCard from "src/components/MovieCard.vue";
import { api } from "src/boot/axios";

// const nama = ref("enak banget akhh");

const slide = ref(1);
const autoplay = ref(true);

const movies = ref([]);

onMounted(async () => {
  const res = (await api.get("/movies/get")).data.data;

  movies.value = res.map((i) => ({
    id: i.idMovie,
    title: i.judul,
    imgUrl: i.imgUrl,
    genre: i.Genre.namaGenre,
    harga: i.harga,
    rating: i.rating,
    tahun: i.tahun,
  }));
});
</script>
<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 300px
</style>
