<template>
	<div class="tasks">
		<div v-if="(tasks.length > 5 && index < 4) || tasks.length <= 5" v-for="(task, index) in tasks" :class="`task task-duration-${task.duration} ${(task.extended)? 'task-extended':''} task-color-${task.color}`">
			<div class="task-label"></div>
			<div class="task-contents">
				<a href="#" v-bind:title="generateTaskTitle(task)">{{task.text}}</a>
			</div>
		</div>
		<div v-if="tasks.length > 5" v-on:click="showMoreTasks = !showMoreTasks" class="task task-more">
			<div class="task-contents">
				<a href="#" v-bind:class="{'rotate':showMoreTasks}" onclick="return false" class="task-contents">{{tasks.length - 4}} more items</a>
			</div>
		</div>

		<div v-if="tasks.length > 5" v-show="showMoreTasks" class="task-more-container">
			<a href="#" v-for="(task, index) in tasks" v-if="index > 3" v-bind:title="generateTaskTitle(task)">{{task.text}}</a>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'day-tasks',
		props: ['tasks'],
		data() {
			return {
				showMoreTasks: false
			}
		},
		methods: {
			generateTaskTitle (task) {
				//for title in <a>:
				const start = new Date(task.startTime);
				const startDate = start.toLocaleString('en-GB', {day: 'numeric', month: '2-digit', year: '2-digit'});
				const startHour = start.toLocaleString('en-GB', {hour: '2-digit', minute: '2-digit'});
				const end = new Date(task.endTime);
				const endDate = end.toLocaleString('en-GB', {day: 'numeric', month: '2-digit', year: '2-digit'});
				const endHour = end.toLocaleString('en-GB', {hour: '2-digit', minute: '2-digit'});
				///TODO: new line in title
				return `${task.text} Created on: ${startDate} ${startHour}. Complete till: ${endDate} ${endHour}`;
			}
		}
	}
</script>

