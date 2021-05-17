<template>
	<footer class="site-footer">
		<div class="container">
			<BaseButton
				href="https://www.facebook.com/lacajadepeliculas"
				target="_blank"
				variation="text-neutral"
				size="medium"
				icon-class="fab fa-facebook-square"
			/>
			<BaseButton
				href="https://www.instagram.com/lacajadepeliculas"
				target="_blank"
				variation="text-neutral"
				size="medium"
				icon-class="fab fa-instagram"
			/>
			<BaseButton
				href="https://www.youtube.com/lacajadepeliculas"
				target="_blank"
				variation="text-neutral"
				size="medium"
				icon-class="fab fa-youtube"
			/>
		</div>
	</footer>
</template>

<script>
import BaseButton from '@/components/BaseButton'

export default {
	components: {
		BaseButton,
	},
}
</script>

<style>
.site-footer {
	background-color: var(--gray-950);
	margin-top: auto;
}

.site-footer .container {
	display: flex;
	justify-content: center;
	padding: 1rem 0;
}
</style>
