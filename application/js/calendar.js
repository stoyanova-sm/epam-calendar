let currentDate = new Date();

function setCalendarHeader() {
	const options = {year: 'numeric', month: 'long'};
	/// TODO: add a determine locale function
	const monthYear = currentDate.toLocaleString('en-EN', options);
	const header = document.querySelector('.calendar-header');
	header.innerText = monthYear;
}

function switchDate(direction) {
	debugger;
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

function generateDates() {
	let firstDate = new Date(currentDate.getTime());
	firstDate.setDate(1);
	const firstWeekdayOfMonth = firstDate.getDay();
	const monthLength = new Date (firstDate.getFullYear(), firstDate.getMonth()+1, 0).getDate();



	if (firstWeekdayOfMonth  === 6 && monthLength === 31) {
		firstDate.setDate(3);
	} else if(firstWeekdayOfMonth !== 1) {
		firstDate = getLastMondayOfPreviousMonth(firstDate);
	} else if (firstWeekdayOfMonth === 0) {
		firstDate.setDate(2);
	}

	draw(firstDate);
}
///TODO: think about refactor
function draw(firstDay){ // get Date() with the first date we need to draw in calendar
	const dateElements = document.querySelectorAll('.date');
	for(let i = 0; i < dateElements.length; i++) {
		dateElements[i].innerText = firstDay.getDate();
		firstDay.setDate(firstDay.getDate() + 1)
	}
}

document.addEventListener('DOMContentLoaded', () => {
	setCalendarHeader();
	generateDates();
	///TODO: what about page reload
	document.querySelector('.back').addEventListener('click', () => switchDate(true));
	document.querySelector('.forward').addEventListener('click', () => switchDate(false));
});
