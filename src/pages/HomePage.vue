<template>
  <section class="home-page main-page">
    <header class="home-page__header">
      <v-date-input v-model="date" label="Дата вылета"></v-date-input>
      <v-select v-model="from" label="Откуда" :items="fromCities"></v-select>
      <v-select v-model="to" label="Куда" :items="toCities"></v-select>
      <v-select
        v-model="flClass"
        label="Класс"
        :items="['Эконом', 'Бизнес']"
      ></v-select>
      <div>
        <v-btn
          color="blue"
          variant="tonal"
          block
          :disabled="!canApply"
          @click="apply"
        >
          Найти
        </v-btn>
      </div>
    </header>

    <main class="home-page__main">
      <chart-vue :y="[1, 40, 9, 60, 4, 20, 10]" />
    </main>
  </section>
</template>

<script setup>
import { onMounted, computed } from "vue";
import { FlightApi } from "@/api/FlightApi";
import ChartVue from "@/pages/home/ChartVue.vue";

const cities = ref([]);
const from = ref("");
const to = ref("");
const date = ref(null);
const flClass = ref("");

const toCities = computed(() =>
  cities.value.filter((city) => city !== from.value)
);
const fromCities = computed(() =>
  cities.value.filter((city) => city !== to.value)
);
const canApply = computed(
  () => from.value && to.value && date.value && flClass.value
);

const apply = async () => {
  const obj = {
    from: from.value,
    to: to.value,
    date: +date.value,
    class: flClass.value,
  };
  await FlightApi.getFlights(obj);
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
