import '../data/tasksObject.json';

export default class Calendar {
	constructor() {
		this.displayDate = new Date();
		this.calendarMap = [];
	};

	initialize() { //draw the calendar and add events to switch months
		this.setEvents();
		this.draw();
	};

	setEvents() { //add events to switch months by clicking arrow buttons
		///TODO: change <a> to <button>
		document.querySelector('.back').addEventListener('click', () => this.switchMonth(true));
		document.querySelector('.forward').addEventListener('click', () => this.switchMonth(false));
	};

	switchMonth(direction) {
		if(direction) {
			this.displayDate.setMonth(this.displayDate.getMonth() - 1);
		} else {
			this.displayDate.setMonth(this.displayDate.getMonth() + 1);
		}

		this.draw();
	};

	draw() {
		this.setHeader();
		this.generateDates();
		this.renderTasks();
	};

	setHeader() {
		const header = document.querySelector('.calendar-header');
		const options = {
			year: 'numeric',
			month: 'long'
		}
		const monthAndYear = this.displayDate.toLocaleString('en-GB', options);
		header.innerText = monthAndYear;
	};

	generateDates() {
		const firstDateToDisplay = new Date(this.displayDate.getTime());
		let firstWeekdayOfMonth;
		const monthLength = new Date(firstDateToDisplay.getFullYear(), firstDateToDisplay.getMonth()+1, 0).getDate();

		firstDateToDisplay.setHours(0,0,0,0);// in json we get time in milliseconds for faster comparison
		firstDateToDisplay.setDate(1); // If Monday is the first day of the Month
		firstWeekdayOfMonth = firstDateToDisplay.getDay();

		if (firstWeekdayOfMonth  === 6 && monthLength === 31) { // If Saturday is the first date
			firstDateToDisplay.setDate(3);
		} else if (firstWeekdayOfMonth  === 0 && monthLength >= 30) { // If Sunday is the first date
			firstDateToDisplay.setDate(2);
		} else if (firstWeekdayOfMonth !== 1) { // If not Monday
			this.setLastMondayOfPreviousMonth(firstDateToDisplay);
		}

		for(let i = 0; i < 35; i++) {
			const dateObj = new Date(firstDateToDisplay.getTime());
			const date = dateObj.getDate();
			const dateTime = dateObj.getTime();// in json we get time in milliseconds for faster comparison
			const tasks = [];

			this.calendarMap.push({dateObj, dateTime, date, tasks}); //TODO:dateObj-?
			firstDateToDisplay.setDate(date + 1);
			console.log(this.calendarMap);
		}
	};

	setLastMondayOfPreviousMonth(date) { //returns Date() with the date of last monday of previous month
		date.setDate(0); // last day of previous month
		const lastMondayOfPreviousMonth = date.getDate() - (date.getDay() - 1);
		date.setDate(lastMondayOfPreviousMonth);
	};

	renderTasks() { ///TODO: add catch errors,  json()
		fetch('/build/data/tasksObject.json')
			.then(response => {
				if(response.status === 200) {
					return response.json();
				}
			})
			.then(tasksList => this.updateCalendarMap(tasksList))
			.then(() => this.render());
	};

	updateCalendarMap(tasksByDates) {
		for(const tasksByDate of tasksByDates) {
			// check if time in each day in calendar equals to time
			//in every object, we received from server and returns this object from calendarMap
			const calendarDate = this.calendarMap.find(calendarMapDay => calendarMapDay.dateTime === tasksByDate.dateTime);
			if (calendarDate) {
				calendarDate.tasks = tasksByDate.tasks;
			}
		}
	};

	render() {
		const calendarHtml = [];
		const calendar = document.querySelector('.net');

		let today = new Date(); //for blue border
		today.setHours(0, 0, 0, 0);
		today = today.getTime();

		for(const element of this.calendarMap) {
			this.calcTaskDurationForHtml(element);

			const template = `
				<div class="day-wrapper">
					<div class="day">
						<div class="date">${element.date}</div>
						<div class="tasks">${this.getTasksHtml(element)}</div>
						${(today === element.dateTime)?'<div class="day-current-border"></div>':''}
					</div>
				</div>`;

			calendarHtml.push(template);
		}

		calendar.innerHTML = calendarHtml.join(''); //combine the array of templates into a string
	};

	calcTaskDurationForHtml(element) {
		if (element.tasks.length !== 0) {
			let taskStartDay = element.dateObj.getDay();//the day of the week the task starts
			if (taskStartDay === 0) taskStartDay = 7; //if sunday

			for (let i = element.tasks.length-1; i >= 0; i--) { // needed for proper task ordering (fist in first out)
				const taskSize = element.tasks[i].duration + taskStartDay;// task start day + task duration
				if (taskSize > 8) {
					const restOfTaskDuration = taskSize - 8;//the rest of the task days, that we transfer to the next week
					element.tasks[i].duration = element.tasks[i].duration - restOfTaskDuration; //task duration on current week

					const restOfTaskObj = { // object with the rest part of the task
						color: element.tasks[i].color,
						duration: restOfTaskDuration,
						text: element.tasks[i].text,
						extended: true
					};
					const elementIndex = this.calendarMap.indexOf(element);
					this.calendarMap[elementIndex + element.tasks[i].duration].tasks.unshift(restOfTaskObj)
				}
			}
		}
	}

	getTasksHtml(element) {

		const htmlOutput = [];
		const tasksLength = element.tasks.length;
		const task = element.tasks;
		const startDate = element.dateObj.toLocaleString('en-GB', {day: 'numeric', month: '2-digit', year: '2-digit'});

		if (!tasksLength) { //if no task do nothing
			return '';
		}

		for (let i = 0; i < tasksLength; i++) { //go through the tasks in array
			if(i === 4 && tasksLength > 5) {
				htmlOutput.push(
					`<div class="task task-duration-1 task-more">
						<div class="task-contents">
							<a href="#">${tasksLength - 4} more items</a> 
						</div>
					</div>`
				);
			}
		// <a href="#" title="Letter #01-01 «Whatever» from Organization 1 to EPAM
			// &#013;Created on: 7/08/15 12:00. Complete till: 12/08/15 14:00">Letter #01-01 «Whatever» from Organization 1 to EPAM</a>
			// console.log(this.calendarMap);
			const date = new Date(element.dateObj.getTime());
			date.setDate(date.getDate() + task[i].duration);
			let endDate = date.toLocaleString('en-GB', {day: 'numeric', month: '2-digit', year: '2-digit'});

			htmlOutput.push(
				`<div class="task task-duration-${task[i].duration} ${(task[i].extended)? 'task-extended':''} task-color-${task[i].color}">
					<div class="task-label"></div>
					<div class="task-contents">
						<a href="#" title="${task[i].text} &#013 Created on: ${startDate} ${task[i].startHour}. Complete till: ${endDate} ${task[i].endHour}">${task[i].text}</a>
					</div> 
				</div>`
			);
		}

		return htmlOutput.join('');
	}
};

