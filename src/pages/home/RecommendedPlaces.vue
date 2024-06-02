<template>
  <section class="recommended-places">
		<h2>Рекомендуемые места для посещения</h2>
		<div class="first-line">
			<v-card class="mx-auto my-8" elevation="16" max-width="344">
      <v-card-item>
        <v-card-title> Бангалор </v-card-title>

        <v-card-subtitle> Пирамида Вэлли Интернэшнл </v-card-subtitle>
      </v-card-item>

      <img :src="img1" />
    </v-card>

		<v-card class="mx-auto my-8" elevation="16" max-width="344">
      <v-card-item>
        <v-card-title> Дели </v-card-title>

        <v-card-subtitle> Сад Лоди</v-card-subtitle>
      </v-card-item>

      <img :src="img2" />
    </v-card>
		</div>

		<div class="second-line">
			<v-card class="mx-auto my-8" elevation="16" max-width="344">
      <v-card-item>
        <v-card-title> Калькутта </v-card-title>

        <v-card-subtitle> Мраморный дворец Калькутта </v-card-subtitle>
      </v-card-item>

      <img :src="img3" />
    </v-card>

		<v-card class="mx-auto my-8" elevation="16" max-width="344">
      <v-card-item>
        <v-card-title> Ченнаи </v-card-title>

        <v-card-subtitle> ТРЦ ВР Ченнаи</v-card-subtitle>
      </v-card-item>

      <img :src="img4" />
    </v-card>

		<v-card class="mx-auto my-8" elevation="16" max-width="344">
      <v-card-item>
        <v-card-title> Ченнаи </v-card-title>

        <v-card-subtitle> Хайдарабад.Парк Джалагам Венгал Рао </v-card-subtitle>
      </v-card-item>

      <img :src="img5" />
    </v-card>
		</div>
  </section>
</template>

<script setup>
import { img1 } from "./img/img1";
import { img2 } from "./img/img2";
import { img3 } from "./img/img3";
import { img4 } from "./img/img4";
import { img5 } from "./img/img5";
</script>

<style>

.first-line {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-around;
}

.second-line {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
}

/* @media screen and (min-width: 720px) {
	
} */
</style>
