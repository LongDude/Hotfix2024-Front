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

onMounted(() => {
  const lineDiv = document.getElementById(id.value);
  const traceA = {
    x: [1, 2, 3, 4, 16, 17, 26],
    y: props.y,
    type: "scatter",
  };
  const data = [traceA];

  Plotly.newPlot(
    id.value,
    /* JSON object */ {
      data: data,
      layout: { height: 400 },
    }
  );
});
</script>
