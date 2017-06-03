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
		props: ['dayData', 'dayIndex'],
		created() {
			this.addMonth();
		},
		methods: {
			addMonth() {
				const element = this.dayData;

				const lastDayInMonth = new Date(element.dateObj.getFullYear(), element.dateObj.getMonth() + 1, 0);
				const firstDayInMonth = new Date(element.dateObj.getFullYear(), element.dateObj.getMonth(), 1);

				if (this.dayIndex < 7 && lastDayInMonth.getTime() === element.dateTime) {
					element.month = element.dateObj.toLocaleString('en-GB', {month: 'short'});
				} else if (this.dayIndex > 27 && firstDayInMonth.getTime() === element.dateTime) {
					element.month = element.dateObj.toLocaleString('en-GB', {month: 'short'});
				}
			}
		}
	}

</script>

