<template>
  <div class="l-inner">
    <slot />
  </div>
</template>

<script setup lang="ts">
</script>

<style lang="scss">
.l-inner {
  width: 100%;
  padding: 0 map.get($padding, sp);
  margin: 0 auto;

  @include media(m) {
    padding-inline: map.get($padding, tb);
  }

  @include media(l) {
    max-width: $inner-max;
    padding-inline: map.get($padding, pc);
  }

  >* {
    &:first-child {
      margin-top: 0 !important;
    }

    &:last-child {
      margin-bottom: 0 !important;
    }
  }
}
</style>