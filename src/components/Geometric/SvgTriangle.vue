<template>
  <svg class="geo" :viewBox="`0 0 ${size} ${size}`" :data-direction="shapeDirection" :data-id="animationId">
    <template v-if="!reverse">
      <polygon
        ref="mainPolygon"
        :points="trianglePoints"
        class="color-main"
      />
      <polygon
        ref="subPolygon"
        :points="trianglePoints"
        class="color-sub"
      />
    </template>
    <template v-else>
      <polygon
        ref="subPolygon"
        :points="trianglePoints"
        class="color-sub"
      />
      <polygon
        ref="mainPolygon"
        :points="trianglePoints"
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
const mainPolygon = ref<SVGPolygonElement | null>(null)
const subPolygon = ref<SVGPolygonElement | null>(null)

const size = computed(() => props.size)
const reverse = computed(() => props.reverse)
const origin = computed(() => {
  if (props.triangleType === 'right') {
    switch (props.shapeDirection) {
      case 'up':
        return '0% 0%'
      case 'right':
        return '100% 0%'
      case 'down':
        return '100% 100%'
      default: // left
        return '0% 100%'
    }
  } else {
    switch (props.shapeDirection) {
      case 'up':
        return '50% 0%'
      case 'right':
        return '100% 50%'
      case 'down':
        return '50% 100%'
      default: // left
        return '0% 50%'
    }
  }
})

const runAnimation = () => {
  if (!mainPolygon.value || !subPolygon.value) return
  const mainTarget = reverse.value ? subPolygon.value : mainPolygon.value
  const subTarget = reverse.value ? mainPolygon.value : subPolygon.value
  gsap.killTweensOf([mainPolygon.value, subPolygon.value])
  gsap.set([mainPolygon.value, subPolygon.value], {
    transformOrigin: origin.value,
    transformBox: "fill-box",
  })

  switch (props.animationId) {
    case 2:
    case 4:
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

const trianglePoints = computed(() => {
  const s = props.size
  const direction = props.shapeDirection || 'up'

  if (props.triangleType === 'right') {
    switch (direction) {
      case 'up':
        return `0,0 ${s},0 0,${s}`
      case 'right':
        return `${s},0 ${s},${s} 0,0`
      case 'down':
        return `${s},${s} 0,${s} ${s},0`
      default:
        return `0,${s} 0,0 ${s},${s}`
    }
  }

  const h = (Math.sqrt(3) / 2) * s
  switch (direction) {
    case 'up':
      return `0,${s} ${s},${s} ${s / 2},${s - h}`
    case 'right':
      return `0,0 0,${s} ${h},${s / 2}`
    case 'down':
      return `0,0 ${s},0 ${s / 2},${h}`
    default: // left
      return `${s},0 ${s},${s} ${s - h},${s / 2}`
  }
})

onMounted(runAnimation)
watch(() => props.animationId, runAnimation)
</script>