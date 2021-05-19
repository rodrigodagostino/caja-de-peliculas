<template>
	<section class="content">
		<transition name="slide-fade" leave-active-class="fade-leave-active" mode="out-in" type="animation">
			<BaseSpinner v-if="isFetching" size="medium" />
			<div v-else-if="!isFetching && movieData.hasOwnProperty('Title')" class="title__overview">
				<picture class="title__poster">
					<img :src="movieData.Poster" class="title__poster-image" :alt="movieData.Title" />
				</picture>
				<div class="title__content">
					<header class="title__header">
						<h3 class="title__title">{{ movieData.Title }}</h3>
						<div class="title__subtitle">
							<span class="title__year">{{ movieData.Year }}</span>
							<span class="title__director">{{ movieData.Director }}</span>
						</div>
					</header>
					<section class="title__body">
						<aside class="title__meta">
							<span class="title__runtime">{{ movieData.Runtime }}</span>
							<span class="title__genre">{{ movieData.Genre }}</span>
							<RatingRing class="title__rating" :radius="20" :progress="+movieData.imdbRating" :stroke="4" />
						</aside>
						<p class="title__plot">{{ movieData.Plot }}</p>
						<p class="title__cast">{{ movieData.Actors }}</p>
					</section>
					<footer class="title__footer">
						<BaseButton type="button" icon-class="fas fa-play" @click="openTrailerModal">
							<template #default>Ver avance</template>
						</BaseButton>
						<BaseButton href="#" variation="text-neutral" icon-class="fas fa-share-alt" />
					</footer>
				</div>
			</div>
		</transition>
		<teleport to="body">
			<transition name="fade" appear>
				<BaseModal
					v-if="isTrailerModalVisible && youTubeVideoData.hasOwnProperty('id')"
					@close-modal="closeTrailerModal"
				>
					<template #title>{{ movieData.Title }}</template>
					<template #default>
						<div class="title__trailer-container">
							<iframe
								class="title__trailer"
								width="560"
								height="315"
								:src="`https://www.youtube-nocookie.com/embed/${youTubeVideoData.id.videoId}`"
								title="YouTube video player"
								frameborder="0"
								allow="autoplay; encrypted-media; picture-in-picture"
								allowfullscreen
							></iframe>
						</div>
					</template>
				</BaseModal>
			</transition>
		</teleport>
	</section>
</template>

<script>
import BaseButton from '@/components/BaseButton.vue'
import BaseModal from '@/components/BaseModal.vue'
import RatingRing from '@/components/RatingRing.vue'
import BaseSpinner from '@/components/BaseSpinner.vue'

export default {
	name: 'Title',
	components: {
		BaseButton,
		BaseModal,
		RatingRing,
		BaseSpinner,
	},
	data() {
		return {
			movieData: {},
			youTubeVideoData: {},
			isFetching: true,
			isTrailerModalVisible: false,
		}
	},
	watch: {
		movieData() {
			this.fetchYouTubeVideoData()
		},
	},
	methods: {
		fetchMovieData( id ) {
			this.isFetching = true
			this.movieData = {}
			const apiKey = process.env.VUE_APP_OMDB_API_KEY
			const apiUrl = 'https://www.omdbapi.com'
			fetch( `${ apiUrl }/?apikey=${ apiKey }&i=${ id }` )
				.then( response => response.json() )
				.then( data => {
					this.movieData = data
					this.isFetching = false
				} )
				.catch( error => console.error( error ) )
		},
		openTrailerModal() {
			this.isTrailerModalVisible = true
		},
		closeTrailerModal() {
			this.isTrailerModalVisible = false
		},
		fetchYouTubeVideoData() {
			this.youTubeVideoData = {}
			if ( this.movieData.Title ) {
				const apiKey = process.env.VUE_APP_YOUTUBE_API_KEY
				const q = encodeURI(
					this.movieData.Title.replace( '&', 'and' ) + ' ' + this.movieData.Year + ' trailer'.toLowerCase(),
				)
				const apiUrl = 'https://youtube.googleapis.com/youtube/v3'
				fetch( `${ apiUrl }/search?part=snippet&maxResults=1&q=${ q }&key=${ apiKey }` )
					.then( response => response.json() )
					.then( data => this.youTubeVideoData = data.items[ 0 ] )
					.catch( error => console.error( error ) )
			}
		},
	},
	created() {
		this.fetchMovieData( this.$route.params.id )
	},
}
</script>

<style scoped>
.title__overview {
	display: flex;
	flex-direction: column;
	background: linear-gradient(160deg, var(--gray-850) 0%, var(--gray-950) 100%);
	margin: 50% auto 0;
	max-width: 100%;
	border-radius: 0.75rem;
	transition: max-width 0.32s ease;
}

.title__poster {
	background-color: var(--gray-850);
	flex: 1;
	margin: -50% auto 0;
	width: calc(100% - 3rem);
	max-width: 18.75rem;
	border-radius: 0.75rem;
	overflow: hidden;
	transition: width 0.32s ease;
}

.title__content {
	flex: 1;
	color: var(--gray-300);
	padding: 1.5rem;
	border-radius: 0 0 0.75rem 0.75rem;
	transition: padding 0.32s ease;
}

.title__title {
	font-size: 2rem;
	line-height: 1.2;
}

.title__subtitle {
	margin-top: 0.5rem;
	display: flex;
}

.title__year + .title__director {
	margin-left: 1rem;
}

.title__rating {
	margin-left: auto;
}

.title__body {
	margin-top: 2rem;
}

.title__body > * + * {
	margin-top: 1rem;
}

.title__meta {
	font-size: 0.875rem;
	display: flex;
	align-items: center;
}

.title__meta span:nth-child(2) {
	margin: 0 1rem;
}

.title__plot {
	color: var(--white);
}

.title__runtime {
	border: 1px solid var(--gray-300);
	padding: 0.25rem 0.5rem;
	white-space: nowrap;
}

.title__cast {
	font-size: 0.875rem;
}

.title__footer {
	display: flex;
	justify-content: space-between;
	padding-top: 2rem;
	margin-top: auto;
}

.title__trailer-container {
	position: relative;
	overflow: hidden;
	padding-bottom: 56.25%;
	margin: 0 auto;
	border-radius: 0.75rem;
}

.title__trailer {
	position: absolute;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	width: 100%;
	height: 100%;
}

@media screen and (min-width: 30em) {
	.title__content {
		padding: 2rem;
	}
}

@media screen and (min-width: 38.75em) {
	.title__overview {
		flex-direction: row;
		align-items: flex-start;
		margin-top: 2rem;
	}

	.title__poster {
		flex: 1;
		margin: -2rem 0 1.5rem 1.5rem;
	}

	.title__content {
		flex: 1;
		border-radius: 0 0.75rem 0.75rem 0;
	}
}

@media screen and (min-width: 53.75em) {
	.title__poster {
		flex: 0 1 40%;
	}

	.title__overview {
		max-width: 80%;
	}
}
</style>
