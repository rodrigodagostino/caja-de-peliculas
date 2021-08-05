<template>
	<footer class="site-footer">
		<div class="container">
			<a href="https://github.com/rodrigodagostino/vue-movie-search-app" target="_blank">
				Made with <img src="@/assets/vue-logo.png" alt="Vue.js logo" /> by Rodrigo D’Agostino
			</a>
		</div>
	</footer>
</template>

<style>
.site-footer {
	background-color: var(--gray-950);
	font-size: 0.875rem;
	text-align: center;
	padding: 0.5rem 0;
	margin-top: auto;
}

.site-footer a {
	color: var(--gray-300);
	text-decoration: none;
	transition: color 0.24s ease;
}

.site-footer a:focus,
.site-footer a:hover {
	color: var(--white);
}

.site-footer img {
	height: 1.25rem;
	width: auto;
	vertical-align: middle;
	margin: 0 0.25rem;
	display: inline-block;
}

.site-footer .container {
	display: flex;
	justify-content: center;
	padding: 1rem 0;
}
</style>
