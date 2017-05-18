
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
}

document.addEventListener('DOMContentLoaded', () => {
	setCalendarHeader();
	document.querySelector('.back').addEventListener('click', () => switchDate(true));
	document.querySelector('.forward').addEventListener('click', () => switchDate(false));
});
