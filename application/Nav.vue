<template>
	<nav :class="{'nav-extended': showNav}" class="nav">
		<ul>
			<li><a class="home" href="#">Home</a></li>
			<li><a class="docs" href="#">Documents</a></li>
			<li><a class="calendar" href="#">Calendar</a></li>
			<li><a class="archive" href="#">Archive</a></li>
			<li><a class="nom" href="#">Nomenclature</a></li>
			<li><a class="org" href="#">Organizations</a></li>
		</ul>
		<a href="#" onclick="return false" v-on:click="expandNav" class="fa fa-angle-double-right show" ></a>
	</nav>
</template>

<script>
	export default {
		name: 'nav-menu',
		data() {
			return {
				showNav: false
			}
		},
		methods: {
			expandNav() {
				this.showNav = !this.showNav;
				this.$root.$emit('expandNav');
			}
		},
	}
</script>

