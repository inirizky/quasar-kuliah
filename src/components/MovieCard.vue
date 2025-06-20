<template>
  <q-card class="my-card" flat bordered>
    <q-img class="" style="width: 300px; height: 350px" :src="props.imgUrl" />

    <q-card-section>
      <!-- <q-btn
        fab
        color="primary"
        dense
        unelevated
        icon="shopping_cart"
        class="absolute"
        style="top: 0; right: 12px; transform: translateY(-50%)"
      /> -->

      <div class="row items-center">
        <div class="col text-h6 ellipsis">
          {{ props.title }} ({{ props.tahun }})
        </div>
      </div>

      <q-rating :model-value="props.rating" :max="5" size="24px" />
    </q-card-section>

    <q-card-section class="q-pt-none">
      <q-btn
        outline
        dense
        no-caps
        unelevated
        class="q-px-lg"
        :label="props.genre"
      />
    </q-card-section>
    <q-card-section class="q-pt-none">
      <span class="text-h6 text-primary"
        >Rp{{ props.harga.toLocaleString() }}</span
      >
      <!-- <div class="text-caption text-grey">
				Small plates, salads & sandwiches in an intimate setting.
      </div> -->
    </q-card-section>

    <q-separator />

    <q-card-actions>
      <q-btn
        unelevated
        class="full-width bg-primary"
        color="primary"
        @click="transactionDialog = true"
      >
        Buy now
      </q-btn>
    </q-card-actions>
  </q-card>

  <q-dialog v-model="transactionDialog">
    <q-card>
      <q-card-section class="row items-center">
        <span class="q-ml-sm">Are you sure want to buy this movie?</span>
      </q-card-section>
      <q-card-section class="items-center q-gutter-y-md">
        <q-input
          :model-value="`${props.title}(${props.tahun})`"
          label="Title"
          readonly
          class=""
        />

        <q-input
          :model-value="`Rp${props.harga.toLocaleString()}`"
          label="Harga"
          readonly
          class=""
        />
      </q-card-section>

      <q-card-actions align="right">
        <q-btn unelevated outline="" label="Cancel" v-close-popup />
        <q-form @submit="onSubmit">
          <q-btn
            unelevated
            label="Buy Now"
            color="primary"
            type="submit"
            v-close-popup
          />
        </q-form>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { LocalStorage, Notify } from "quasar";
import { api } from "src/boot/axios";
import { ref } from "vue";
import { useRouter } from "vue-router";

const transactionDialog = ref(false);

const auth = LocalStorage.getItem("auth");

const router = useRouter();

const onSubmit = async () => {
  try {
    const res = (
      await api.post("/transactions/new", {
        userId: auth.id,
        movieId: props.id,
        totalPrice: props.harga,
        date: new Date(),
      })
    ).data;

    console.log(res);

    if (res.status === 200) {
      Notify.create({
        message: res.message,
        type: "positive",
        position: "top",
      });
      router.push({ name: "" });
    }
  } catch (error) {
    Notify.create({
      message: error.response.message,
      type: "negative",
      position: "top",
    });
    console.log("Catch the", error);
    // console.log("Message", error.response.data.message);
  }
};

const props = defineProps({
  id: {
    type: Number,
  },
  title: {
    type: String,
    required: true,
  },
  imgUrl: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },

  harga: {
    type: Number,
    default: 0,
  },

  rating: {
    type: Number,
    default: 0,
  },

  tahun: {
    type: Number,
    default: 0,
  },
});
</script>
