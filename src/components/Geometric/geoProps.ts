import type { PropType, ExtractPropTypes } from 'vue'

export const geometricProps = {
  mainColor: {
    type: String as PropType<string>,
    default: '#42b883',
  },
  subColor: {
    type: String as PropType<string>,
    default: '#35495e',
  },
  baseColor: {
    type: String as PropType<string>,
    default: 'transparent',
  },
  size: {
    type: Number as PropType<number>,
    default: 60,
  },
  triangleType: {
    type: String as PropType<'equilateral' | 'right'>,
    default: 'right',
  },
  shapeDirection: {
    type: String as PropType<'up' | 'down' | 'left' | 'right'>,
    default: 'up',
  },
  animationId: {
    type: Number as PropType<number>,
    default: 1,
  },  reverse: {
    type: Boolean as PropType<boolean>,
    default: false,
  },  duration: {
    type: Number as PropType<number>,
    default: 1,
  },
  easing: {
    type: String as PropType<string>,
    default: 'power3.inOut',
  },
}

export type GeometricProps = ExtractPropTypes<typeof geometricProps>
