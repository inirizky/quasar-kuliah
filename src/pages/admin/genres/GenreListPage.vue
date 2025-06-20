<template>
  <q-page class="">
    <div class="">
      <q-table
        flat
        bordered
        title="Genre"
        :rows="rows"
        :columns="columns"
        row-key="namaGenre"
      >
        <template v-slot:top-right>
          <q-btn
            @click="addGenreDialog = true"
            label="Add Genre"
            color="primary"
            icon="add"
            no-caps
          />
        </template>

        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="namaGenre" :props="props">
              {{ props.row.namaGenre }}
            </q-td>
            <q-td key="movieCount" :props="props">
              {{ props.row.movieCount }}
            </q-td>

            <q-td key="action" :props="props" class="g-gutter-md">
              <q-btn
                unelevated
                icon="edit"
                color="primary"
                outline
                label="Edit"
              />
              <q-btn
                unelevated
                outline
                icon="delete"
                color="negative"
                label="Delete"
                @click.stop="confirm = true"
              />
              <q-dialog v-model="confirm">
                <q-card>
                  <q-card-section class="row items-center">
                    <q-avatar
                      icon="warning"
                      color="negative"
                      text-color="white"
                    />
                    <span class="q-ml-sm"
                      >Are you sure want to delete genre
                      {{ props.row.namaGenre.toUpperCase() }}?</span
                    >
                  </q-card-section>

                  <q-card-actions align="right">
                    <q-btn
                      unelevated
                      label="Delete"
                      color="negative"
                      @click="deleteMovie(props.row.id)"
                      v-close-popup
                    />
                    <q-btn unelevated outline="" label="Cancel" v-close-popup />
                  </q-card-actions>
                </q-card>
              </q-dialog>
            </q-td>
          </q-tr>
          <q-dialog v-model="addGenreDialog" :backdrop-filter="backdropFilter">
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
                    autofocus
                    dense
                    v-model="genre.namaGenre"
                    label="Genre Name"
                    lazy-rules
                    :rules="[
                      (val) =>
                        (val && val.length > 0) || 'Please type something',
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
          </q-dialog>
        </template>
      </q-table>

      <!-- <q-table
        class="my-sticky-header-table"
        flat
        bordered
        title="Genre"
        :rows="rows"
        :columns="columns"
        row-key="id"
        @row-click="onRowClick"
      /> -->
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { api } from "boot/axios";
import { LocalStorage, Notify } from "quasar";
import { useRouter } from "vue-router";

const columns = [
  { name: "namaGenre", align: "left", label: "Genre name", field: "namaGenre" },
  {
    name: "movieCount",
    align: "left",
    label: "Movie",
    field: "movieCount",
  },
  {
    name: "action",
    align: "center",
    label: "Action",
    field: "action",
  },
];

const confirm = ref(false);
const addGenreDialog = ref(false);
const router = useRouter();
const auth = LocalStorage.getItem("auth");
const genre = ref({
  namaGenre: "",
});
const rows = ref([]);

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
      namaGenre: genre.value.namaGenre,
    });

    console.log(res);

    if (res.status === 200) {
      Notify.create({
        message: res.data.message,
        type: "positive",
        position: "top",
      });
      addGenreDialog.value = false;
      getAllGenres();
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

const getAllGenres = async () => {
  try {
    const res = (await api.get("/genres/get")).data.data;
    rows.value = res.map((i) => ({
      id: i.idGenre,
      namaGenre: i.namaGenre,
      movieCount: i.Movie.length,
    }));
  } catch (error) {
    console.log(error);
  }
};

async function deleteMovie(value) {
  const res = await api.delete(`/genres/delete/${value}`);

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
  getAllGenres();
});
</script>
