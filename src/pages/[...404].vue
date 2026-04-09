<template>
  <v-container class="py-16">
    <v-row justify="center" align="center" class="min-h-screen">
      <v-col cols="12" md="6" class="text-center">
        <v-card class="pa-8">
          <v-card-title class="text-h2 mb-4">
            404
          </v-card-title>
          <v-card-text class="text-body1 mb-6">
            ページが見つかりません
          </v-card-text>
          <v-card-actions class="justify-center">
            <v-btn color="primary" to="/">
              ホームに戻る
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
//
</script>

<style scoped>
.min-h-screen {
  min-height: 100vh;
}
</style>
