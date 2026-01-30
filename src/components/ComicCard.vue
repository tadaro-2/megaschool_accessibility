<template>
  <article class="card comic-card">
    <img
      v-if="comic.cover"
      class="cover"
      :src="comic.cover.image"
      :alt="comic.cover.alt"
    />


    <h2>{{ comic.title }}</h2>
    <p class="author">{{ comic.author }}</p>
    <p class="blurb">{{ comic.blurb }}</p>
    <p class="pages">Страниц: {{ comic.pages?.length || 0 }}</p>

    <div class="actions">
      <RouterLink
        :to="`/comic/${comic.id}`"
        class="btn open-btn"
        :aria-label="`Открыть комикс ${comic.title}`"
      >
        Открыть
      </RouterLink>
    </div>

  </article>
</template>

<script setup>
defineProps({
  comic: {
    type: Object,
    required: true
  }
});
</script>
