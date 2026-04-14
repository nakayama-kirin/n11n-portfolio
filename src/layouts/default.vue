<template>
  <div class="l-container">
    <slot />
  </div>
</template>

<script setup lang="ts">
// Vuetify layout provider
useHead({
  link: [
    { rel: 'preconnect', href: '//fonts.googleapis.com' },
    { rel: 'preconnect', href: '//fonts.gstatic.com', crossorigin: '' },
    { 
      rel: 'stylesheet', 
      href: '//fonts.googleapis.com/css2?family=Google+Sans+Code:ital,wght@0,300..800;1,300..800&family=Noto+Sans+JP:wght@100..900&family=Playwrite+IE:wght@100..400&display=swap' 
    }
  ]
})
</script>

<style lang="scss">
html {
  font-family: "Noto Sans JP", sans-serif;
  font-optical-sizing: auto;
  font-style: normal;
  font-size: 10px;
}

.l-container {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  font-size: 1.6rem;
  color: map.get($font-color, light);
  background-color: map.get($theme, light);
}

.font-playwrite {
  font-family: "Playwrite IE", cursive;
  font-optical-sizing: auto;
  font-style: normal;
}

.font-google-sans-code {
  font-family: "Google Sans Code", monospace;
  font-optical-sizing: auto;
  font-style: normal;
}
</style>
