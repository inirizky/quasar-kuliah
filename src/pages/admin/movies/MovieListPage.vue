<template>
  <q-page class="">
    <div class="q-pa-lg">
      <q-table
        class="my-sticky-header-table"
        flat
        bordered
        title="Movie"
        :rows="rows"
        :columns="columns"
        row-key="id"
        @row-click="onRowClick"
      >
        <template #body-cell-actions="props">
          <q-td :props="props" class="q-gutter-x-sm">
            <q-btn
              unelevated
              icon="edit"
              color="primary"
              outline
              label="Edit"
              @click.stop="editMovie(props.row)"
            />
            <q-btn
              unelevated
              outline
              icon="delete"
              color="negative"
              label="Delete"
              @click.stop="confirm = true"
            />
          </q-td>

          <q-dialog v-model="confirm">
            <q-card>
              <q-card-section class="row items-center">
                <q-avatar icon="warning" color="negative" text-color="white" />
                <span class="q-ml-sm"
                  >Are you sure want to delete this movie?</span
                >
              </q-card-section>

              <q-card-actions align="right">
                <q-btn
                  unelevated
                  label="Delete"
                  color="negative"
                  @click="deleteMovie(props.row)"
                  v-close-popup
                />
                <q-btn unelevated outline="" label="Cancel" v-close-popup />
              </q-card-actions>
            </q-card>
          </q-dialog>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { api } from "boot/axios";
import { useRouter } from "vue-router";
import { Notify } from "quasar";

const router = useRouter();
const rows = ref([]);
const confirm = ref(false);

const columns = [
  { name: "judul", align: "left", label: "Title", field: "judul" },
  { name: "genre", align: "left", label: "Genre", field: "genre" },
  { name: "harga", align: "left", label: "Harga", field: "harga" },
  { name: "rating", align: "left", label: "Rating", field: "rating" },
  { name: "actions", align: "center", label: "Action", field: "actions" },
];

// const onRowClick = (evt, row) => {
//   router.push(`/album/${row.albumID}`);
// };

const getAllMovies = async () => {
  try {
    const res = (await api.get("/movies/get")).data.data;
    rows.value = res.map((i) => ({
      id: i.idMovie,
      judul: i.judul,
      genre: i.Genre.namaGenre,
      harga: i.harga,
      rating: i.rating,
      tahun: i.tahun,
    }));
  } catch (error) {
    console.log(error);
  }
};

function editMovie(data) {
  console.log(data);

  router.push(`/movies/edit/${data.id}`);
}

async function deleteMovie(data) {
  const res = await api.delete(`/movies/delete/${data.id}`);

  console.log(res);

  if (res.status === 200) {
    Notify.create({
      message: res.data.message,
      type: "positive",
      position: "top",
    });
  } else {
    Notify.create({
      message: res.data.message,
      type: "negative",
      position: "top",
    });
  }
}

onMounted(() => {
  getAllMovies();
});
</script>
