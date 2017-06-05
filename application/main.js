import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

import './data/tasksObject.json';

import './calendar.html';
import 'font-awesome/less/font-awesome.less';
import '../application/less/main.less';

import App from './App.vue'
import Calendar from './Calendar.vue'

const month = new Date().getMonth() + 1;
const year = new Date().getFullYear();

const router = new VueRouter({
	routes: [{
		path: '/(calendar)?',
		redirect: `/calendar/${year}/${month}`
	}, {
		path: '/calendar/:year/:month',
		component: Calendar
	}],
	mode: 'history' //use js history API without #
});

document.addEventListener('DOMContentLoaded', () => {
	new Vue({
		el: '#calendarApp',
		router,
		render: calendar => calendar(App)
	});
})