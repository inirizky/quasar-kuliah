<template>
  <q-card flat class="my-card">
    <q-card-section>
      <div class="text-h6">Add Genre</div>
      <div class="text-subtitle2">You can add a genre here</div>
    </q-card-section>

    <q-separator dark inset />

    <q-card-section>
      <q-form
        @submit="props.onSubmit"
        @reset="onReset"
        class="q-gutter-xs bg-cacat"
      >
        <q-input
          outlined
          autofocus
          dense
          :v-model="props.name"
          label="Genre Name"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Please type something']"
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
</template>

<script setup>
const props = defineProps({
  onSubmit: {},
  // onReset: {},
  name: {},
});
</script>
