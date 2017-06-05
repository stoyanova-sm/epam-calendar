
function controlAction () {
	const control = document.querySelector('.control');
	const main = document.querySelector('.main-content');
	control.addEventListener('click', () => {
		control.classList.toggle('expanded');
		main.classList.toggle('extended-right');

	})
}

function navAction() {
	const nav = document.querySelector('.nav');
	const show = document.querySelector('.show');
	const main = document.querySelector('.main-content');
	show.addEventListener('click', (event) => {
		event.preventDefault();
		nav.classList.toggle('extended');
		main.classList.toggle('extended-left');
	})
}

export {controlAction, navAction};