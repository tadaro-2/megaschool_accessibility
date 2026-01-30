<template>
  <section>
    <ul class="comic-list">
      <li v-for="comic in comics" :key="comic.id">
        <ComicCard :comic="comic" />
      </li>
    </ul>
  </section>
</template>

<script setup>
import comics from "../data/comics";
import ComicCard from "./ComicCard.vue";
</script>
