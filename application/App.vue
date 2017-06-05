<template>
		<div class="main-content" :class="{'extended-left': extendedLeft, 'extended-right': extendedRight}">
			<nav-menu></nav-menu>
			<router-view :key="$route.path"></router-view>
			<control></control>
		</div>
</template>

<script>
	import Nav from './Nav.vue';
	import Control from './Control.vue';

	export default {
		name: 'app',
		data() {
			return {
				extendedRight: false,
				extendedLeft: false
			}
		},
		created() {
			this.$root.$on('expandNav', () => {
				this.extendedLeft = !this.extendedLeft;
			});
			this.$root.$on('expandControl', () => {
				this.extendedRight = !this.extendedRight;
			});
		},
		components: {
			'nav-menu': Nav,
			'control': Control
		}
	}

</script>
