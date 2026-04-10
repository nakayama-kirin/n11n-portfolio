<template>
  <div>
    <Header />

    <v-main>
      <div class="hero">
        <div class="hero-content">
          <v-row justify="center" align="center" class="text-center mb-12">
            <v-col cols="12" lg="8">
              <h1 class="text-h2 mb-4 font-playwrite">Portfolio</h1>
            </v-col>
          </v-row>
        </div>
        <div class="hero-bg">
          <GeometricAnimation :ratio="[16, 10]" />
        </div>
      </div>

      <v-container class="py-12">

        <v-row justify="center" align="stretch" class="gap-6">
          <v-col cols="12" md="4">
            <ProjectCard
              title="プロジェクト A"
              subtitle="Web アプリ"
              description="UX を重視したレスポンシブな Web アプリケーション。"
              image="https://picsum.photos/seed/a/400/200"
            />
          </v-col>
          <v-col cols="12" md="4">
            <ProjectCard
              title="プロジェクト B"
              subtitle="デザイン"
              description="ブランド価値を高めるビジュアルデザインとコンテンツ制作。"
              image="https://picsum.photos/seed/b/400/200"
            />
          </v-col>
          <v-col cols="12" md="4">
            <ProjectCard
              title="プロジェクト C"
              subtitle="開発"
              description="高品質なコードとパフォーマンス最適化を実現。"
              image="https://picsum.photos/seed/c/400/200"
            />
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <Footer />
  </div>
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
  }
}
</style>
