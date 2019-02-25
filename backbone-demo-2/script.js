// Toggle button
const ToggleModel = Backbone.Model.extend({
	defaults: {
		state: 'on'
	},
	toggle: function() {
		let state = this.get('state');
		if( state === 'on' ) {
			this.set({ state: 'off' });
		} else {
			this.set({ state: 'on' });
		}
	}
});
let toggleModel = new ToggleModel({});

const ToggleView = Backbone.View.extend({
	initialize: function() {
		this.listenTo(this.model, 'change', this.render);
	},
	render: function() {
		// console.log('ToggleView.render');
		let status = this.model.get('state');
		let html = `<div id="deliciousUnicornToggleBox">
			Status är: ${status} <br/>
			<button id="toggleButton">Klicka för att ändra</button>
		</div>`;
		this.$el.html(html);
		// this.el.innerHTML = html;
	},
	events: {
		"click #toggleButton": 'unicornTearsClick'
	},
	unicornTearsClick: function(event) {
		// console.log('The unicorn sheds tears over your hurtful click...');
		this.model.toggle();
	}
})


$(document).ready(function() {
	let toggleView = new ToggleView({
		model: toggleModel,
		el: '#deliciousUnicornToggleBox'
	});
	toggleView.render();
});





//
