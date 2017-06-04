<template>
	<div>
		<div class="main-content" :class="{'extended-left': extendedLeft, 'extended-right': extendedRight}">
			<nav-menu></nav-menu>
			<router-view :key="$route.path"></router-view>

			<section class="control">
				<h1>On control</h1>
				<section class="list">
					<div>
						<div class="list-number">01-01</div>
						<div class="list-type">Letter</div>
						<div class="list-content">Whatever</div>
					</div>
					<div>
						<div  class="list-number">01-01</div>
						<div  class="list-type">Letter</div>
						<div  class="list-content">Whatever</div>
					</div>
					<div>
						<div  class="list-number">01-02</div>
						<div  class="list-type">Request</div>
						<div  class="list-content">Gimme Fuel</div>
					</div>
					<div>
						<div  class="list-number">01-02</div>
						<div  class="list-type">Request</div>
						<div  class="list-content">Gimme Fuel</div>
					</div>
					<div>
						<div  class="list-number">01-02</div>
						<div  class="list-type">Request</div>
						<div  class="list-content">Gimme Fuel</div>
					</div>
				</section>
			</section>
		</div>
	</div>
</template>

<script>
	import Nav from './Nav.vue';

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
			'nav-menu': Nav
		}
	}

</script>
