
function controlAction () {
	const control = document.querySelector('.control');
	control.addEventListener('click', () =>{
		control.classList.toggle('extended')
	})
}

export {controlAction}
