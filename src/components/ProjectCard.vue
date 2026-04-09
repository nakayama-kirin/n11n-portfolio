<template>
  <v-card class="ma-4" max-width="400">
    <v-img
      :src="image"
      height="200"
      cover
    />
    <v-card-title>{{ title }}</v-card-title>
    <v-card-subtitle>{{ subtitle }}</v-card-subtitle>
    <v-card-text>
      {{ description }}
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn color="primary" text @click="handleClick">
        詳細を見る
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
interface Props {
  title: string
  subtitle?: string
  description: string
  image: string
}

withDefaults(defineProps<Props>(), {
  subtitle: '',
})

const emit = defineEmits<{
  click: []
}>()

const handleClick = () => {
  emit('click')
}
</script>
