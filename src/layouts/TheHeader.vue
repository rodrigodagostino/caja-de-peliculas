<template>
	<header class="site-header">
		<div class="container">
			<h1 class="site-title">
				<router-link to="./">
					<i class="fas fa-film" />
					<span>Movie Search App</span>
				</router-link>
			</h1>
			<SearchForm />
		</div>
	</header>
</template>

<script>
import SearchForm from '@/components/SearchForm.vue'

export default {
	components: {
		SearchForm,
	},
}
</script>

<style scoped>
.site-header .container {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}

.site-title {
	font-size: 1.5rem;
	line-height: 1;
	margin-top: 2rem;
	transition: font-size 0.32s ease;
}

.site-title a {
	text-decoration: none;
	padding: 0 0.75rem;
	display: flex;
	justify-content: center;
	align-items: center;
}

.site-title i {
	font-size: 3.25rem;
	color: var(--color-main);
	transition: font-size 0.32s ease;
}

.site-title i + span {
	margin-left: 0.75rem;
	flex: 0 1 50%;
}

@media screen and (min-width: 30em) {
	.site-title {
		font-size: 2rem;
		text-align: center;
	}

	.site-title i {
		font-size: 132%;
	}

	.site-title i + span {
		flex: 1;
	}
}
</style>