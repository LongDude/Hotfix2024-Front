<template>
  <v-data-table-virtual
    :headers="headers"
    :items="props.items"
    height="400"
  ></v-data-table-virtual>
</template>

<script setup>
import { defineProps } from "vue";

const headers = [
  { title: "Название", key: "title" },
  { title: "Путь", key: "path" },
];

const props = defineProps({
  items: [],
});
</script>
