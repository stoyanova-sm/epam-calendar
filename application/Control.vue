<template>
    <section v-on:click="expandControl" :class="{'control-extended': showControl}" class="control">
        <h1>On control</h1>
        <div class="list">
            <div>
                <div class="list-number">01-01</div>
                <div class="list-type">Letter</div>
                <div class="list-content">Whatever</div>
            </div>
            <div>
                <div  class="list-number">01-01</div>
                <div  class="list-type">Letter</div>
                <div  class="list-content">Whatever</div>
            </div>
            <div>
                <div  class="list-number">01-02</div>
                <div  class="list-type">Request</div>
                <div  class="list-content">Gimme Fuel</div>
            </div>
            <div>
                <div  class="list-number">01-02</div>
                <div  class="list-type">Request</div>
                <div  class="list-content">Gimme Fuel</div>
            </div>
            <div>
                <div  class="list-number">01-02</div>
                <div  class="list-type">Request</div>
                <div  class="list-content">Gimme Fuel</div>
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        name: 'control',
		data() {
			return {
				showControl: false
			}
		},
		methods: {
			expandControl() {
				this.showControl = !this.showControl;
				this.$root.$emit('expandControl');
			}
		},
    };
</script>

<style scoped>
    img {
        float: left;
        width: 300px;
    }
    li {
        margin-bottom: 40px;
        clear: both;
    }
</style>     

