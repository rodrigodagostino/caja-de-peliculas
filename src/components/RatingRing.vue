<template>
  <div>
    <svg :width="radius * 2" :height="radius * 2">
      <circle
        class="progress-ring__circle"
        stroke="var(--gray-600)"
        fill="transparent"
        :style="{ strokeDashoffset }"
        :stroke-width="stroke"
        :r="normalizedRadius"
        :cx="radius"
        :cy="radius"
      />
      <circle
        class="progress-ring__circle"
        stroke="var(--color-main)"
        fill="transparent"
        :stroke-dasharray="circumference"
        :style="{ strokeDashoffset }"
        :stroke-width="stroke"
        :r="normalizedRadius"
        :cx="radius"
        :cy="radius"
      />
    </svg>
    <span>{{ progress }}</span>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  radius: {
    type: Number,
    required: true,
  },
  progress: {
    type: Number,
    required: true,
  },
  stroke: {
    type: Number,
    required: true,
  },
})

const normalizedRadius = computed( () => props.radius - props.stroke / 2 )
const circumference = computed( () => normalizedRadius.value * 2 * Math.PI )
const strokeDashoffset = computed(
  () => circumference.value - props.progress / 10 * circumference.value,
)
</script>

<style scoped>
div {
  position: relative;
}

svg {
  vertical-align: middle; /* Removes blank space below. */
}

circle {
  transition: stroke-dashoffset 0.35s ease;
  transform: rotate(-90deg);
  transform-origin: 50% 50%;
}

span {
  font-size: 0.875rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
