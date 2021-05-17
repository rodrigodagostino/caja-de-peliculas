<template>
	<TheHeader />
	<TheMain />
	<TheFooter />
</template>

<script>
import TheHeader from './layout/TheHeader'
import TheMain from './layout/TheMain'
import TheFooter from './layout/TheFooter'

export default {
	components: {
		TheHeader,
		TheMain,
		TheFooter,
	},
}
</script>

<style>
/**
 * Variables
 */
:root {
	--font-main: 'Poppins', Avenir, Helvetica, Arial, sans-serif;
	--color-main--light: #a7f3d0;
	--color-main: #34d399;
	--color-main--dark: #059669;
	--white: #f3f3f5;
	--gray-050: #ededf0;
	--gray-100: #e1e1e6;
	--gray-150: #d2d2da;
	--gray-200: #c3c3ce;
	--gray-300: #a4a6b5;
	--gray-400: #86889d;
	--gray-500: #686a84;
	--gray-600: #585a70;
	--gray-650: #515266;
	--gray-700: #494a5c;
	--gray-750: #414253;
	--gray-800: #393a49;
	--gray-850: #31323f;
	--gray-900: #2a2a35;
	--gray-950: #22222b;
	--black: #15151a;
}

/**
 * Reset styles.
 */
html {
	box-sizing: border-box;
	height: 100%;
}

*,
*::before,
*::after {
	/* Inherit box-sizing to make it easier to change the property for components that leverage other behavior; see http://css-tricks.com/inheriting-box-sizing-probably-slightly-better-best-practice/ */
	box-sizing: inherit;
}

/* Reset margins and paddings on most elements */
body,
h1,
h2,
h3,
h4,
h5,
h6,
ul,
ol,
li,
p,
pre,
blockquote,
figure,
hr {
	margin: 0;
	padding: 0;
}

a {
	color: var(--white);
	transition: outline 0.32s ease;
	outline: 1px dotted transparent;
}

a:focus {
	outline: 1px dotted var(--white);
}

/* Reset forms and buttons */
input,
textarea,
select,
button {
	color: inherit;
	font: inherit;
	letter-spacing: inherit;
}

input,
textarea,
button {
	border: 1px solid gray;
}

button {
	border-radius: 0;
	padding: 0.75em 1em;
	background-color: transparent;
}

button * {
	pointer-events: none;
}

/* Easy responsive for media elements */
embed,
iframe,
img,
object,
video {
	display: block;
	max-width: 100%;
}

/* Useful table styles */
table {
	table-layout: fixed;
	width: 100%;
}

/* Hidden */
[hidden] {
	display: none !important;
}

/**
 * Base styles.
 */
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,600;1,400;1,600&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,600;1,400;1,600&display=swap');

body {
	font-family: 'Roboto', Avenir, Helvetica, Arial, sans-serif;
	font-size: 1rem;
	color: var(--white);
	background: var(--black);
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	height: 100%;
}

h1,
h2,
h3,
h4,
h5,
h6 {
	font-family: var(--font-main);
	color: var(--white);
}

.site {
	display: flex;
	flex-direction: column;
	min-height: 100vh;
}

.container {
	max-width: 920px;
	margin: 0 auto;
	padding: 0 20px;
	transition: padding 0.32s ease;
}

@media screen and (min-width: 30em) {
	.container {
		padding: 0 32px;
	}
}

.slide-fade-enter-active {
	animation: slide-fade 0.32s ease;
}

.slide-fade-leave-active {
	animation: slide-fade 0.32s ease reverse;
}

@keyframes slide-fade {
	from {
		opacity: 0;
		transform: translate3d(0, 2rem, 0);
	}
	to {
		opacity: 1;
		transform: translate3d(0, 0, 0);
	}
}

.fade-enter-active {
	animation: fade 0.32s ease;
}

.fade-leave-active {
	animation: fade 0.32s ease reverse;
}

@keyframes fade {
	from {
		opacity: 0;
	}
	to {
		opacity: 1;
	}
}

.screen-reader-text {
	border: 0;
	clip: rect(1px, 1px, 1px, 1px);
	clip-path: inset(50%);
	height: 1px;
	margin: -1px;
	overflow: hidden;
	padding: 0;
	position: absolute;
	width: 1px;
	word-wrap: normal !important;
}

.screen-reader-text:focus {
	background-color: #eee;
	clip: auto !important;
	clip-path: none;
	color: #444;
	display: block;
	font-size: 1em;
	height: auto;
	left: 5px;
	line-height: normal;
	padding: 15px 23px 14px;
	text-decoration: none;
	top: 5px;
	width: auto;
	z-index: 100000; /* Above WP toolbar. */
}
</style>
