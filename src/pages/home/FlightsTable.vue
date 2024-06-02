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
  { title: "Компания", key: "airline" },
  { title: "С пересадками", key: "stop_type" },
  { title: "Время полета", key: "time_taken" },
  { title: "Рек. цена", key: "price" },
];

const props = defineProps({
  items: [],
});
</script>
