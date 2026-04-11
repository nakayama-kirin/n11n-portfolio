<template>
  <svg class="geo" :viewBox="`0 0 ${size} ${size}`">
    <template v-if="!reverse">
      <circle
        ref="mainCircle"
        :cx="center"
        :cy="center"
        :r="radius"
        class="color-main"
      />
      <circle
        ref="subCircle"
        :cx="center"
        :cy="center"
        :r="radius"
        class="color-sub"
      />
    </template>
    <template v-else>
      <circle
        ref="subCircle"
        :cx="center"
        :cy="center"
        :r="radius"
        class="color-sub"
      />
      <circle
        ref="mainCircle"
        :cx="center"
        :cy="center"
        :r="radius"
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
const mainCircle = ref<SVGCircleElement | null>(null)
const subCircle = ref<SVGCircleElement | null>(null)

const size = computed(() => props.size)
const center = computed(() => props.size / 2)
const radius = computed(() => props.size * 0.5)
const reverse = computed(() => props.reverse)

const runAnimation = () => {
  if (!mainCircle.value || !subCircle.value) return
  const mainTarget = reverse.value ? subCircle.value : mainCircle.value
  const subTarget = reverse.value ? mainCircle.value : subCircle.value
  gsap.killTweensOf([mainCircle.value, subCircle.value])
  gsap.set([mainCircle.value, subCircle.value], {
    transformOrigin: "center center",
    transformBox: "fill-box",
  })

  switch (props.animationId) {
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

onMounted(runAnimation)
watch(() => props.animationId, runAnimation)
</script>
