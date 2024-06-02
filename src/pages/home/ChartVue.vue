<template>
  <h2>Почасовая средняя цена</h2>
  <div :id="id"></div>
</template>

<script setup>
import Plotly from "plotly.js-dist-min";
import { onMounted } from "vue";

const props = defineProps({
  y: [],
});

const id = ref(Math.random().toString());

function *generateX() {
  for (let index = 0; index < 24; index++) {
    yield `${index.toString().padStart(2, '0')}:00`
  }
}

onMounted(() => {
  const traceA = {
    x: [...generateX()],
    y: props.y,
    type: "scatter",
  };
  const data = [traceA];

  Plotly.newPlot(
    id.value,
    {
      data,
      layout: { height: 400 },
    }
  );
});
</script>
