<template>
  <form @submit.prevent="submitForm" class="search-form" :style="formStyles">
    <div class="search-box">
      <input
        type="text"
        class="search-box__input"
        v-model="searchValue"
        placeholder="Type in the title…"
        required
      />
      <button type="submit" class="search-box__button">
        <i class="fas fa-search"></i>
        <span class="screen-reader-text">Search</span>
      </button>
    </div>
  </form>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const searchValue = ref(route.query.q ? route.query.q : '')

const formStyles = computed(() =>
  route.fullPath === '/' ? { 'margin-top': '24vh' } : { 'margin-top': '2rem' }
)

const submitForm = () => {
  router.push(`/search?q=${searchValue.value}`)
}
</script>

<style scoped>
.search-form {
  width: 100%;
  transition: margin 0.32s ease;
}

.search-box {
  display: flex;
  max-width: 100%;
  margin: 0 auto;
  background-color: var(--gray-950);
  border-radius: 0.75rem;
  transition:
    background-color 0.32s ease,
    box-shadow 0.32s ease,
    max-width 0.32s ease;
}

.search-box:focus-within {
  background-color: var(--gray-850);
  box-shadow:
    0 0 0 2px var(--color-main),
    0 0.5rem 2rem hsla(240, 11%, 4%, 0.8);
}

.search-box__input {
  font-size: 1.125rem;
  background-color: transparent;
  border: none;
  padding: 1rem;
  flex: 1;
  outline: none;
  min-width: 0; /* Reset default property. */
}

.search-box__button {
  font-size: 1.5rem;
  color: var(--color-main);
  border: none;
  border-radius: 0 0.75rem 0.75rem 0;
  outline: none;
  transition:
    color 0.32s ease,
    background-color 0.32s ease;
  cursor: pointer;
  padding: 0.75rem 1rem;
}

.search-box__button:focus,
.search-box__button:hover {
  color: inherit;
  background-color: var(--color-main);
}

@media screen and (min-width: 30em) {
  .search-box__input {
    font-size: 1.25rem;
    padding: 1rem 1.5rem;
  }

  .search-box__button {
    padding: 1rem 1.5rem;
  }
}

@media screen and (min-width: 45em) {
  .search-box {
    max-width: 80%;
  }
}
</style>
