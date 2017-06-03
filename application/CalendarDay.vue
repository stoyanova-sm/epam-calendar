<template>
	<div class="day-wrapper">
		<div class="day">
			<div class="date">{{dayData.date}} {{dayData.month}}</div>
			<div class="tasks">
				<!--
				<div class="task task-duration-3 task-color-green">
					<div class="task-label"></div>
					<div class="task-contents">
						<a href="#">Letter #01-01 «Whatever» from Organization 1 to EPAM</a>
					</div>
				</div>
				-->
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'calendar-day',
		props: ['dayData'],
		created() {
			console.log(this.dayData);
		},
	}

</script>

