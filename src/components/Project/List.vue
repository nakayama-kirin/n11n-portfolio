<template>
  <section>
    <Heading level="2" label="プロジェクト" accent="Projects" />
    <ProjectItem v-for="(project, index) in projectsData" :key="index" :project="project" />
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import projectsJson from './projects.json'
import type { Project } from './projectProps'
import ProjectItem from './Item.vue'

const projectsData = projectsJson.list as Project[]

const activeTab = ref(0)
</script>

<style lang="scss" scoped>
.project {
  &-wrap {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
  }

  &-tab {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  &-tab-list {
    display: flex;
    list-style: none;
    padding: 0;
    gap: 1rem;
    
    button {
      padding: 0.5rem 1rem;
      cursor: pointer;
      &[aria-selected="true"] {
        font-weight: bold;
        border-bottom: 2px solid var(--main-color);
      }
    }
  }

  &-item {
    padding: 1rem 0;
    border-bottom: 1px solid #eee;
  }
}

.tags { display: flex; gap: 0.5rem; list-style: none; padding: 0; font-size: 0.8rem; }
</style>