<template>
  <div class="hero">
    <div class="hero-content">
      <Inner>
        <h1 class="hero-heading font-playwrite">Portfolio</h1>
        <p class="hero-paragraph">
          Nakayama Kirin / Frontend Engineer
        </p>
      </Inner>
    </div>
    <div class="hero-bg">
      <div class="hero-bg-inner">
        <GeometricAnimation :ratio="[16, 8]" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style lang="scss" scoped>
.hero {
  position: relative;
  overflow: hidden;

  &-content {
    position: absolute;
    z-index: 1;
    inset: 0;
    margin: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    text-shadow: 0 0 1em rgba(map.get($theme, light), 0.7);
  }
  
  &-bg {
    position: relative;
    z-index: 0;
    opacity: 0.7;
    width: 100%;
    margin: 0 auto;

    @include media(l) {
      display: flex;
      justify-content: center;
    }
    
    &-inner {
      @include media(l) {
        position: relative;
        flex: 0 0 auto;
        width: map.get($media-pc, max);
      }

      &::before,
      &::after {
        @include media(l) {
          content: "";
          display: block;
          position: absolute;
          z-index: 1;
          inset: 0;
          width: map.get($padding, pc) * 2;
          background: linear-gradient(to left, transparent 0%, rgba(map.get($theme, light), 1) 90%);
          user-select: none;
        }
      }

      &::before {
        @include media(l) {
          right: unset;
        }
      }

      &::after {
        @include media(l) {
          left: unset;
          transform: scaleX(-1);
        }
      }
    }
  }

  &-heading {
    margin: 1em 0 0.5em;
    font-size: 3.6rem;
    line-height: 1.2;

    @include media(m) {
      font-size: 4.8rem;
    }

    @include media(l) {
      font-size: 6rem;
    }
  }
}
</style>
