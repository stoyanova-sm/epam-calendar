<template>
	<main>
		<header>
			<router-link class="fa fa-arrow-circle-left back" :to="`/calendar/${switchMonth(false)}`"></router-link>
			<router-link class="fa fa-arrow-circle-right forward" :to="`/calendar/${switchMonth(true)}`"></router-link>

			<h1 class="calendar-header">{{header}}</h1>
		</header>

		<section class="main-calendar">
			<div class="weekdays">
				<div>Monday</div>
				<div>Tuesday</div>
				<div>Wednesday</div>
				<div>Thursday</div>
				<div>Friday</div>
				<div>Saturday</div>
				<div>Sunday</div>
			</div>

			<div class="net">
				<calendar-day v-for="(day, index) in calendarMap" :dayData="day" :dayIndex="index" :today="getToday" :key="day.dateTime"></calendar-day>
			</div>
		</section>
	</main>
</template>

<script>
	import CalendarDay from './CalendarDay.vue';

	export default {
		name: 'calendar',
		data() {
			return {
				displayDate: new Date(this.$route.params.year, this.$route.params.month-1),
				tasksObject: [],
				calendarMap: []
			}
		},
		created () {
			fetch('/build/data/tasksObject.json')
				.then(response => {
					if(response.status === 200) {
						return response.json();
					}
				})
				.then(tasksList => this.tasksObject = tasksList)
				.then(() => this.generateDates())
				.then(() => this.updateCalendarMap())
				.then(() => this.calcTaskDurationForHtml())
				.catch(error => console.log(error));
		},
		computed: {
			header() {
				const monthYear = this.displayDate.toLocaleString('en-GB', {year: 'numeric', month: 'long'});
				return monthYear;
			},
			getToday() {
				let today = new Date(); //for blue border
				today.setHours(0, 0, 0, 0);
				today = today.getTime();
				return today
			}
		},
		methods: {
			switchMonth(direction) {
				const newDisplayDate = new Date(this.displayDate.getTime());

				if(direction) {
					newDisplayDate.setMonth(newDisplayDate.getMonth() + 1);
				} else {
					newDisplayDate.setMonth(newDisplayDate.getMonth() - 1);
				}

				return `${newDisplayDate.getFullYear()}/${newDisplayDate.getMonth() + 1}`;
			},
			generateDates() {
				const firstDateToDisplay = new Date(this.displayDate.getTime());
				const monthLength = new Date(firstDateToDisplay.getFullYear(), firstDateToDisplay.getMonth()+1, 0).getDate();
				const firstWeekdayOfMonth = firstDateToDisplay.getDay();

				if (firstWeekdayOfMonth  === 6 && monthLength === 31) { // If Saturday is the first date
					firstDateToDisplay.setDate(3);
				} else if (firstWeekdayOfMonth  === 0 && monthLength >= 30) { // If Sunday is the first date
					firstDateToDisplay.setDate(2);
				} else if (firstWeekdayOfMonth !== 1) { // If not Monday
					this.setLastMondayOfPreviousMonth(firstDateToDisplay);
				}

				this.calendarMap = [];

				for (let i = 0; i < 35; i++) { //there are 35 cells in calendar table
					const dateObj = new Date(firstDateToDisplay.getTime());
					const date = dateObj.getDate();
					const dateTime = dateObj.getTime();// in json we get time in milliseconds for faster comparison
					const tasks = [];

					this.calendarMap.push({dateObj, dateTime, date, tasks});

					firstDateToDisplay.setDate(date + 1);
				}
			},
			updateCalendarMap() {
				for (const tasksByDate of this.tasksObject) {
					// check if time in each day in calendar equals to time
					//in every object, we received from server and returns this object from calendarMap
					const calendarDate = this.calendarMap.find(calendarMapDay => calendarMapDay.dateTime === tasksByDate.dateTime);
					if (calendarDate) {
						calendarDate.tasks = tasksByDate.tasks;
					}
				}
			},
			setLastMondayOfPreviousMonth(date) { //returns Date() with the date of last monday of previous month
				date.setDate(0); // last day of previous month
				const lastMondayOfPreviousMonth = date.getDate() - (date.getDay() - 1);
				date.setDate(lastMondayOfPreviousMonth);
			},
			calcTaskDurationForHtml() {
				for (const element of this.calendarMap) {
					if (element.tasks.length !== 0) {
						let taskStartDay = element.dateObj.getDay();//the day of the week the task starts
						if (taskStartDay === 0) taskStartDay = 7; //if sunday

						for (let i = element.tasks.length - 1; i >= 0; i--) { // needed for proper task ordering (fist in first out)
							const taskSize = element.tasks[i].duration + taskStartDay;// task start day + task duration
							if (taskSize > 8) {
								const restOfTaskDuration = taskSize - 8;//the rest of the task days, that we transfer to the next week
								element.tasks[i].duration = element.tasks[i].duration - restOfTaskDuration; //task duration on current week

								const restOfTaskObj = { // object with the rest part of the task
									color: element.tasks[i].color,
									duration: restOfTaskDuration,
									text: element.tasks[i].text,
									startTime: element.tasks[i].startTime,
									endTime: element.tasks[i].endTime,
									extended: true
								};
								const elementIndex = this.calendarMap.indexOf(element);
								this.calendarMap[elementIndex + element.tasks[i].duration].tasks.unshift(restOfTaskObj)
							}
						}
					}
				}
			}
		},
		components: {
			'calendar-day': CalendarDay
		}
	}
</script>
