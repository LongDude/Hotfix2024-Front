<template>
	  <v-data-table :items="props.requests" :headers="headers" :loading="!props.requests">
    <template v-slot:item.path="{ item }">
      <router-link :to="item.path">{{ item.path }}</router-link>
    </template>
  </v-data-table>
</template>

<script setup>
import { defineProps } from 'vue';

const headers = [
	{ title: 'Название', key: 'title' },
	{ title: 'Путь', key: 'path' },
]

const props = defineProps({
  requests: []
})
</script>

<style lang="scss">
</style>