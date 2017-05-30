
function controlAction () {
	const control = document.querySelector('.control');
	control.addEventListener('click', () => {
		control.classList.toggle('extended');
	})
}

function navAction() {
	const nav = document.querySelector('.nav');
	const show = document.querySelector('.show');
	const calendar = document.querySelector('main');
	show.addEventListener('click', () => {
		nav.classList.toggle('extended');
		calendar.classList.toggle('extended');
	})
}

export {controlAction, navAction};