<template>
  <svg class="geo" :viewBox="`0 0 ${size} ${size}`">
    <template v-if="!reverse">
      <path
        ref="mainPath"
        :d="sectorPath"
        :transform="sectorTransform"
        class="color-main"
      />
      <path
        ref="subPath"
        :d="sectorPath"
        :transform="sectorTransform"
        class="color-sub"
      />
    </template>
    <template v-else>
      <path
        ref="subPath"
        :d="sectorPath"
        :transform="sectorTransform"
        class="color-sub"
      />
      <path
        ref="mainPath"
        :d="sectorPath"
        :transform="sectorTransform"
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
const mainPath = ref<SVGPathElement | null>(null)
const subPath = ref<SVGPathElement | null>(null)

const size = computed(() => props.size)
const radius = computed(() => props.size)
const direction = computed(() => props.shapeDirection || 'up')
const reverse = computed(() => props.reverse)
const rotation = computed(() => {
  switch (direction.value) {
    case 'up':
      return 90
    case 'right':
      return 180
    case 'down':
      return 270
    default:
      return 0
  }
})
const sectorTransform = computed(
  () => `rotate(${rotation.value}, ${size.value / 2}, ${size.value / 2})`
)

const runAnimation = () => {
  if (!mainPath.value || !subPath.value) return
  const mainTarget = reverse.value ? subPath.value : mainPath.value
  const subTarget = reverse.value ? mainPath.value : subPath.value
  gsap.killTweensOf([mainPath.value, subPath.value])
  gsap.set([mainPath.value, subPath.value], {
    transformOrigin: "0 100%",
    transformBox: "fill-box",
  })

  switch (props.animationId) {
    case 4:
      gsap.set(mainTarget, { scale: 1 })
      gsap.set(subTarget, { scale: 1 })
      gsap.fromTo(
        subTarget,
        { rotation: rotation.value - 90 },
        {
          rotation: rotation.value,
          duration: props.duration,
          ease: props.easing,
          repeat: -1,
          yoyo: true,
          repeatDelay: 2,
          delay: props.delay
        }
      )
      break
    case 3:
      gsap.set(mainTarget, { scale: 1 })
      gsap.set(subTarget, { scale: 1 })
      gsap.fromTo(
        subTarget,
        { rotation: rotation.value + 90 },
        {
          rotation: rotation.value,
          duration: props.duration,
          ease: props.easing,
          repeat: -1,
          yoyo: true,
          repeatDelay: 2,
          delay: props.delay
        }
      )
      break
    case 2:
      gsap.timeline({
        repeat: -1,
        yoyo: true,
        repeatDelay: 2,
        delay: props.delay
      })
        .set(mainTarget, { scale: 1 })
        .set(subTarget, { scale: 0 })
        .to(mainTarget, {
          scale: 2,
          duration: props.duration,
          ease: props.easing,
        })
        .to(
          subTarget,
          {
            scale: 1,
            duration: props.duration,
            ease: props.easing,
          },
          0
        )
      break
    case 1:
    default:
      gsap.set(mainTarget, { scale: 1 })
      gsap.fromTo(
        subTarget,
        { scale: 0 },
        {
          scale: 1,
          duration: props.duration,
          ease: props.easing,
          repeat: -1,
          yoyo: true,
          repeatDelay: 2,
          delay: props.delay
        }
      )
      break
  }
}

const sectorPath = computed(() => {
  const r = radius.value
  return `M 0 ${r} L 0 0 A ${r} ${r} 0 0 1 ${r} ${r} Z`
})

onMounted(runAnimation)
watch(() => props.animationId, runAnimation)
</script>