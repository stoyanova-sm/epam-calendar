<template>
	<div class="day-wrapper">
		<div class="day">
			<div class="date">{{dayData.date}} {{dayData.month}}</div>
			<day-tasks v-if="dayData.tasks.length > 0" :tasks="dayData.tasks"></day-tasks>
			<div v-if="today === dayData.dateTime" class="day-current-border"></div>
		</div>
	</div>
</template>

<script>
	import DayTasks from './DayTasks.vue';

	export default {
		name: 'calendar-day',
		props: ['dayData', 'dayIndex', 'today'],
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
			},
		},
		components: {
			'day-tasks': DayTasks
		}
	}
</script>

