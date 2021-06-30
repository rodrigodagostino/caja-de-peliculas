<template>
	<main class="site-main">
		<div class="container">
			<router-view v-slot="slotProps">
				<transition name="slide-fade" leave-active-class="fade-leave-active" mode="out-in">
					<component :is="slotProps.Component" />
				</transition>
			</router-view>
		</div>
	</main>
</template>

<style>
.site-main {
	margin: 3.25rem 0;
}
</style>