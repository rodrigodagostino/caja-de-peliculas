<template>
	<section class="content">
		<transition name="slide-fade" leave-active-class="fade-leave-active" mode="out-in" type="animation">
			<BaseSpinner v-if="isFetching" size="medium" />
			<ul v-else-if="!isFetching && searchResults?.length" class="search-results">
				<SearchResult v-for="result in searchResults" :result="result" :key="result.imdbID" />
			</ul>
			<p v-else-if="!isFetching && isTitleNotFound" class="search-not-found">
				No se han encontrado resultados para <strong>“{{ $route.query.q }}”</strong>.
			</p>
		</transition>
	</section>
</template>

<script>
// @ is an alias to /src
import BaseSpinner from '@/components/BaseSpinner.vue'
import SearchResult from '@/components/SearchResult.vue'

export default {
	name: 'Search',
	components: {
		BaseSpinner,
		SearchResult,
	},
	data() {
		return {
			searchResults: [],
			isFetching: false,
			isTitleNotFound: false,
		}
	},
	watch: {
		$route( to ) {
			this.fetchMoviesData( to.query.q )
		},
	},
	methods: {
		fetchMoviesData( searchTerm ) {
			this.isTitleNotFound = false
			this.isFetching = true
			this.searchResults = []
			const apiKey = process.env.VUE_APP_OMDB_API_KEY
			const apiUrl = 'https://www.omdbapi.com'
			fetch( `${ apiUrl }/?apikey=${ apiKey }&s=${ searchTerm }` )
				.then( response => response.json() )
				.then( data => {
					if ( data.Error === 'Movie not found!' ) {
						this.isTitleNotFound = true
					} else {
						this.searchResults = data.Search
					}
					this.isFetching = false
				} )
				.catch( error => console.error( error ) )
		},
	},
	created() {
		this.fetchMoviesData( this.$route.query.q )
	},
}
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
		grid-template-columns: repeat(3, minmax(0,1fr));
	}
}

@media screen and (min-width: 56em) {
	.search-results {
		grid-template-columns: repeat(4, minmax(0,1fr));
	}
}
</style>
