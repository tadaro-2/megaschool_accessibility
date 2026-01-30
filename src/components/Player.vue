<template>
  <section class="player" aria-label="Аудиоплеер">
    <div class="script" aria-hidden="true">
      <div
        v-for="(line, i) in script"
        :key="i"
        class="line"
      >
        <strong>{{ line.who }}:</strong> {{ line.text }}
      </div>
    </div>

    <div class="controls">
      <button
        class="btn"
        @click="toggle"
        aria-label="Управление воспроизведением"
      >
        <span aria-hidden="true">
          {{ isPlaying ? "Пауза" : "Воспроизвести" }}
        </span>
      </button>

      <label>
        Скорость:
        <select v-model.number="rate">
          <option :value="0.8">0.8×</option>
          <option :value="1">1.0×</option>
          <option :value="1.2">1.2×</option>
          <option :value="1.4">1.4×</option>
        </select>
      </label>
    </div>

    <div
      class="sr-only"
      :aria-live="isPlaying ? 'off' : 'polite'"
    >
      {{ statusMessage }}
    </div>
  </section>
</template>

<script setup>
import { ref, watch, onUnmounted } from "vue";

const props = defineProps({
  script: {
    type: Array,
    required: true
  }
});

const isPlaying = ref(false);
const rate = ref(1);
const statusMessage = ref("");

let utterance = null;

function stopSpeech() {
  speechSynthesis.cancel();
  utterance = null;
  isPlaying.value = false;
}

function playPage() {
  stopSpeech();

  if (!props.script || props.script.length === 0) return;

  const text = props.script
    .map(line => `${line.who}. ${line.text}`)
    .join(" ");

  utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "ru-RU";
  utterance.rate = rate.value;

  utterance.onend = () => {
    isPlaying.value = false;
    statusMessage.value = "Воспроизведение завершено";
  };

  speechSynthesis.speak(utterance);
  isPlaying.value = true;
  statusMessage.value = "Воспроизведение начато";
}

function toggle() {
  if (isPlaying.value) {
    speechSynthesis.pause();
    isPlaying.value = false;
    statusMessage.value = "Пауза";
  } else {
    if (speechSynthesis.paused) {
      speechSynthesis.resume();
      isPlaying.value = true;
      statusMessage.value = "Продолжение воспроизведения";
    } else {
      playPage();
    }
  }
}

watch(
  () => props.script,
  () => {
    stopSpeech(); 
  }
);

watch(rate, () => {
  if (speechSynthesis.speaking || speechSynthesis.paused) {
    playPage();
  }
});

onUnmounted(() => {
  stopSpeech();
});
</script>
