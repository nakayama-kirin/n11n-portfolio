<template>
  <main>
    <div class="hero">
      <div class="hero-content">
        <h1 class="font-playwrite">Portfolio</h1>
      </div>
      <div class="hero-bg">
        <GeometricAnimation :ratio="[16, 8]" />
      </div>
    </div>
  </main>

  <Footer />
</template>

<script setup lang="ts">
// auto imported components are used directly
</script>

<style lang="scss" scoped>
.text-center {
  text-align: center;
}

.hero {
  position: relative;
  overflow: hidden;

  &-content {
    position: absolute;
    z-index: 1;
    inset: 0;
    margin: auto;
  }
  
  &-bg {
    position: relative;
    z-index: 0;
    opacity: 0.7;
    width: 100%;
    max-width: map-get($media-pc, max);
    margin: 0 auto;
  }
}
</style>
