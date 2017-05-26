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

		this.calendarMap = [];

		for(let i = 0; i < 35; i++) {
			const dateObj = new Date(firstDateToDisplay.getTime());
			const date = dateObj.getDate();
			const dateTime = dateObj.getTime();// in json we get time in milliseconds for faster comparison
			const tasks = [];

			this.calendarMap.push({dateObj, dateTime, date, tasks}); //TODO:dateObj-?
			firstDateToDisplay.setDate(date + 1);
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

		for(let i = 0; i < 35; i++) {
			const element = this.calendarMap[i];
			const nextElement = this.calendarMap[i+1]
			this.calcTaskDurationForHtml(element);
			this.checkMonth(element, nextElement, i);

			const template = `
				<div class="day-wrapper">
					<div class="day">
						<div class="date">${element.date} ${(element.month) ? element.month :''}</div>
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

	checkMonth(element, nextElement, i){ // adds month to date with month change
		if (element.dateObj.getDate() > nextElement.dateObj.getDate()) {
			if (i < 7) {
				element.month = element.dateObj.toLocaleString('en-GB', {month: 'long'});
			} else if (i > 27 && i < 34) {
				nextElement.month = nextElement.dateObj.toLocaleString('en-GB', {month: 'short'});
			}
		}
	}


	getTasksHtml(element) {

		const htmlOutput = [];
		const tasksLength = element.tasks.length;
		const task = element.tasks;

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
			//for title in <a>:
			const start = new Date(task[i].startTime);
			const startDate = start.toLocaleString('en-GB', {day: 'numeric', month: '2-digit', year: '2-digit'});
			const startHour = start.toLocaleString('en-GB', {hour: '2-digit', minute: '2-digit'});
			const end = new Date(task[i].endTime);
			const endDate = end.toLocaleString('en-GB', {day: 'numeric', month: '2-digit', year: '2-digit'});
			const endHour = end.toLocaleString('en-GB', {hour: '2-digit', minute: '2-digit'});

			htmlOutput.push(
				`<div class="task task-duration-${task[i].duration} ${(task[i].extended)? 'task-extended':''} task-color-${task[i].color}">
					<div class="task-label"></div>
					<div class="task-contents">
						<a href="#" title="${task[i].text} &#013 Created on: ${startDate} ${startHour}. Complete till: ${endDate} ${endHour}">${task[i].text}</a>
					</div> 
				</div>`
			);
		}

		return htmlOutput.join('');
	}
};

