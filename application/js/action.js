
function controlAction () {
	const control = document.querySelector('.control');
	control.addEventListener('click', () => {
		control.classList.toggle('extended');
	})
}

function navAction() {
	const nav = document.querySelector('.nav');
	const show = document.querySelector('.show');
	const hide = document.querySelector('.hide');
	show.addEventListener('click', () => {
		nav.classList.add('extended');
		show.style.display = 'none';
		hide.style.display = 'block';
	});
	hide.addEventListener('click', () => {
		nav.classList.remove('extended');
		hide.style.display = 'none';
		show.style.display = 'block';
	})
}

export {controlAction, navAction};