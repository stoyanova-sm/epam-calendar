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
export default {
	name: 'app'
}
</script>
