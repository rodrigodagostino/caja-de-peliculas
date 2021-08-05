<template>
	<transition name="fade" appear>
		<div class="modal-container">
			<div class="modal">
				<header class="modal-header">
					<h3 class="modal-title">
						<slot name="title" />
					</h3>
					<BaseButton
						variation="text-neutral"
						icon-classes="fas fa-times"
						text-classes="screen-reader-text"
						@click="$emit('close-modal')"
					>
						<template #default>Close modal window</template>
					</BaseButton>
				</header>
				<div class="modal-content">
					<slot />
				</div>
			</div>
			<div class="backdrop" @click="$emit('close-modal')" />
		</div>
	</transition>
</template>

<script>
import BaseButton from '@/components/BaseButton.vue'

export default {
	emits: [ 'close-modal' ],
	components: {
		BaseButton,
	},
}
</script>

<style scoped>
.modal-container {
	position: fixed;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
}

.modal {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -56%);
	width: 90%;
	max-width: 53.75rem;
	margin: 0;
	border-radius: 12px;
	padding: 1rem;
	background-color: var(--gray-950);
	z-index: 100;
}

.modal-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.modal-title {
	padding: 0 1rem;
}

.modal-content {
	margin-top: 1rem;
}

.backdrop {
	position: absolute;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	z-index: 10;
	background-color: rgba(0, 0, 0, 0.75);
}

@media screen and (max-width: 46.25em) and (orientation: landscape) {
	.modal {
		width: 64%;
		transform: translate(-50%, -50%);
	}
}
</style>