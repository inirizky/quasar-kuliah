<template>
  <q-page class="">
    <div class="q-pa-lg">
      <q-table
        class=""
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
            <q-select
              outlined
              dense
              v-model="props.row.status"
              :options="statusOptions"
              option-label="label"
              option-value="value"
              map-options
              emit-value
              @update:model-value="(val) => onStatusChange(props.row, val)"
            />
          </q-td>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { api } from "boot/axios";
import { Notify } from "quasar";
// import { useRouter } from "vue-router";

// const router = useRouter();
const rows = ref([]);
const statusOptions = ref([
  {
    label: "PENDING",
    value: "PENDING",
  },
  {
    label: "PROCESS",
    value: "PROCESS",
  },
  {
    label: "COMPLETED",
    value: "COMPLETED",
  },
  {
    label: "CANCELLED",
    value: "CANCELLED",
  },
]);

const columns = [
  {
    name: "movieTitle",
    align: "left",
    label: "Movie Title",
    field: "movieTitle",
  },
  { name: "userName", align: "left", label: "User Name", field: "userName" },
  { name: "status", align: "left", label: "Status", field: "status" },
  { name: "date", align: "left", label: "Date", field: "date" },
  { name: "totalPrice", align: "left", label: "Harga", field: "totalPrice" },
  { name: "actions", align: "center", label: "Action", field: "actions" },
];

// const onRowClick = (evt, row) => {
//   router.push(`/album/${row.albumID}`);
// };

const getAllTransaction = async () => {
  try {
    const res = (await api.get("/transactions/get")).data.data;
    console.log(res);

    rows.value = res.map((i) => ({
      id: i.id,
      userId: i.userId,
      movieId: i.movieId,
      status: i.status,
      date: i.date,
      totalPrice: i.totalPrice,
      movieTitle: i.movie.judul,
      userName: i.users.nama,
    }));
  } catch (error) {
    console.log(error);
  }
};

async function onStatusChange(newValue, value) {
  console.log(newValue);
  console.log(value);

  try {
    const res = (
      await api.put(`/transactions/edit/${newValue.id}`, {
        userId: newValue.userId,
        movieId: parseInt(newValue.movieId),
        totalPrice: parseFloat(newValue.totalPrice),
        status: value,
      })
    ).data;

    if (res.status === 200) {
      Notify.create({
        message: res.message,
        type: "positive",
        position: "top",
      });
    }
  } catch (error) {
    Notify.create({
      message: error.response.data.message,
      type: "negative",
      position: "top",
    });
  }
}

onMounted(() => {
  getAllTransaction();
});
</script>
