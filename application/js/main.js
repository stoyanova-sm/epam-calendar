import '../calendar.html';
import 'font-awesome/less/font-awesome.less';
import '../less/main.less';

import Calendar from './calendar.js';

document.addEventListener('DOMContentLoaded', () => {
	const calendar = new Calendar();
	calendar.initialize();
});