<template>
  <q-item
    clickable
    unelevated
    exact
    class="q-px-lg"
    :to="{
      name: props.link,
    }"
    :class="[
      {
        'bg-primary text-white':
          $route.name === props.link && !$q.dark.isActive,
        'bg-grey-9 text-white': $route.name === props.link && $q.dark.isActive,
      },
    ]"
  >
    <q-item-section v-if="props.icon" avatar>
      <q-icon :name="props.icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ props.title }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true,
  },

  caption: {
    type: String,
    default: "",
  },

  link: {
    type: String,
    default: "#",
  },

  icon: {
    type: String,
    default: "",
  },
});
</script>
