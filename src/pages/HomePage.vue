<template>
  <section class="home-page main-page">
    <header class="home-page__header">
      <v-date-input :value="props.date" label="Дата вылета" @update:model-value="dateChange"></v-date-input>
      <v-select :value="props.from" label="Откуда" :items="fromCities" @update:model-value="fromChange"></v-select>
      <v-select :value="props.to" label="Куда" :items="toCities" @update:model-value="toChange"></v-select>
      <v-select
        :value="props.flclass"
        label="Класс"
        :items="['Эконом', 'Бизнес']"
        @update:model-value="classChange"
      ></v-select>
      <div class="home-page__btn mb-lg-2">
        <v-btn
          color="blue"
          class="btn__inner"
          variant="tonal"
          block
          :disabled="!canApply"
          @click="apply"
        >
          Найти
        </v-btn>
      </div>
    </header>

    <main class="home-page__main mb-4">
      <chart-vue :y="[1, 40, 9, 60, 4, 20, 10]" />
    </main>

    <flights-table />
  </section>
</template>

<script setup>
import { onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { FlightApi } from "@/api/FlightApi";
import ChartVue from "@/pages/home/ChartVue.vue";
import FlightsTable from "./home/FlightsTable.vue";

const router = useRouter();
const cities = ref([]);
const props = defineProps({
  from: null,
  to: null,
  date: null,
  flclass: null,
});

const updateRouter = (from, to, date, flclass) => {
  const query = {
      ...from && {from: from},
      ...to && {to: to},
      ...date && {date: date},
      ...flclass && {flclass: flclass},
    };

  router.push({
    path: '/',
    query
  })
}

const dateChange = (newValue) => {
  updateRouter(props.from, props.to, newValue, props.flclass);
}

const fromChange = (newValue) => {
  updateRouter(newValue, props.to, props.date, props.flclass);
}

const toChange = (newValue) => {
  updateRouter(props.from, newValue, props.date, props.flclass);
}

const classChange = (newValue) => {
  updateRouter(props.from, props.to, props.date, newValue);
}

const toCities = computed(() =>
  cities.value.filter((city) => city !== props.from)
);
const fromCities = computed(() =>
  cities.value.filter((city) => city !== props.to)
);
const canApply = computed(
  () => props.from && props.to && props.date && props.flclass
);

const apply = async () => {
  const obj = {
    from: props.from,
    to: props.to,
    date: +new Date(props.date),
    class: props.flclass,
    path: router.currentRoute.value.fullPath,
    title: `${props.date} / ${props.from} / ${props.to} / ${props.flclass}`,
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

    &__btn {
    align-self: start;

    & > .btn__inner  {
      height: 56px;
    }
  }
  }
}
</style>
