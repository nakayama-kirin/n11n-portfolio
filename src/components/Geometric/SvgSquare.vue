<template>
  <svg class="geo" :viewBox="`0 0 ${size} ${size}`">
    <!-- 四角形パターン -->
    <template v-if="!reverse">
      <rect
        ref="mainRect"
        :x="0"
        :y="0"
        :width="size"
        :height="size"
        class="color-main"
      />
      <rect
        ref="subRect"
        :x="0"
        :y="0"
        :width="size"
        :height="size"
        class="color-sub"
      />
    </template>
    <template v-else>
      <rect
        ref="subRect"
        :x="0"
        :y="0"
        :width="size"
        :height="size"
        class="color-sub"
      />
      <rect
        ref="mainRect"
        :x="0"
        :y="0"
        :width="size"
        :height="size"
        class="color-main"
      />
    </template>
  </svg>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue"
import { gsap } from "gsap"
import { geometricProps } from "./geoProps"

const props = defineProps({
  ...geometricProps,
  delay: { type: Number, default: 0 }
})
const mainRect = ref<SVGRectElement | null>(null)
const subRect = ref<SVGRectElement | null>(null)

const size = computed(() => props.size)
const direction = computed(() => props.shapeDirection || 'up')
const reverse = computed(() => props.reverse)
const origin = computed(() => {
  switch (direction.value) {
    case 'up':
      return '0% 100%'
    case 'right':
      return '0% 0%'
    case 'down':
      return '100% 0%'
    default:
      return '100% 100%'
  }
})
const offset = computed(() => {
  switch (direction.value) {
    case 'up':
      return { x: 0, y: size.value }
    case 'right':
      return { x: -size.value, y: 0 }
    case 'down':
      return { x: 0, y: -size.value }
    default:
      return { x: size.value, y: 0 }
  }
})

const runAnimation = () => {
  if (!mainRect.value || !subRect.value) return
  const mainTarget = reverse.value ? subRect.value : mainRect.value
  const subTarget = reverse.value ? mainRect.value : subRect.value
  gsap.killTweensOf([mainRect.value, subRect.value])

  switch (props.animationId) {
    case 3:
      gsap.set(mainTarget, { scale: 1 })
      gsap.set(subTarget, {
        scale: 1,
        x: offset.value.x,
        y: offset.value.y,
      })
      gsap.to(subTarget, {
        x: 0,
        y: 0,
        duration: props.duration,
        ease: props.easing,
        repeat: -1,
        yoyo: true,
        repeatDelay: 2,
        delay: props.delay
      })
      break
    case 2:
      gsap.set([mainRect.value, subRect.value], {
        transformOrigin: origin.value,
        transformBox: "fill-box",
      })
      gsap.set(mainTarget, { scale: 1 })
      gsap.timeline({
        repeat: -1,
        yoyo: true,
        repeatDelay: 2,
        delay: props.delay
      })
        .set(subTarget, { scale: 0 })
        .to(
          subTarget,
          {
            scale: 1,
            duration: props.duration,
            ease: props.easing,
          }
        )
      break
    case 1:
    default:
      gsap.set([mainRect.value, subRect.value], {
        transformOrigin: origin.value,
        transformBox: "fill-box",
      })
      gsap.set(mainTarget, { scale: 0 })
      gsap.set(subTarget, { scale: 0 })
      gsap.to(mainTarget, {
        scale: 1,
        duration: props.duration,
        ease: props.easing,
        repeat: -1,
        yoyo: true,
        repeatDelay: 2,
        delay: props.delay
      })
      break
  }
}

onMounted(runAnimation)
watch(() => props.animationId, runAnimation)
</script>