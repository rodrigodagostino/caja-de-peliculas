<template>
  <div class="tooltip-wrapper">
    <transition name="fade" appear>
      <span v-if="isVisible" class="tooltip">{{ text }}</span>
    </transition>
    <slot />
  </div>
</template>

<script setup>
defineProps({
  text: {
    type: String,
    required: true,
  },
  isVisible: {
    type: Boolean,
    required: true,
  },
})
</script>

<style lang="scss" scoped>
.tooltip-wrapper {
  position: relative;
  display: flex;
}

.tooltip {
  display: block;
  padding: 0.5rem 0.75rem;
  border-radius: 0.25rem;
  position: absolute;
  bottom: 110%;
  left: 50%;
  transform: translateX(-50%);
  background-color: var(--black);
  font-size: 0.875rem;
  white-space: nowrap;

  &::after {
    width: 0;
    height: 0;
    content: '';
    border: 0.5rem solid;
    border-color: transparent;
    border-top-color: var(--black);
    position: absolute;
    top: 100%;
    left: calc(50% - 0.5rem);
  }
}
</style>
