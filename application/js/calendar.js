import '../data/tasksObject.json';

export default class Calendar {
	constructor() {
		this.displayDate = new Date();
	};

	initialize() {
		this.setEvents();
		this.draw();
	};

	setEvents() {
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
		const monthAndYear = this.displayDate.toLocaleString('en-EN',{
			year: 'numeric',
			month: 'long'
		});

		header.innerText = monthAndYear;
	};

	generateDates() {
		let firstDateToDisplay = new Date(this.displayDate.getTime());
		let firstWeekdayOfMonth;
		const monthLength = new Date(firstDateToDisplay.getFullYear(), firstDateToDisplay.getMonth()+1, 0).getDate();

		firstDateToDisplay.setHours(0,0,0,0);
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
			const dateTime = dateObj.getTime();

			this.calendarMap.push({dateObj, dateTime, date});
			firstDateToDisplay.setDate(date + 1);
		}
	};

	setLastMondayOfPreviousMonth(date) { //returns Date() with the date of last monday of previous month
		date.setDate(0); // last day of previous month
		const lastMondayOfPreviousMonth = date.getDate() - (date.getDay() - 1);
		date.setDate(lastMondayOfPreviousMonth);
	};

	requestTasks() {
		fetch('/build/data/tasksObject.json')
			.then(response => {
				if(response.status === 200) {
					return response.json();
				}
			})
			.then(tasks => this.updateCalendarMap(tasks))
			.then(() => this.render());
	};

	updateCalendarMap(tasksByDates) {
		for(const tasksByDate of tasksByDates) {
			const calendarDate = this.calendarMap.find(calendarMapDay => calendarMapDay.dateTime === tasksByDate.dateTime);

			calendarDate.tasks = tasksByDate.tasks;
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

		calendar.innerHTML = calendarHtml.join('');
	};

	getTasksHtml(element) {
		const template = [];

		if (!element.tasks) {
			return '';
		}

		for (let task of element.tasks) {
			template.push(
				`<div class="task task-duration-${task.duration} task-color-${task.color}">
					<div class="task-label"></div>
					<div class="task-contents">
						<a href="#">${task.text}</a>
					</div>
				</div>`
			);
		}

		return template.join('');
	}
};

/*
let currentDate = new Date();

function setCalendarHeader() {
	const options = {year: 'numeric', month: 'long'};
	/// TODO: add a determine locale function
	const monthYear = currentDate.toLocaleString('en-EN', options);
	const header = document.querySelector('.calendar-header');
	header.innerText = monthYear;
}

function switchDate(direction) {
	if(direction) {
		currentDate.setMonth(currentDate.getMonth() - 1);
	} else {
		currentDate.setMonth(currentDate.getMonth() + 1);
	}

	setCalendarHeader();
	generateDates();
}

function getLastMondayOfPreviousMonth(date) { //returns Date() with the date of last monday of previous month
	date.setDate(0); // last day of previous month
 	const lastMondayOfPreviousMonth = date.getDate() - (date.getDay() - 1);
	date.setDate(lastMondayOfPreviousMonth);
	return date;
}

function getArrayOfDates(firstDate, length) {
	const arrayOfDates = [];
	for(let i = 0; i < length; i++) {
		arrayOfDates.push(firstDate++)
	}
	if (length < 28) {
		const options = {month: 'short'};
		const date = new Date(currentDate.getTime());
		if (arrayOfDates[0] === 1) {
			date.setMonth(date.getMonth()+1);
			const localMonth = date.toLocaleString('en-EN', options);
			arrayOfDates[0] = `${localMonth} 1`;
		} else {
			date.setMonth(date.getMonth()-1);
			const localMonth = date.toLocaleString('en-EN', options);
			arrayOfDates[length-1] = `${localMonth} ${arrayOfDates[length-1]}`;
		}
	}
	return arrayOfDates;
}

function generateDates() {
	const firstDay = new Date(currentDate.getTime());
	firstDay.setDate(1);
	const firstWeekdayOfMonth = firstDay.getDay();
	const monthLength = new Date (firstDay.getFullYear(), firstDay.getMonth()+1, 0).getDate();
	console.log(2, monthLength);

	let prevMonth = [];
	let thisMonth = [];
	let nextMonth = [];

	if (firstWeekdayOfMonth  === 6 && monthLength === 31) { // If Saturday and 31 days
		thisMonth = getArrayOfDates(3, monthLength - 2);
	} else	if (firstWeekdayOfMonth === 0) {
		thisMonth = getArrayOfDates(2, monthLength - 1);
	} else {
		thisMonth = getArrayOfDates(1, monthLength);
		if(firstWeekdayOfMonth !== 1) {
			const prevFirstDate = getLastMondayOfPreviousMonth(firstDay);
			prevMonth = getArrayOfDates(prevFirstDate.getDate(), firstWeekdayOfMonth-1 );
		}
	}

	nextMonth  = getArrayOfDates(1, 35 - prevMonth.length - thisMonth.length) //because there are 35 cells

	const dates = prevMonth.concat(thisMonth, nextMonth);

	insertDates(dates);
}

function insertDates(array) {
	const dateElements = document.querySelectorAll('.date');

	for (let i = 0; i < dateElements.length; i++) {
		const value = array[i];
		dateElements[i].innerText = value;
	}
}

document.addEventListener('DOMContentLoaded', () => {
	setCalendarHeader();
	generateDates();
	///TODO: what about page reload
	document.querySelector('.back').addEventListener('click', () => switchDate(true));
	document.querySelector('.forward').addEventListener('click', () => switchDate(false));
});
*/
