<template>
  <div class="geo-wrap" :style="colorVars">
    <div class="geo-grid" :style="gridStyle">
      <component
        v-for="item in gridItems"
        :key="item.id"
        :is="item.component"
        v-bind="geoProps"
        :shape-direction="item.shapeDirection"
        :triangle-type="item.triangleType"
        :animationId="item.animationId"
        :reverse="item.reverse"
        :delay="item.delay"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue"
import type { PropType } from "vue"
import { geometricProps } from "./geoProps"
import GeometricSvgCircle from "./SvgCircle.vue"
import GeometricSvgCircular from "./SvgCircular.vue"
import GeometricSvgTriangle from "./SvgTriangle.vue"
import GeometricSvgSquare from "./SvgSquare.vue"

const props = defineProps({
  ...geometricProps,
  rows: {
    type: Number as PropType<number>,
    default: undefined,
  },
  cols: {
    type: Number as PropType<number>,
    default: undefined,
  },
  ratio: {
    type: Array as PropType<number[]>,
    default: () => [1, 1],
  },
})

const geoProps = computed(() => ({
  mainColor: props.mainColor,
  subColor: props.subColor,
  baseColor: props.baseColor,
  size: props.size,
  duration: props.duration,
  easing: props.easing,
}))

const seed = ref(Math.floor(Math.random() * 2147483647))
const defaultCols = computed(() => Math.max(1, Math.min(8, Math.floor(1200 / props.size))))
const cols = computed(() => props.cols ?? defaultCols.value)
const ratio = computed<[number, number]>(() => {
  const tuple = props.ratio ?? [1, 1]
  const x = tuple[0] ?? 1
  const y = tuple[1] ?? 1
  return x > 0 && y > 0 ? [x, y] : [1, 1]
})
const rows = computed(() => {
  if (props.rows) return props.rows
  const [x, y] = ratio.value
  return Math.max(1, Math.round(cols.value * y / x))
})

const rngState = ref(seed.value)
const random = () => {
  rngState.value = (rngState.value * 16807) % 2147483647
  return rngState.value / 2147483647
}

const randomChoice = <T,>(items: readonly T[]) => items[Math.floor(random() * items.length)]
const randomBoolean = () => random() < 0.5

const gridItems = computed(() => {
  const shapeComponents = [
    GeometricSvgCircle,
    GeometricSvgCircular,
    GeometricSvgTriangle,
    GeometricSvgSquare,
  ]
  const directions = ["up", "right", "down", "left"] as const
  const triangleTypes = ["right"] as const
  const animationIds = [1, 2, 3, 4] as const
  const count = rows.value * cols.value
  rngState.value = seed.value

  return Array.from({ length: count }, (_, index) => {
    const component = randomChoice(shapeComponents)
    return {
      id: index,
      component,
      animationId: randomChoice(animationIds),
      shapeDirection: randomChoice(directions),
      triangleType: component === GeometricSvgTriangle ? randomChoice(triangleTypes) : undefined,
      reverse: randomBoolean(),
      delay: (index % 6) * 0.3, // 6つのグループに分けて0.3秒ずつずらす
    }
  })
})

const gridStyle = computed(() => ({
  gridTemplateColumns: `repeat(${cols.value}, minmax(var(--size), 1fr))`,
}))

const colorVars = computed(() => ({
  "--main-color": props.mainColor,
  "--sub-color": props.subColor,
  "--base-color": props.baseColor,
  "--size": `${props.size}px`,
  "--duration": `${props.duration}s`,
  "--easing": props.easing,
  "--aspect-ratio": `${ratio.value[1] / ratio.value[0]}`,
  "--min-width": `calc(${cols.value} * ${props.size}px)`,
}))
</script>

<style lang="scss">
.geo-wrap {
  position: relative;
  display: block;
  overflow: hidden;
  width: 100%;
  min-width: var(--min-width);
  margin: auto;

  &::before {
    content: "";
    display: block;
    padding-top: calc(var(--aspect-ratio) * 100%);
  }
}

.geo-grid {
  position: absolute;
  inset: 0;
  display: grid;
  gap: 0;
  justify-items: center;
  margin: auto;
}

.geo {
  display: block;
  overflow: hidden;
  width: 100%;
  height: 100%;
  transition: transform var(--duration) var(--easing);
}

.color-main {
  fill: var(--main-color);
}

.color-sub {
  fill: var(--sub-color);
}
</style>