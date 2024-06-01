<template>
	<h2>Chart</h2>
	<line :chartdata="chartData" :options="chartOptions"/>
</template>

<script setup>
import { Line } from 'vue-chartjs';
</script>