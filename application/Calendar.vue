<template>
	<main>
		<header>
			<router-link class="fa fa-arrow-circle-left back" :to="`/calendar/${switchMonth(false)}`"></router-link>
			<router-link class="fa fa-arrow-circle-right forward" :to="`/calendar/${switchMonth(true)}`"></router-link>

			<h1 class="calendar-header">{{header}}</h1>
		</header>

		<section class="main-calendar">
			<section class="weekdays">
				<div>Monday</div>
				<div>Tuesday</div>
				<div>Wednesday</div>
				<div>Thursday</div>
				<div>Friday</div>
				<div>Saturday</div>
				<div>Sunday</div>
			</section>
			<section class="net">
				<div class="day-wrapper">
					<div class="day">
						<div class="date">3</div>
						<div class="tasks">
							<div class="task task-duration-3 task-color-green">
								<div class="task-label"></div>
								<div class="task-contents">
									<a href="#">Letter #01-01 «Whatever» from Organization 1 to EPAM</a>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="day-wrapper">
					<div class="day">
						<div class="date">4</div>
						<div class="tasks">
							<div class="task">
								<div class="task-label"></div>
								<div class="task-contents"></div>
							</div>
						</div>
					</div>
				</div>
				<div class="day-wrapper">
					<div class="day">
						<div class="date">5</div>
						<div class="tasks">
							<div class="task">
								<div class="task-label"></div>
								<div class="task-contents"></div>
							</div>
						</div>
					</div>
				</div>
				<div class="day-wrapper">
					<div class="day">
						<div class="date">6</div>
						<div class="tasks">
							<div class="task">
								<div class="task-label"></div>
								<div class="task-contents"></div>
							</div>
						</div>
					</div>
				</div>
				<div class="day-wrapper">
					<div class="day">
						<div class="date">7</div>
						<div class="tasks">
							<div class="task task-duration-3 task-color-yellow">
								<div class="task-label"></div>
								<div class="task-contents">
									<a href="#">Letter #01-01 «Whatever» from Organization 1 to EPAM</a>
								</div>
							</div>
							<div class="task task-duration-3 task-color-yellow">
								<div class="task-label"></div>
								<div class="task-contents">
									<a href="#" title="Letter #01-01 «Whatever» from Organization 1 to EPAM&#013;Created on: 7/08/15 12:00. Complete till: 12/08/15 14:00">Letter #01-01 «Whatever» from Organization 1 to EPAM</a>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="day-wrapper">
					<div class="day">
						<div class="date">8</div>
						<div class="tasks">
							<div class="task">
								<div class="task-label"></div>
								<div class="task-contents"></div>
							</div>
						</div>
					</div>
				</div>
				<div class="day-wrapper">
					<div class="day">
						<div class="date">9</div>
						<div class="tasks">
							<div class="task ">
								<div class="task-label"></div>
								<div class="task-contents"></div>
							</div>
						</div>
					</div>
				</div>
				<div class="day-wrapper">
					<div class="day">
						<div class="date">10</div>
						<div class="tasks">
							<div class="task task-duration-2 task-extended task-color-yellow">
								<div class="task-label"></div>
								<div class="task-contents">
									<a href="#">
										Letter #01-01 «Whatever» from Organization 1 to EPAM
									</a>
								</div>
							</div>
							<div class="task task-duration-3 task-color-red">
								<div class="task-label"></div>
								<div class="task-contents">
									<a href="#">Letter #01-01 «Whatever» from Organization 1 to EPAM</a>
								</div>
							</div>
							<div class="task task-duration-1 task-color-violet">
								<div class="task-label"></div>
								<div class="task-contents">
									<a href="#">Letter #01-01 «Whatever» from Organization 1 to EPAM</a>
								</div>
							</div>
							<div class="task task-duration-2 task-color-teal">
								<div class="task-label"></div>
								<div class="task-contents">
									<a href="#">Letter #01-01 «Whatever» from Organization 1 to EPAM</a>
								</div>
							</div>
							<!--<div class="task task-duration-1 task-more">-->
							<!--<div class="task-contents">-->
							<!--<a href="#">2 more items</a>-->
							<!--</div>-->
							<!--</div>-->
						</div>
						<div class="day-current-border"></div>
					</div>
				</div>
				<div class="day-wrapper">
					<div class="day">
						<div class="date">11</div>
						<div class="tasks"></div>
					</div>
				</div>
				<div class="day-wrapper">
					<div class="day">
						<div class="date">12</div>
						<div class="tasks"></div>
					</div>
				</div>
				<div class="day-wrapper">
					<div class="day">
						<div class="date">13</div>
						<div class="tasks"></div>
					</div>
				</div>
				<div class="day-wrapper">
					<div class="day">
						<div class="date">14</div>
						<div class="tasks"></div>
					</div>
				</div>
				<div class="day-wrapper">
					<div class="day">
						<div class="date">15</div>
						<div class="tasks"></div>
					</div>
				</div>
				<div class="day-wrapper">
					<div class="day">
						<div class="date">16</div>
						<div class="tasks"></div>
					</div>
				</div>
				<div class="day-wrapper">
					<div class="day">
						<div class="date">17</div>
						<div class="tasks"></div>
					</div>
				</div>
				<div class="day-wrapper">
					<div class="day">
						<div class="date">18</div>
						<div class="tasks"></div>
					</div>
				</div>
				<div class="day-wrapper">
					<div class="day">
						<div class="date">19</div>
						<div class="tasks"></div>
					</div>
				</div>
				<div class="day-wrapper">
					<div class="day">
						<div class="date">20</div>
						<div class="tasks"></div>
					</div>
				</div>
				<div class="day-wrapper">
					<div class="day">
						<div class="date">21</div>
						<div class="tasks"></div>
					</div>
				</div>
				<div class="day-wrapper">
					<div class="day">
						<div class="date">22</div>
						<div class="tasks"></div>
					</div>
				</div>
				<div class="day-wrapper">
					<div class="day">
						<div class="date">23</div>
						<div class="tasks"></div>
					</div>
				</div>
				<div class="day-wrapper">
					<div class="day">
						<div class="date">24</div>
						<div class="tasks"></div>
					</div>
				</div>
				<div class="day-wrapper">
					<div class="day">
						<div class="date">25</div>
						<div class="tasks"></div>
					</div>
				</div>
				<div class="day-wrapper">
					<div class="day">
						<div class="date">26</div>
						<div class="tasks"></div>
					</div>
				</div>
				<div class="day-wrapper">
					<div class="day">
						<div class="date">27</div>
						<div class="tasks"></div>
					</div>
				</div>
				<div class="day-wrapper">
					<div class="day">
						<div class="date">28</div>
						<div class="tasks"></div>
					</div>
				</div>
				<div class="day-wrapper">
					<div class="day">
						<div class="date">29</div>
						<div class="tasks"></div>
					</div>
				</div>
				<div class="day-wrapper">
					<div class="day">
						<div class="date">30</div>
						<div class="tasks"> </div>
					</div>
				</div>
				<div class="day-wrapper">
					<div class="day">
						<div class="date">31</div>
						<div class="tasks"></div>
					</div>
				</div>
				<div class="day-wrapper">
					<div class="day">
						<div class="date">Sept 1</div>
						<div class="tasks"></div>
					</div>
				</div>
				<div class="day-wrapper">
					<div class="day">
						<div class="date">2</div>
						<div class="tasks"></div>
					</div>
				</div>
				<div class="day-wrapper">
					<div class="day">
						<div class="date">3</div>
						<div class="tasks"></div>
					</div>
				</div>
				<div class="day-wrapper">
					<div class="day">
						<div class="date">4</div>
						<div class="tasks"></div>
					</div>
				</div>
				<div class="day-wrapper">
					<div class="day">
						<div class="date">5</div>
						<div class="tasks"></div>
					</div>
				</div>
				<div class="day-wrapper">
					<div class="day">
						<div class="date">6</div>
						<div class="tasks"></div>
					</div>
				</div>
			</section>

		</section>
	</main>
</template>

<script>
	//import ProductListItem from './ProductListItem.vue';

	export default {
		name: 'calendar',
		props: [],
		data() {
			return {
				displayDate: new Date(this.$route.params.year, this.$route.params.month-1)
			}
		},
		created: function() {
			//console.log(this.$route.params.month);
		},
		computed: {
			header() {
				const monthYear = this.displayDate.toLocaleString('en-GB', {year: 'numeric', month: 'long'});
				return monthYear;
			}
		},
		methods: {
			switchMonth(direction) {
				const newDisplayDate = new Date(this.displayDate.getTime());

				if(direction) {
					newDisplayDate.setMonth(newDisplayDate.getMonth() + 1);
				} else {
					newDisplayDate.setMonth(newDisplayDate.getMonth() - 1);
				}

				return `${newDisplayDate.getFullYear()}/${newDisplayDate.getMonth() + 1}`;
			}
		}
		/*
		 components: {
		 'product-list-item': ProductListItem
		 }*/
	};
</script>
