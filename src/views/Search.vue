<template>
	<section class="content">
		<transition name="slide-fade" leave-active-class="fade-leave-active" mode="out-in" type="animation">
			<BaseSpinner v-if="isFetching" size="medium" />
			<ul v-else-if="!isFetching && searchResults?.length" class="search-results">
				<SearchResult v-for="result in searchResults" :result="result" :key="result.imdbID" />
			</ul>
			<p v-else-if="!isFetching && isTitleNotFound" class="search-not-found">
				No results were found for <strong>“{{ $route.query.q }}”</strong>.
			</p>
		</transition>
	</section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute, onBeforeRouteUpdate } from 'vue-router'
import BaseSpinner from '@/components/BaseSpinner.vue'
import SearchResult from '@/components/SearchResult.vue'

const router = useRouter()
const route = useRoute()

const searchResults = ref( [] )
const isFetching = ref( false )
const isTitleNotFound = ref( false )

const fetchMoviesData = searchTerm => {
	isTitleNotFound.value = false
	isFetching.value = true
	searchResults.value = []

	const apiKey = import.meta.env.VITE_OMDB_API_KEY
	const apiUrl = 'https://www.omdbapi.com'

	fetch( `${ apiUrl }/?apikey=${ apiKey }&s=${ searchTerm }` )
		.then( response => response.json() )
		.then( data => {
			if ( data.Error === 'Movie not found!' ) {
				isTitleNotFound.value = true
			} else {
				searchResults.value = data.Search
			}
			isFetching.value = false
		})
		.catch( error => console.error( error ) )
}

onMounted( () => !route.query.q ? router.push( '/' ) : fetchMoviesData( route.query.q ) )

onBeforeRouteUpdate( ( to, from ) => {
	if ( to.query.q !== from.query.q ) {
		fetchMoviesData( to.query.q )
	}
})
</script>

<style scoped>
.search-results {
	display: grid;
	grid-template-columns: 1fr;
	column-gap: 1.25rem;
	justify-items: center;
	align-items: flex-start;
	row-gap: 2rem;
	list-style: none;
}

.search-not-found {
	font-family: 'Gloria Hallelujah', Arial, Helvetica, sans-serif;
	font-size: 1.75rem;
	line-height: 1.32;
	color: var(--gray-400);
	text-align: center;
	margin: 1rem auto 0;
	max-width: 100%;
	transition: font-size 0.32s ease, max-width 0.32s ease;
}

@media screen and (min-width: 30rem) {
	.search-results {
		grid-template-columns: repeat(2, minmax(0, 1fr));
		column-gap: 2rem;
		row-gap: 3rem;
	}
}

@media screen and (min-width: 42.5em) {
	.search-results {
		grid-template-columns: repeat(3, minmax(0, 1fr));
	}
}

@media screen and (min-width: 56em) {
	.search-results {
		grid-template-columns: repeat(4, minmax(0, 1fr));
	}
}
</style>
