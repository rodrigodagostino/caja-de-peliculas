<template>
	<li class="search-result">
		<picture class="search-result__poster">
			<img :src="result.Poster" class="search-result__poster-image" :alt="result.Title" />
		</picture>
		<div class="search-result__info">
			<h3 class="search-result__title">{{ result.Title }}</h3>
			<p class="search-result__year">{{ result.Year }}</p>
		</div>
		<router-link :to="`/title/${result.imdbID}`" class="search-result__link"
			>Ir a información detallada de {{ result.Title }}</router-link
		>
	</li>
</template>

<script>
export default {
	props: {
		result: {
			type: Object,
			required: true,
		},
	},
}
</script>

<style>
.search-result {
	border-radius: 12px;
	overflow: hidden;
	width: 100%;
	max-width: 17.5rem;
	display: block;
	transition: transform 0.32s ease, box-shadow 0.32s ease;
	will-change: transform;
}

.search-result:focus,
.search-result:hover {
	box-shadow: 0 0.5rem 2rem hsla(240, 11%, 4%, 0.8);
	transform: translate3d(0, -1rem, 0);
}

.search-result__poster {
	height: 0;
	padding-bottom: 100%;
	overflow: hidden;
	display: block;
	position: relative;
	background-color: var(--gray-850);
	transition: padding 0.32s ease;
}

.search-result__poster-image {
	object-fit: cover;
	position: absolute;
	height: 100%;
	width: 100%;
	transform: scale(1) rotate(0deg);
	transition: transform 0.32s ease;
}

.search-result:hover .search-result__poster-image {
	transform: scale(1.1) rotate(4deg);
	transition: transform 0.32s ease;
}

.search-result__info {
	background: var(--gray-850);
	padding: 0.75rem 1rem 1rem;
	text-align: center;
	position: relative;
	z-index: 1;
	transition: background-color 0.32s ease;
}

.search-result:hover .search-result__info {
	background: var(--gray-750);
}

.search-result__title {
	font-size: 1.25rem;
	line-height: 1.4;
}

.search-result__year {
	font-size: 0.875rem;
	color: var(--gray-300);
	margin-top: 0.25rem;
}

.search-result__link {
	position: absolute;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	text-indent: -9999px;
}

@media screen and (min-width: 30rem) {
	.search-result__title {
		font-size: 1.125rem;
	}
}

@media screen and (min-width: 53.75rem) {
	.search-result__poster {
		padding-bottom: 150%;
	}
}
</style>
