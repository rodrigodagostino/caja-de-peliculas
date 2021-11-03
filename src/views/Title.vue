<template>
	<section class="content">
		<transition name="slide-fade" leave-active-class="fade-leave-active" mode="out-in" type="animation">
			<BaseSpinner v-if="isFetching" size="medium" />
			<div v-else-if="!isFetching && movieData.hasOwnProperty('Title')" class="title__overview">
				<picture class="title__poster">
					<img
						v-if="movieData.Poster !== 'N/A'"
						:src="movieData.Poster"
						class="title__poster-image"
						:alt="movieData.Title"
					/>
					<img
						v-else
						src="@/assets/placeholder-image.svg"
						class="title__poster-image"
						alt="Placeholder for the missing poster"
					/>
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
							<RatingRing
								class="title__rating"
								:radius="20"
								:progress="+movieData.imdbRating"
								:stroke="4"
							/>
						</aside>
						<p class="title__plot">{{ movieData.Plot }}</p>
						<p class="title__cast">{{ movieData.Actors }}</p>
					</section>
					<footer class="title__footer">
						<BaseButton icon-classes="fas fa-play" @click="openTrailerModal">
							<template #default>Watch trailer</template>
						</BaseButton>
						<BaseTooltip text="Link copied" :isVisible="isCopyUrlTooltipVisible">
							<BaseButton
								href="#"
								variation="text-neutral"
								text-classes="screen-reader-text"
								icon-classes="fas fa-share-alt"
								@click="copyTitleUrl"
							>
								<template #default>Copy this URL</template>
							</BaseButton>
						</BaseTooltip>
						<input class="title__url-input" ref="urlInput" :value="urlInputValue" />
					</footer>
				</div>
			</div>
		</transition>
		<teleport to="body">
			<BaseModal
				v-if="isTrailerModalVisible && youTubeVideoData.hasOwnProperty('id')"
				@close-modal="closeTrailerModal"
			>
				<template #title>{{ `${movieData.Title} (${movieData.Year})` }}</template>
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
		</teleport>
	</section>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import BaseButton from '@/components/BaseButton.vue'
import BaseModal from '@/components/BaseModal.vue'
import RatingRing from '@/components/RatingRing.vue'
import BaseSpinner from '@/components/BaseSpinner.vue'
import BaseTooltip from '@/components/BaseTooltip.vue'

const route = useRoute()

const movieData = ref( {} )
const youTubeVideoData = ref( {} )
const isFetching = ref( true )
const isCopyUrlTooltipVisible = ref( false )
const isTrailerModalVisible = ref( false )

const urlInput = ref( null )
const urlInputValue = window.location.href

watch( movieData, () => {
	fetchYouTubeVideoData()
} )

const fetchMovieData = id => {
	isFetching.value = true
	movieData.value = {}
	const apiKey = import.meta.env.VITE_OMDB_API_KEY
	const apiUrl = 'https://www.omdbapi.com'
	fetch( `${ apiUrl }/?apikey=${ apiKey }&i=${ id }` )
		.then( response => response.json() )
		.then( data => {
			movieData.value = data
			isFetching.value = false
		} )
		.catch( error => console.error( error ) )
}

const openTrailerModal = () => isTrailerModalVisible.value = true

const closeTrailerModal = () => isTrailerModalVisible.value = false

const fetchYouTubeVideoData = () => {
	youTubeVideoData.value = {}
	if ( movieData.value.Title ) {
		const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY
		const q = encodeURI(
			movieData.value.Title.replace( '&', 'and' ) + ' ' + movieData.value.Year + ' trailer'.toLowerCase(),
		)
		const apiUrl = 'https://youtube.googleapis.com/youtube/v3'
		fetch( `${ apiUrl }/search?part=snippet&maxResults=1&q=${ q }&key=${ apiKey }` )
			.then( response => response.json() )
			.then( data => youTubeVideoData.value = data.items[ 0 ] )
			.catch( error => console.error( error ) )
	}
}

const copyTitleUrl = () => {
	isCopyUrlTooltipVisible.value = true
	navigator.clipboard.writeText( urlInput.value.value )
	setTimeout( () => {
		isCopyUrlTooltipVisible.value = false
	}, 3000 )
}

onMounted( () => {
	fetchMovieData( route.params.id )
} )
</script>

<style scoped lang="scss">
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

	& > * + * {
		margin-top: 1rem;
	}
}

.title__meta {
	font-size: 0.875rem;
	display: flex;
	align-items: center;

	span:nth-child(2) {
		margin: 0 1rem;
	}
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

.title__url-input {
	display: none;
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
