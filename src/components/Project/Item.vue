<template>
  <div class="project">
    <section>
      <h3 class="project-title" v-html="project.title"></h3>
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
        <template v-for="(entry, index) in groupedImages" :key="index">
          <div v-if="entry.isGroup" class="project-image-group">
            <figure
              v-for="(img, iIndex) in entry.items"
              :key="iIndex"
              :class="getImageFigureClass(img)"
            >
              <img 
                :src="resolveImageUrl(img.src)" 
                alt=""
                loading="lazy"
                @error="(e) => console.error('Image load error:', (e.target as HTMLImageElement).src)"
              />
              <figcaption class="font-google-sans-code" v-html="img.caption"></figcaption>
            </figure>
          </div>
          <figure v-else :class="getImageFigureClass(entry)">
            <img 
              :src="resolveImageUrl(entry.src)" 
              alt=""
              loading="lazy"
              @error="(e) => console.error('Image load error:', (e.target as HTMLImageElement).src)"
            />
            <figcaption class="font-google-sans-code" v-html="entry.caption"></figcaption>
          </figure>
        </template>
      </div>
      <div v-else class="project-image">
        <img 
          :src="resolveImageUrl(`/images/project_no-image.jpg`)" 
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

const groupedImages = computed(() => {
  const images = props.project.image || []
  const groups: any[] = []
  const groupMap = new Map<string, any>()

  images.forEach((img) => {
    if (img.group) {
      if (groupMap.has(img.group)) {
        groupMap.get(img.group).items.push(img)
      } else {
        const newGroup = { isGroup: true, groupName: img.group, items: [img] }
        groups.push(newGroup)
        groupMap.set(img.group, newGroup)
      }
    } else {
      groups.push({ isGroup: false, ...img })
    }
  })
  
  return groups
})

const runtimeConfig = useRuntimeConfig()

const resolveImageUrl = (src: string) => {
  if (!src) return ''
  if (src.startsWith('http') || src.startsWith('//')) return src
  return `${runtimeConfig.app.baseURL}${src.replace(/^\//, '')}`
}

const getImageFigureClass = (image: { orientation?: 'landscape' | 'portrait' }) => ({
  'is-landscape': image.orientation !== 'portrait',
  'is-portrait': image.orientation === 'portrait',
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
    white-space: nowrap;
  }

  &-role {
    grid-area: role;
    align-self: center;
    padding-top: 0.25em;
    white-space: nowrap;
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
    box-sizing: content-box;
    display: flex;
    overflow-x: scroll;
    overflow-y: hidden;
    gap: 10px;
    height: calc( calc(100vw - map.get($padding, sp) * 2) * ((750 + 10) / (1164 + 10 + 375)));
    min-height: 250px;

    @include media(m) {
      height: calc( calc(100vw - map.get($padding, tb) * 2) * ((750 + 10) / (1164 + 10 + 375)));
    }
    
    @include media(sm) {
      ::-webkit-scrollbar {
        width: 10px;
        height: 10px;
      }

      ::-webkit-scrollbar-track {
        background: #f1f1f1;
      }

      ::-webkit-scrollbar-thumb {
        background: #888;
        border-radius: 5px;
      }

      ::-webkit-scrollbar-thumb:hover {
        background: #555;
      }
    }

    @include media(l) {
      box-sizing: border-box;
      overflow: hidden;
      order: unset;
      flex-wrap: wrap;
      align-self: start;
      height: auto;
      min-height: unset;
    }

    &-group {
      flex: 0 0 auto;
      display: flex;
      gap: 10px;
      height: 100%;
      
      @include media(l) {
        flex: 0 0 100%;
        align-items: stretch;
        width: 100%;
        height: auto;
      }
    }

    figure {
      flex: 0 0 auto;
      position: relative;
      height: inherit;

      @include media(l) {
        --figure-ratio: 1;

        flex: var(--figure-ratio) 1 0;
        margin: 0;
        min-width: 0;
        max-height: fit-content;
        scroll-snap-align: start;

        &.is-landscape {
          --figure-ratio: 1164 / 750;
          aspect-ratio: 1164 / 750;
        }

        &.is-portrait {
          --figure-ratio: 375 / 750;
          aspect-ratio: 375 / 750;
        }
      }
    }

    figcaption {
      position: absolute;
      z-index: 1;
      bottom: 0;
      right: 0;
      padding: 6px 8px;
      line-height: 1;
      font-size: 1.2rem;
      color: #fff;
      background-color: rgba(#000, 0.9);
      white-space: nowrap;
    }

    img {
      display: block;
      height: 100%;

      @include media(l) {
        width: 100%;
        height: auto;
      }
    }
  }
}
</style>
