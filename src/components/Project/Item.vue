<template>
  <div class="project">
    <section>
      <h3 class="project-title">{{ project.title }}</h3>
      <p class="project-role">{{ project.role }}</p>
      <dl class="project-date">
        <dt>時期</dt>
        <dd>
          <time :datetime="project.date.start">{{ formatDate(project.date.start) }}</time>
          <small>から</small>
          <time :datetime="project.date.end">{{ formatDate(project.date.end) }}</time>
          <small>まで</small>
        </dd>
      </dl>
      <p class="project-description">{{ project.description }}</p>
      <ul class="project-skill-list">
        <li v-for="skill in project.skills" :key="skill">
          <p class="project-skill font-google-sans-code">{{ skill }}</p>
        </li>
      </ul>
      <div class="project-url" v-if="project.site?.length">
        <ul class="project-url-list">
          <li v-for="site in project.site" :key="site.url">
            <a :href="site.url" target="_blank" rel="noopener noreferrer">
              {{ site.label }}
            </a>
          </li>
        </ul>
      </div>
      <div v-if="project.image?.length" class="project-image">
        <img 
          :src="resolvedImageSrc" 
          :alt="project.title" 
          loading="lazy"
          @error="(e) => console.error('Image load error:', (e.target as HTMLImageElement).src)"
        />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Project } from './projectProps'

const props = defineProps<{
  project: Project
}>()

const runtimeConfig = useRuntimeConfig()

const resolvedImageSrc = computed(() => {
  const src = props.project.image?.[0]?.src
  if (!src) return ''
  if (src.startsWith('http') || src.startsWith('//')) return src
  // baseURLを結合。srcの先頭のスラッシュを考慮して調整
  return `${runtimeConfig.app.baseURL}${src.replace(/^\//, '')}`
})

const formatDate = (dateStr: string) => {
  if (!dateStr) return ''
  const parts = dateStr.split('-')
  if (parts.length !== 2) return dateStr
  return `${parts[0]}年${parts[1]}月`
}
</script>

<style lang="scss" scoped>
.project {
  margin: 60px 0;

  @include media(l) {
    margin: 80px 0;
  }

  >section {
    display: grid;
    grid-template-areas:
      "title role"
      "image image"
      "date date"
      "description description"
      "skill skill"
      "url url";
    grid-template-columns: auto 1fr;
    align-content: start;
    gap: 1.6rem 1.5rem;

    @include media(l) {
      grid-template-areas:
        "image title role"
        "image date date"
        "image description description"
        "image skill skill"
        "image url url";
      grid-template-columns: 500px auto 1fr;
      grid-template-rows: repeat(4, min-content) 1fr;
      align-content: start;
    }
  }

  &-title {
    order: -1;
    grid-area: title;
    font-size: 2.4rem;
  }

  &-role {
    grid-area: role;
    align-self: center;
    padding-top: 0.25em;
  }

  &-date {
    grid-area: date;
    display: flex;
    font-size: 1.2rem;

    dt {
      &::after {
        content: ":";
        margin-right: 4px;
      }
    }

    small {
      margin: 0 4px;
    }
  }

  &-description {
    grid-area: description;
  }

  &-skill {
    &-list {
      grid-area: skill;
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      list-style: none;
      padding: 0;
    }

    $size: 24px;

    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 12px;
    height: $size;
    line-height: 1;
    font-size: 1.2rem;
    color: #fff;
    font-weight: bold;
    background-color: map.get($color, primary);
    border-radius: $size * 0.5;
  }

  &-url {
    grid-area: url;

    @include media(l) {
      align-self: start;
      height: fit-content;
    }
    
    &-list {
      display: flex;
      flex-direction: column;
      gap: 10px;
      list-style: none;
      padding: 0;

      @include media(ml) {
        flex-direction: row;
        flex-wrap: wrap;
      }
    }

    a {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 10px;
      text-decoration: none;
      color: #fff;
      background-color: map.get($color, secondary);
      border-radius: $border-radius;

      &[target="_blank"] {
        &::after {
          content: "↗︎";
          font-size: 0.8em;
          padding-left: 4px;
        }
      }
    }
  }

  &-image {
    order: -1;
    grid-area: image;

    @include media(l) {
      order: unset;
      align-self: start;
    }

    img {
      max-width: 100%;
      border-radius: 8px;
    }
  }
}
</style>