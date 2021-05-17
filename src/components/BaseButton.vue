<template>
	<component
		:is="tag"
		:href="href"
		:target="target"
		:type="type"
		class="button"
		:class="{
			'button--fill-main': variation === 'fill-main',
			'button--fill-neutral': variation === 'fill-neutral',
			'button--outline-main': variation === 'outline-main',
			'button--outline-neutral': variation === 'outline-neutral',
			'button--text-main': variation === 'text-main',
			'button--text-neutral': variation === 'text-neutral',
			'button--small': size === 'small',
			'button--medium': size === 'medium',
			'button--large': size === 'large',
		}"
	>
		<i v-if="iconClass" :class="iconClass"></i>
		<span v-if="$slots.default" :class="spanClass"><slot></slot></span>
	</component>
</template>

<script>
export default {
	props: {
		href: {
			type: String,
			required: false,
			default: null,
		},
		target: {
			type: String,
			required: false,
			default: null,
		},
		type: {
			type: String,
			required: false,
			default: null,
		},
		variation: {
			type: String,
			required: false,
			default: 'outline-main',
		},
		size: {
			type: String,
			required: false,
			default: null,
		},
		iconClass: {
			type: String,
			required: false,
			default: null,
		},
		spanClass: {
			type: String,
			required: false,
			default: null,
		},
	},
	computed: {
		tag() {
			if ( this.href ) {
				return 'a'
			}
			return 'button'
		},
	},
}
</script>

<style scoped>
.button {
	font-family: var(--font-main);
	font-weight: 600;
	text-transform: uppercase;
	cursor: pointer;
	border-radius: 0.5rem;
	padding: 0.5rem 1rem;
	transition: color 0.32s ease, background-color 0.32s ease, border 0.32s ease;
	outline: none;
}

.button i + span {
	margin-left: 0.5rem;
}

.button--fill-main {
	color: white;
	background-color: var(--color-main);
	border: 2px solid var(--color-main);
}

.button--fill-main:focus,
.button--fill-main:hover {
	background-color: var(--color-main--light);
	border-color: var(--color-main--light);
}

.button--fill-main:active {
	background-color: var(--color-main--dark);
	border-color: var(--color-main--dark);
}

.button--fill-neutral {
	color: white;
	background-color: var(--gray-400);
	border: 2px solid var(--gray-400);
}

.button--fill-neutral:focus,
.button--fill-neutral:hover {
	background-color: var(--gray-200);
	border-color: var(--gray-200);
}

.button--fill-neutral:active {
	background-color: var(--gray-600);
	border-color: var(--gray-600);
}

.button--outline-main {
	color: var(--color-main);
	background-color: transparent;
	border: 2px solid var(--color-main);
}

.button--outline-main:focus,
.button--outline-main:hover {
	color: white;
	background-color: var(--color-main);
}

.button--outline-main:active {
	background-color: var(--color-main--dark);
}

.button--outline-neutral {
	color: var(--gray-400);
	background-color: transparent;
	border: 2px solid var(--gray-400);
}

.button--outline-neutral:focus,
.button--outline-neutral:hover {
	color: white;
	background-color: var(--gray-400);
}

.button--outline-neutral:active {
	background-color: var(--gray-600);
}

.button--text-main {
	color: var(--color-main);
	background-color: transparent;
	border: 2px solid transparent;
}

.button--text-main:focus,
.button--text-main:hover {
	color: var(--color-main--light);
}

.button--text-neutral {
	color: var(--gray-400);
	background-color: transparent;
	border: 2px solid transparent;
}

.button--text-neutral:focus {
	outline: 1px dotted white;
}

.button--text-neutral:focus,
.button--text-neutral:hover {
	color: var(--color-main);
}

.button--small {
	font-size: 0.75rem;
}

.button--medium {
	font-size: 1.5rem;
}

.button--large {
	font-size: 2.5rem;
}
</style>
