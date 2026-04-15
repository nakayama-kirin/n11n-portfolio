<template>
  <component :is="tag" class="heading">
    <span>{{ props.label }}</span>
    <small v-if="props.accent" class="heading-accent font-playwrite">{{ props.accent }}</small>
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  level?: string | number
  label: string
  accent?: string
}>()

const tag = computed(() => {
  const l = props.level ?? 2
  return String(l).startsWith('h') ? l : `h${l}`
})
</script>

<style lang="scss" scoped>
.heading {
  position: relative;
  margin: 60px 0 40px;
  text-align: center;
  font-size: 3.2rem;
  font-weight: bold;

  @include media(l) {
    margin: 100px 0 60px;
    font-size: 4rem;
  }

  &-accent {
    position: absolute;
    bottom: 0;
    font-size: 1.6rem;
    color: map.get($color, primary);
    transform: skew(-10deg) rotate(-10deg);
  }
}
</style>
