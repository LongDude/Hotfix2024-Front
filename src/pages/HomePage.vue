<template>
  <section class="home-page main-page">
    <header class="home-page__header">
      <v-date-input v-model="date" label="Дата вылета"></v-date-input>
      <v-select v-model="from" label="Откуда" :items="cities"></v-select>
      <v-select v-model="to" label="Куда" :items="cities"></v-select>
      <v-select v-model="flClass" label="Класс" :items="['Эконом', 'Бизнес']"></v-select>
      <div>
        <v-btn color="blue" variant="tonal" block :disabled="!canApply" @click="apply">
          Найти
        </v-btn>
      </div>
    </header>

    <main class="home-page__main">

    </main>
  </section>
</template>

<script setup>
import { onMounted, computed } from "vue";
import { FlightApi } from "@/api/FlightApi";

const cities = ref([]);
const from = ref('');
const to = ref('');
const date = ref(null);
const flClass = ref('');

const canApply = computed(() => from.value && to.value && date.value && flClass.value);

const apply = async () => {
  const obj = {
    from: from.value,
    to: to.value,
    date: date.value,
    class: flClass.value,
  }
  console.log('apply', obj)
  await FlightApi.getFlights()
};

onMounted(async () => {
  cities.value = await FlightApi.getCities();
});
</script>

<style lang="scss">
.home-page {
  &__header {
    display: flex;
    gap: 5px;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;

    & > * {
      width: 100%;
    }
  }
}

@media screen and (min-width: 720px) {
  .home-page {
    &__header {
      flex-direction: row;
    }
  }
}
</style>
