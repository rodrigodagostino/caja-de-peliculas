<template>
	<header class="site-header">
		<div class="container">
			<h1 class="site-title">
				<router-link to="./">
					<i class="fas fa-film"></i>
					<span>La Caja de Películas</span>
				</router-link>
			</h1>
			<SearchBox />
		</div>
	</header>
</template>

<script>
import SearchBox from '@/components/SearchBox'

export default {
	components: {
		SearchBox,
	},
}
</script>

<style scoped>
.site-header .container {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 2rem;
}

.site-title {
	font-size: 1.5rem;
	line-height: 1;
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
