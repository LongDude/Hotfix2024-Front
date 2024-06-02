<template>
  <section class="home-page main-page">
    <header class="home-page__header">
      <v-date-input
        :value="props.date"
        label="Дата вылета"
        :disabled="loading"
        @update:model-value="dateChange"
      ></v-date-input>
      <v-select
        :value="props.from"
        label="Откуда"
        :disabled="loading"
        :items="fromCities"
        @update:model-value="fromChange"
      ></v-select>
      <v-select
        :value="props.to"
        label="Куда"
        :disabled="loading"
        :items="toCities"
        @update:model-value="toChange"
      ></v-select>
      <v-select
        :value="props.flclass"
        :disabled="loading"
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
          :disabled="!canApply || loading"
          @click="apply"
        >
          Найти
        </v-btn>
      </div>
    </header>

    <div v-if="loading" class="loader">
      <v-progress-circular
        :size="70"
        :width="7"
        color="primary"
        indeterminate
      ></v-progress-circular>
    </div>

    <template v-else>
      <main v-if="flights" class="home-page__main mb-4">
        <chart-vue :y="flights.mean" />
      </main>

      <flights-table v-if="flights" :items="[flights]" />
    </template>

    <recommended-places />
  </section>
</template>

<script setup>
import { onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { FlightApi } from "@/api/FlightApi";
import ChartVue from "@/pages/home/ChartVue.vue";
import FlightsTable from "./home/FlightsTable.vue";
import RecommendedPlaces from "./home/RecommendedPlaces.vue";

const router = useRouter();
const loading = ref(false);
const cities = ref([]);
const flights = ref(null);
const props = defineProps({
  from: null,
  to: null,
  date: null,
  flclass: null,
});

const updateRouter = (from, to, date, flclass) => {
  flights.value = null;
  const query = {
    ...(from && { from: from }),
    ...(to && { to: to }),
    ...(date && { date: date }),
    ...(flclass && { flclass: flclass }),
  };

  router.push({
    path: "/",
    query,
  });
};

const dateChange = (newValue) => {
  updateRouter(props.from, props.to, newValue, props.flclass);
};

const fromChange = (newValue) => {
  updateRouter(newValue, props.to, props.date, props.flclass);
};

const toChange = (newValue) => {
  updateRouter(props.from, newValue, props.date, props.flclass);
};

const classChange = (newValue) => {
  updateRouter(props.from, props.to, props.date, newValue);
};

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
  loading.value = true;
  flights.value = null;
  const obj = {
    from: props.from,
    to: props.to,
    date: +new Date(props.date),
    class: props.flclass,
    path: router.currentRoute.value.fullPath,
    title: `${props.date} / ${props.from} / ${props.to} / ${props.flclass}`,
  };
  flights.value = await FlightApi.getFlights(obj);
  loading.value = false;
};

onMounted(async () => {
  cities.value = await FlightApi.getCities();
});
</script>

<style lang="scss">
.loader {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
}

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

      & > .btn__inner {
        height: 56px;
      }
    }
  }
}
</style>
