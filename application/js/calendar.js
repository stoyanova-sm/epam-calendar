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
		this.requestTasks();
	};

	setHeader() {
		const header = document.querySelector('.calendar-header');
		const options = {
			year: 'numeric',
			month: 'long'
		}
		const monthAndYear = this.displayDate.toLocaleString('en-EN', options);
		header.innerText = monthAndYear;
	};

	generateDates() {
		const firstDateToDisplay = new Date(this.displayDate.getTime());
		let firstWeekdayOfMonth;
		const monthLength = new Date(firstDateToDisplay.getFullYear(), firstDateToDisplay.getMonth()+1, 0).getDate();

		firstDateToDisplay.setHours(0,0,0,0);///TODO: think about this
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
			const dateTime = dateObj.getTime();///TODO: think about this

			this.calendarMap.push({dateObj, dateTime, date});
			firstDateToDisplay.setDate(date + 1);
		}
	};

	setLastMondayOfPreviousMonth(date) { //returns Date() with the date of last monday of previous month
		date.setDate(0); // last day of previous month
		const lastMondayOfPreviousMonth = date.getDate() - (date.getDay() - 1);
		date.setDate(lastMondayOfPreviousMonth);
	};

	requestTasks() { ///TODO: add catch errors,  json()
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

		for(const element of this.calendarMap) {
			const template = `
				<div class="day-wrapper">
					<div class="day">
						<div class="date">${element.date}</div>
						<div class="tasks">${this.getTasksHtml(element)}</div>
					</div>
				</div>`;

			calendarHtml.push(template);
		}

		calendar.innerHTML = calendarHtml.join(''); //combine the array of templates into a string
	};

	getTasksHtml(element) {
		const htmlOutput = [];

		if (!element.tasks) { //if no task do nothing
			return '';
		}

		const tasksLength = element.tasks.length;
		const task = element.tasks;
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

			htmlOutput.push(
				`<div class="task task-duration-${task[i].duration} task-color-${task[i].color}">
					<div class="task-label"></div>
					<div class="task-contents">
						<a href="#">${task[i].text}</a>
					</div>
				</div>`
			);
		}
		this.calcDurationHtml();
		return htmlOutput.join('');
	}

	calcDurationHtml() {
		console.log(this.calendarMap);
		for(let i = 0; i < 35; i++) {
			let a = this.calendarMap[1].dateObj.getDay();
			console.log(a);
			for (const tasks of this.calendarMap) {

			}
		}

	}
};

