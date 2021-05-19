<template>
	<div>
		<svg :width="radius * 2" :height="radius * 2">
			<circle
				class="progress-ring__circle"
				stroke="var(--gray-600)"
				fill="transparent"
				:style="{ strokeDashoffset }"
				:stroke-width="stroke"
				:r="normalizedRadius"
				:cx="radius"
				:cy="radius"
			/>
			<circle
				class="progress-ring__circle"
				stroke="var(--color-main)"
				fill="transparent"
				:stroke-dasharray="circumference + ' ' + circumference"
				:style="{ strokeDashoffset }"
				:stroke-width="stroke"
				:r="normalizedRadius"
				:cx="radius"
				:cy="radius"
			/>
		</svg>
		<span>{{ progress }}</span>
	</div>
</template>

<script>
export default {
	props: {
		radius: {
			type: Number,
			required: true,
		},
		progress: {
			type: Number,
			required: true,
		},
		stroke: {
			type: Number,
			required: true,
		},
	},
	data() {
		const normalizedRadius = this.radius - this.stroke / 2
		const circumference = normalizedRadius * 2 * Math.PI

		return {
			normalizedRadius,
			circumference,
		}
	},
	computed: {
		strokeDashoffset() {
			return this.circumference - this.progress / 10 * this.circumference
		},
	},
}
</script>

<style scoped>
div {
	position: relative;
}

svg {
	vertical-align: middle; /* Removes blank space below. */
}

circle {
	transition: stroke-dashoffset 0.35s;
	transform: rotate(-90deg);
	transform-origin: 50% 50%;
}

span {
	font-size: 0.875rem;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
}
</style>
