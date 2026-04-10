<template>
  <v-app>
    <slot />
  </v-app>
</template>

<script setup lang="ts">
// Vuetify layout provider
useHead({
  link: [
    { rel: 'preconnect', href: '//fonts.googleapis.com' },
    { rel: 'preconnect', href: '//fonts.gstatic.com', crossorigin: '' },
    { 
      rel: 'stylesheet', 
      href: '//fonts.googleapis.com/css2?family=Playwrite+IE:wght@100..400&display=swap' 
    }
  ]
})
</script>

<style>
.font-playwrite {
  font-family: "Playwrite IE", cursive;
  font-optical-sizing: auto;
  font-style: normal;
}
</style>
