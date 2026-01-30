<template>
  <main aria-label="Комикс">
    <h1>{{ comic.title }}</h1>
    <p class="blurb">{{ comic.blurb }}</p>
    <section class="page">
      <img
        :src="currentPage.image"
        :alt="currentPage.alt"
        class="page-image"
      />
    </section>

    <Player
      :script="currentPage.script"
      @page-change="onPageChange"
    />

    <nav class="page-nav">
      <button
        class="btn secondary"
        @click="prevPage"
        :disabled="pageIndex === 0"
      >
        ← Предыдущая
      </button>

      <span>
        Страница {{ pageIndex + 1 }} из {{ comic.pages.length }}
      </span>

      <button
        class="btn secondary"
        @click="nextPage"
        :disabled="pageIndex === comic.pages.length - 1"
      >
        Следующая →
      </button>
    </nav>

    <RouterLink to="/" class="back">
      ← Назад в каталог
    </RouterLink>
  </main>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import comics from "../data/comics";
import Player from "../components/Player.vue";

const route = useRoute();

const comicId = route.params.id || "space";

const comic = comics.find(c => c.id === comicId);

if (!comic) {
  throw new Error("Комикс не найден");
}

const pageIndex = ref(0);

const currentPage = computed(() => {
  return comic.pages[pageIndex.value];
});

function nextPage() {
  if (pageIndex.value < comic.pages.length - 1) {
    pageIndex.value++;
  }
}

function prevPage() {
  if (pageIndex.value > 0) {
    pageIndex.value--;
  }
}
</script>
