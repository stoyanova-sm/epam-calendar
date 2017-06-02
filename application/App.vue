<template>
	<div>
		<div class="main-content">
			<nav class="nav">
				<ul>
					<li><a class="home" href="#">Home</a></li>
					<li><a class="docs" href="#">Documents</a></li>
					<li><a class="calendar" href="#">Calendar</a></li>
					<li><a class="archive" href="#">Archive</a></li>
					<li><a class="nom" href="#">Nomenclature</a></li>
					<li><a class="org" href="#">Organizations</a></li>
				</ul>
				<a class="fa fa-angle-double-right show" href="#"></a>
			</nav>

			<!--:products="theProducts"-->
			<router-view title="Shop our award-winning product line"></router-view>

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
export default {
	name: 'app',
	data() {
		return {
			theProducts: []
		};
	},
	created: function() {
		fetch('/build/data/tasksObject.json')
			.then(response => {
				if(response.status === 200) {
					return response.json();
				}
			})
			.then(tasksList => this.updateCalendarMap(tasksList))
		fetch('https://hplussport.com/api/products')
//					.done(data => {this.theProducts = data;});
	}
}
</script>
